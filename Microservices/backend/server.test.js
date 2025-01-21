// server.test.js
require('dotenv').config(); // Charger les variables d'environnement

const request = require('supertest');
const { app } = require('./server');
const mysql = require('mysql2/promise');

let server;
let pool;

beforeAll((done) => {
  process.env.PORT = 5001; // Utilise le port 5001 pour les tests
  server = app.listen(5001, () => {
    console.log('Serveur de test démarré sur le port 5001');
    done();
  });

  // Créer un pool de connexions pour les tests
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
});

// Test de connexion à la base de données
test('Vérifier la connexion à la base de données', async () => {
  try {
    const [rows] = await pool.query('SELECT 1'); // Une requête simple pour tester la connexion
    expect(rows).toEqual(expect.any(Array)); // Vérifiez que nous avons reçu un tableau en réponse
  } catch (error) {
    throw new Error('Échec de la connexion à la base de données: ' + error.message);
  }
});

// Avant chaque test, insérer des données de test
beforeEach(async () => {
  await pool.query('DELETE FROM blog_db.articles'); // Nettoyer la table
  await pool.query('INSERT INTO blog_db.articles (title, content) VALUES (?, ?)', ['Article 1', 'Contenu 1']);
  await pool.query('INSERT INTO blog_db.articles (title, content) VALUES (?, ?)', ['Article 2', 'Contenu 2']);
});

afterAll(async () => {
  await pool.end(); // Ferme le pool de connexions MySQL
  await new Promise(resolve => server.close(resolve)); // Ferme le serveur après les tests
});

describe('CRUD API', () => {
  test('GET /api/articles - Lire tous les articles', async () => {
    const response = await request(app).get('/api/articles');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2); // Vérifie qu'il y a 2 articles
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Article 1', content: 'Contenu 1' }),
        expect.objectContaining({ title: 'Article 2', content: 'Contenu 2' }),
      ])
    );
  });

  test('POST /api/articles - Créer un article', async () => {
    const newArticle = { title: 'Nouvel article', content: 'Contenu de test' };

    const response = await request(app)
      .post('/api/articles')
      .send(newArticle);
      
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(expect.objectContaining({ id: expect.any(Number), ...newArticle }));

    // Vérifiez que l'article a bien été ajouté à la base de données
    const result = await pool.query('SELECT * FROM blog_db.articles WHERE id = ?', [response.body.id]);
    expect(result[0]).toHaveLength(1);
    expect(result[0][0]).toMatchObject(newArticle);
  });


  test('DELETE /api/articles/:id - Supprimer un article', async () => {
    
    const response = await request(app).delete('/api/articles/1');
    
    expect(response.statusCode).toBe(204);

    // Vérifiez que l'article a bien été supprimé de la base de données
    const result = await pool.query('SELECT * FROM blog_db.articles WHERE id = ?', [1]);
    expect(result[0]).toHaveLength(0); // L'article doit être supprimé
  });
});
