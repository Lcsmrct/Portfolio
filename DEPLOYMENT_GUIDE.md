# 🚀 Guide de Déploiement - Portfolio Lucas

## Stack Technique
- **Frontend**: React + Tailwind CSS → Netlify
- **Backend**: FastAPI + Python → Render
- **Base de données**: MongoDB → MongoDB Atlas

---

## 📋 Prérequis

### Comptes nécessaires :
1. **GitHub** : Pour héberger le code source
2. **Netlify** : Pour le frontend (gratuit)
3. **Render** : Pour le backend (gratuit avec limitations)
4. **MongoDB Atlas** : Pour la base de données (gratuit jusqu'à 512MB)

---

## 🗄️ Configuration MongoDB Atlas

### 1. Créer un cluster MongoDB Atlas
1. Allez sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créez un compte et un nouveau cluster (gratuit)
3. Choisissez le provider `AWS` et la région `eu-west-1` (Europe)
4. Nommez votre cluster : `lucas-portfolio-cluster`

### 2. Configuration de sécurité
1. **Database Access** : Créez un utilisateur avec droits lecture/écriture
2. **Network Access** : Autorisez `0.0.0.0/0` (toutes les IPs)
3. **Connection String** : Copiez l'URL de connexion

Exemple d'URL : `mongodb+srv://username:password@lucas-portfolio-cluster.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority`

---

## 🚀 Déploiement Backend (Render)

### 1. Connexion GitHub
1. Allez sur [Render](https://render.com)
2. Créez un compte et connectez GitHub
3. Créez un nouveau **Web Service**

### 2. Configuration Render
- **Repository** : Sélectionnez votre repo GitHub
- **Branch** : `main`
- **Root Directory** : `backend`
- **Runtime** : `Python 3`
- **Build Command** : `pip install -r requirements.txt`
- **Start Command** : `uvicorn server:app --host 0.0.0.0 --port $PORT`

### 3. Variables d'environnement Render
Dans l'onglet "Environment" de votre service :
```
MONGO_URL=mongodb+srv://username:password@lucas-portfolio-cluster.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
DB_NAME=portfolio_prod
ENVIRONMENT=production
CORS_ORIGINS=https://lucas-portfolio.netlify.app,https://votre-domaine.netlify.app
```

### 4. Déploiement
1. Cliquez sur "Create Web Service"
2. Attendez le déploiement (5-10 minutes)
3. Notez l'URL du service : `https://lucas-portfolio-backend.onrender.com`
https://portfolio-huw1.onrender.com
---

## 🌐 Déploiement Frontend (Netlify)

### 1. Connexion GitHub
1. Allez sur [Netlify](https://netlify.com)
2. Créez un compte et connectez GitHub
3. Cliquez sur "New site from Git"

### 2. Configuration Netlify
- **Repository** : Sélectionnez votre repo GitHub
- **Branch** : `main`
- **Base directory** : `frontend`
- **Build command** : `npm run build`
- **Publish directory** : `build`

### 3. Variables d'environnement Netlify
Dans "Site settings" → "Environment variables" :
```
REACT_APP_BACKEND_URL=https://lucas-portfolio-backend.onrender.com
NODE_VERSION=18
```

### 4. Nom de domaine
1. Changez le nom de site : `lucas-portfolio.netlify.app`
2. Ou configurez un domaine personnalisé

---

## 🔧 Tests et Vérification

### 1. Test du Backend
Visitez : `https://lucas-portfolio-backend.onrender.com/api/`
Vous devriez voir : `{"message": "Lucas Portfolio API - Étudiant en Mécanique"}`

### 2. Test du Frontend
Visitez : `https://lucas-portfolio.netlify.app`
Votre portfolio devrait s'afficher correctement

### 3. Test des jeux
Vérifiez que les 6 mini-jeux fonctionnent :
- 🐍 Snake
- 🧩 Tetris
- 🏓 Pong
- 🐦 Flappy Bird
- 🧱 Breakout
- 🟢 Agar.io

---

## 📊 Monitoring et Maintenance

### Logs Backend (Render)
- Consultez les logs dans l'onglet "Logs" de votre service
- Surveillez les erreurs et performances

### Analytics Frontend (Netlify)
- Activez Netlify Analytics pour suivre les visites
- Consultez les métriques de performance

### Base de données (MongoDB Atlas)
- Surveillez l'utilisation des ressources
- Configurez des alertes pour l'espace disque

---

## ⚡ Optimisations

### Performance Frontend
1. **Lazy Loading** : Les jeux sont chargés à la demande
2. **Code Splitting** : Séparation automatique des chunks
3. **Minification** : CSS et JS minifiés automatiquement

### Performance Backend
1. **Async/Await** : Toutes les requêtes sont asynchrones
2. **Connexion persistante** : Pool de connexions MongoDB
3. **CORS optimisé** : Domaines spécifiques uniquement

---

## 🛠️ Dépannage

### Problèmes courants :

#### Backend ne démarre pas
- Vérifiez les logs Render
- Vérifiez la variable `MONGO_URL`
- Assurez-vous que MongoDB Atlas autorise les connexions

#### Frontend ne charge pas
- Vérifiez la variable `REACT_APP_BACKEND_URL`
- Vérifiez le build command dans Netlify
- Consultez les logs de déploiement

#### CORS Errors
- Ajoutez votre domaine Netlify dans `CORS_ORIGINS`
- Redéployez le backend après modification

---

## 🚀 Domaine Personnalisé (Optionnel)

### 1. Acheter un domaine
Recommandations : Namecheap, GoDaddy, OVH

### 2. Configuration DNS
Dans votre registrar de domaine :
```
A record: @ → 75.2.60.5
CNAME: www → lucas-portfolio.netlify.app
```

### 3. Configuration Netlify
1. "Domain settings" → "Add custom domain"
2. Ajoutez `votredomaine.com` et `www.votredomaine.com`
3. Activez SSL automatique

---

## 📈 Évolutions Futures

### Fonctionnalités possibles :
- Système de contact avec EmailJS
- Blog intégré avec Markdown
- Galerie photos projets mécaniques
- Système de commentaires
- Mode multilingue
- PWA (Progressive Web App)

### Upgrade infrastructure :
- Render Pro pour plus de performances
- MongoDB Atlas niveau supérieur
- CDN pour les assets statiques

---

## 📞 Support

En cas de problème :
1. Consultez les logs de chaque service
2. Vérifiez les variables d'environnement
3. Testez les URLs directement
4. Vérifiez la connectivité MongoDB

**Temps de déploiement estimé : 30-60 minutes**

Bonne chance avec votre portfolio ! 🚀