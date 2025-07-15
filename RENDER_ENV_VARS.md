# 🗄️ VARIABLES D'ENVIRONNEMENT POUR RENDER

## ✅ Variables prêtes à copier-coller dans Render

### 📋 Allez sur votre dashboard Render → Environment Variables et ajoutez :

```
MONGO_URL=mongodb://lucas:Sacul2517@ac-1h7bd9g-shard-00-00.zxjnivk.mongodb.net:27017,ac-1h7bd9g-shard-00-01.zxjnivk.mongodb.net:27017,ac-1h7bd9g-shard-00-02.zxjnivk.mongodb.net:27017/?ssl=true&replicaSet=atlas-7x810m-shard-0&authSource=admin&retryWrites=true&w=majority&appName=lucas-portfolio-cluster

DB_NAME=lucas-portfolio-cluster

ENVIRONMENT=production

CORS_ORIGINS=https://lucas-portfoliooo.netlify.app,https://portfolio-huw1.onrender.com
```

### 🎯 Comment ajouter les variables sur Render :

1. **Connectez-vous à Render** : https://render.com
2. **Sélectionnez votre service** : portfolio-huw1
3. **Allez dans "Environment"** (menu de gauche)
4. **Cliquez sur "Add Environment Variable"**
5. **Ajoutez chaque variable** une par une :
   - Key: `MONGO_URL` | Value: `mongodb://lucas:Sacul2517@ac-1h7bd9g-shard-00-00.zxjnivk.mongodb.net:27017,ac-1h7bd9g-shard-00-01.zxjnivk.mongodb.net:27017,ac-1h7bd9g-shard-00-02.zxjnivk.mongodb.net:27017/?ssl=true&replicaSet=atlas-7x810m-shard-0&authSource=admin&retryWrites=true&w=majority&appName=lucas-portfolio-cluster`
   - Key: `DB_NAME` | Value: `lucas-portfolio-cluster`
   - Key: `ENVIRONMENT` | Value: `production`
   - Key: `CORS_ORIGINS` | Value: `https://lucas-portfoliooo.netlify.app,https://portfolio-huw1.onrender.com`

6. **Cliquez sur "Save Changes"**
7. **Attendez le redéploiement automatique**

### ✅ Vérification
Une fois déployé, testez :
- **API Health Check** : https://portfolio-huw1.onrender.com/api/
- **Devrait retourner** : `{"message": "Lucas Portfolio API - Étudiant en Mécanique"}`

### 🚀 Statut : Prêt pour le déploiement !
Toutes les informations de connexion MongoDB sont configurées avec vos vraies données.