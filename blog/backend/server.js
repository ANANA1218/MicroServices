// backend/server.js
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

// Route pour récupérer tous les articles
app.get('/api/articles', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM blog_db.articles');
        res.json(rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
        res.status(500).send('Erreur interne du serveur');
    }
});

// Route pour créer un nouvel article
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

// Route pour mettre à jour un article
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

// Route pour supprimer un article
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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Serveur démarré sur le port ${port}`));

module.exports = { app, pool }; // N'exportez que l'app et le pool
