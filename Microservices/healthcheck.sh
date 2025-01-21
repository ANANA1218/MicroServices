#!/bin/bash

# Test du backend
if curl --silent --fail http://localhost:5000; then
    echo "Backend est en ligne"
else
    echo "Backend est hors ligne"
fi

# Test du frontend
if curl --silent --fail http://localhost:3001; then
    echo "Frontend est en ligne"
else
    echo "Frontend est hors ligne"
fi

# Test de la base de données (assurez-vous que le client MySQL est installé)
if mysqladmin ping -h localhost -u user -proot; then
    echo "Base de données est en ligne"
else
    echo "Base de données est hors ligne"
fi
