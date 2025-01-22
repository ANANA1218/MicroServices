# Mon Repository GitHub - Projets Divers

Ce dépôt contient trois projets distincts, chacun axé sur des aspects différents du développement logiciel moderne. Les projets sont présentés ci-dessous avec une description détaillée, ainsi que les outils et technologies utilisés.

---

## **1. Workflow GitHub Actions avec `act`**

### **Description**
Ce projet illustre l'utilisation de **GitHub Actions** en local à l'aide de l'outil **`act`**. Cela permet de tester des workflows GitHub Actions directement sur votre machine avant de les pousser sur le dépôt GitHub. Cela améliore l'efficacité du développement en local.

### **Objectifs**
- Tester et valider les workflows GitHub Actions localement.
- Dépanner les erreurs courantes liées à `git checkout` et la version de Python.

### **Technologies utilisées**
- **Git** : Gestion de version.
- **GitHub Actions** : Automatisation des workflows CI/CD.
- **act** : Outil permettant d'exécuter des workflows GitHub Actions en local.

### **Étapes principales**
1. **Installation de `act`** : Suivez les instructions pour télécharger et installer `act` sur votre machine.
2. **Configuration et Test des Workflows** : Exécutez des workflows GitHub Actions en local.
3. **Dépannage** : Résolution de problèmes courants comme les erreurs liées à la version de Python et la gestion des branches avec `git checkout`.

---

## **2. Blog avec Microservices et Outils de Monitoring**

### **Description**
Ce projet est une **application de blog** qui utilise une architecture **microservices**. Il est conteneurisé avec **Docker** et comprend des outils de **monitoring** pour surveiller l'état des services en temps réel.

### **Architecture du Projet**
- **Backend** : Application Node.js pour gérer les articles de blog.
- **Frontend** : Application React pour afficher et créer des articles.
- **Base de données** : MySQL pour stocker les articles.
- **Outils de monitoring** :
  - **cAdvisor** : Collecte des métriques des conteneurs.
  - **Portainer** : Gestion et surveillance des conteneurs Docker.
  - **Weave Scope** : Visualisation de l'infrastructure et des relations entre services.
  - **Prometheus** : Système de surveillance et d'alerte.
  - **Grafana** : Plateforme de visualisation des métriques collectées par Prometheus.

### **Technologies utilisées**
- **Node.js** : Backend pour la gestion des articles.
- **React** : Frontend interactif.
- **MySQL** : Base de données relationnelle.
- **Docker** : Conteneurisation des services.
- **cAdvisor, Portainer, Weave Scope, Prometheus, Grafana** : Outils de monitoring.

### **Outils de Monitoring Détaillés**

#### **1. Grafana**
- **URL** : `http://localhost:3000`

#### **2. Weave Scope**
- **URL** : `http://localhost:4040`

#### **3. Prometheus**
- **URL** : `http://localhost:9090`

#### **4. Portainer**
- **URL** : `http://localhost:9000`

#### **5. cAdvisor**
- **URL** : `http://localhost:8081`

### **Healthcheck**
Pour tester la santé des conteneurs, vous pouvez exécuter un **Healthcheck** dans un terminal PowerShell. Utilisez la commande suivante pour vérifier l'état des services dans votre environnement Docker :

```bash
bash healthcheck
```

Cela vous permettra de valider que les services sont opérationnels.

### **Lancer les tests avec Cypress**

Si vous avez besoin de tester l'interface utilisateur avec **Cypress**, vous pouvez utiliser la commande suivante :

```bash
npm run cypress:run
```

Cela exécutera les tests définis dans **Cypress** pour s'assurer que les fonctionnalités du frontend sont fonctionnelles.

---

