# Guide de Déploiement sur Vercel

Ce guide vous explique comment déployer votre portfolio Lucas sur Vercel.

## 📋 Prérequis

1. Un compte Vercel (gratuit) : https://vercel.com
2. Votre code source sur GitHub, GitLab ou Bitbucket
3. Node.js installé localement (pour tester)

## 🚀 Méthodes de Déploiement

### Méthode 1 : Déploiement via GitHub (Recommandée)

1. **Pousser votre code sur GitHub** :
   ```bash
   git add .
   git commit -m "Préparation pour déploiement Vercel"
   git push origin main
   ```

2. **Connecter à Vercel** :
   - Allez sur https://vercel.com
   - Cliquez sur "Sign Up" ou "Login"
   - Connectez-vous avec votre compte GitHub
   - Cliquez sur "New Project"
   - Sélectionnez votre repository

3. **Configuration du projet** :
   - **Framework Preset** : Other
   - **Root Directory** : `frontend` (important !)
   - **Build Command** : `yarn build`
   - **Output Directory** : `build`
   - **Install Command** : `yarn install`

4. **Variables d'environnement** (si nécessaire) :
   - Dans les paramètres du projet Vercel
   - Ajoutez vos variables d'environnement
   - Exemple : `NODE_ENV=production`

5. **Déployer** :
   - Cliquez sur "Deploy"
   - Vercel construira et déploiera automatiquement

### Méthode 2 : Déploiement via CLI Vercel

1. **Installer Vercel CLI** :
   ```bash
   npm i -g vercel
   ```

2. **Login** :
   ```bash
   vercel login
   ```

3. **Déployer depuis le dossier frontend** :
   ```bash
   cd frontend
   vercel --prod
   ```

4. **Suivre les instructions** :
   - Confirmer le projet
   - Confirmer les paramètres
   - Le déploiement se lancera automatiquement

## 📁 Structure des Fichiers Créés

### `/vercel.json` (Racine)
Configuration pour déploiement depuis la racine du projet.

### `/frontend/vercel.json` (Frontend)
Configuration pour déploiement depuis le dossier frontend.

### `/.vercelignore`
Ignore les fichiers non nécessaires pour le déploiement (backend, tests, etc.).

## ⚙️ Configurations Importantes

### Package.json modifié
- `homepage` changé de Netlify vers `"./"` pour compatibilité universelle
- Scripts de build configurés avec CRACO

### Routing SPA
- Le fichier `vercel.json` inclut une réécriture pour gérer le routing React
- Toutes les routes sont redirigées vers `index.html`

## 🔧 Optimisations

### Performance
- Build automatiquement optimisé par Create React App
- Minification et compression automatiques
- Cache des assets statiques

### SEO
- Les meta tags dans `public/index.html` seront utilisés
- Structure des composants optimisée pour le SEO

## 🚨 Points Importants

1. **Seul le frontend est déployé** - Pas de backend nécessaire
2. **Root Directory** : Assurez-vous de spécifier `frontend` comme répertoire racine
3. **Build Command** : Utilisez `yarn build` (pas npm)
4. **Domaine personnalisé** : Configurable dans les paramètres Vercel

## 📊 Après le Déploiement

### URLs
- **Production** : `https://votre-projet.vercel.app`
- **Preview** : Généré automatiquement pour chaque commit

### Fonctionnalités Vercel
- **Auto-déploiement** : Chaque push déclenche un nouveau déploiement
- **Preview deployments** : Chaque pull request a sa propre URL
- **Analytics** : Statistiques de performance disponibles
- **Edge Network** : CDN mondial pour des performances optimales

## 🔍 Debugging

### Logs de Build
- Consultez les logs dans l'interface Vercel
- Vérifiez les erreurs de build dans la console

### Problèmes Courants
1. **Build fails** : Vérifiez les dépendances dans package.json
2. **Routes ne fonctionnent pas** : Vérifiez la configuration des rewrites
3. **Assets non trouvés** : Vérifiez le chemin des assets statiques

## 📞 Support

- Documentation Vercel : https://vercel.com/docs
- Community : https://github.com/vercel/vercel/discussions
- Support : support@vercel.com

---

✅ **Votre portfolio est maintenant prêt pour le déploiement sur Vercel !**