#!/bin/bash

# Vérification des services

echo "Vérification des services..."

# Test du base de données
if curl --silent --fail http://localhost:8080/; then
    echo "✅ Adminer est en ligne"
else
    echo "❌ Adminer est hors ligne"
fi

# Test du frontend
if curl --silent --fail http://localhost:3001; then
    echo "✅ Frontend est en ligne"
else
    echo "❌ Frontend est hors ligne"
fi

# Test du CAdvisor
if curl --silent --fail http://localhost:8081/containers/; then
    echo "✅ CAdvisor est en ligne"
else
    echo "❌ CAdvisor est hors ligne"
fi

# Test du weave scope
if curl --silent --fail http://localhost:4040/#!/state/{%22topologyId%22:%22containers%22}; then
    echo "✅ weave scope est en ligne"
else
    echo "❌ weave scope est hors ligne"
fi

# Test du Prometheus
if curl --silent --fail http://localhost:9090/query; then
    echo "✅ Prometheus est en ligne"
else
    echo "❌ Prometheus est hors ligne"
fi


# Test du Grafana
if curl --silent --fail http://localhost:9000/#!/home; then
    echo "✅ Grafana est en ligne"
else
    echo "❌ Grafana est hors ligne"
fi

