const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'API pour la gestion des articles de blog',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./server.js'], // Le fichier contenant les routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Récupère tous les articles
 *     responses:
 *       200:
 *         description: Liste des articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
app.get('/api/articles', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM blog_db.articles');
        res.json(rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
        res.status(500).send('Erreur interne du serveur');
    }
});

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Crée un nouvel article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewArticle'
 *     responses:
 *       201:
 *         description: Article créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 */
app.post('/api/articles', async (req, res) => {
    const { title, content } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO blog_db.articles (title, content) VALUES (?, ?)', [title, content]);
        res.status(201).json({ id: result.insertId, title, content });
    } catch (error) {
        console.error('Erreur lors de la création de l\'article:', error);
        res.status(500).send('Erreur interne du serveur');
    }
});

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Met à jour un article
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewArticle'
 *     responses:
 *       200:
 *         description: Article mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 */
app.put('/api/articles/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        await pool.query('UPDATE blog_db.articles SET title = ?, content = ? WHERE id = ?', [title, content, id]);
        res.json({ id, title, content });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'article:', error);
        res.status(500).send('Erreur interne du serveur');
    }
});

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprime un article
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Article supprimé
 */
app.delete('/api/articles/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM blog_db.articles WHERE id = ?', [id]);
        res.status(204).send();
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'article:', error);
        res.status(500).send('Erreur interne du serveur');
    }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *     NewArticle:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *         content:
 *           type: string
 */

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Serveur démarré sur le port ${port}`));

module.exports = { app, pool };
