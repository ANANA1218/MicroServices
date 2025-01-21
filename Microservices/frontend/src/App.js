import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    const [articles, setArticles] = useState([]);
    const [editingArticle, setEditingArticle] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/articles');
            setArticles(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des articles:', error);
        }
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (editingArticle) {
                await axios.put(`http://localhost:5000/api/articles/${editingArticle.id}`, { title, content });
            } else {
                await axios.post('http://localhost:5000/api/articles', { title, content });
            }
            setTitle('');
            setContent('');
            setEditingArticle(null);
            fetchArticles();
        } catch (error) {
            console.error('Erreur lors de l\'ajout ou de la mise à jour de l\'article:', error);
        }
    };

    const handleEdit = (article) => {
        setTitle(article.title);
        setContent(article.content);
        setEditingArticle(article);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/articles/${id}`);
            fetchArticles();
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'article:', error);
        }
    };

    return (
     <div className="container mt-5">
            <h1 className="text-center mb-4">Gestion des Articles</h1>
            <form onSubmit={handleAddOrUpdate} className="mb-4 p-4 bg-light rounded shadow">
                <div className="mb-3">
                    <label className="form-label fw-bold">Titre</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Contenu</label>
                    <textarea className="form-control" rows="4" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                </div>
                <button type="submit" className="btn btn-success btn-lg w-100">{editingArticle ? 'Modifier' : 'Ajouter'}</button>
            </form>
            <div className="row">
                {articles.map(article => (
                    <div key={article.id} className="col-md-6 mb-3">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title text-primary">{article.title}</h5>
                                <p className="card-text">{article.content}</p>
                                <div className="d-flex justify-content-between mt-3">
                                    <button className="btn btn-outline-primary" onClick={() => handleEdit(article)}>Modifier</button>
                                    <button className="btn btn-outline-danger" onClick={() => handleDelete(article.id)}>Supprimer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
