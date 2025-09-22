# 🚀 Guide de déploiement - Les Tatouables

## 📋 Prérequis

1. **Compte Firebase** (gratuit) : https://console.firebase.google.com/
2. **Compte Netlify** (gratuit) : https://app.netlify.com/
3. **Compte GitHub** (gratuit) : https://github.com/

## 🔥 Étape 1 : Configuration Firebase

### 1.1 Créer un projet Firebase
1. Allez sur https://console.firebase.google.com/
2. Cliquez sur "Créer un projet"
3. Nom du projet : `lestatouables` (ou votre choix)
4. Activez Google Analytics (optionnel)
5. Cliquez sur "Créer le projet"

### 1.2 Configurer Firestore Database
1. Dans le menu de gauche, cliquez sur "Firestore Database"
2. Cliquez sur "Créer une base de données"
3. Choisissez "Commencer en mode test" (gratuit)
4. Sélectionnez une région (europe-west1 pour la France)
5. Cliquez sur "Terminé"

### 1.3 Récupérer les clés de configuration
1. Dans le menu de gauche, cliquez sur "Paramètres du projet" (icône engrenage)
2. Faites défiler vers le bas jusqu'à "Vos applications"
3. Cliquez sur l'icône web `</>`
4. Nom de l'application : `lestatouables-web`
5. Cochez "Configurer également Firebase Hosting" (optionnel)
6. Cliquez sur "Enregistrer l'application"
7. **COPIEZ** la configuration qui s'affiche

### 1.4 Mettre à jour la configuration
1. Ouvrez le fichier `firebase-config.js`
2. Remplacez les valeurs `YOUR_*` par vos vraies clés Firebase
3. Sauvegardez le fichier

## 🌐 Étape 2 : Déploiement sur Netlify

### 2.1 Préparer le projet
1. Créez un compte GitHub si vous n'en avez pas
2. Créez un nouveau repository : `lestatouables-website`
3. Uploadez tous vos fichiers dans ce repository

### 2.2 Déployer sur Netlify
1. Allez sur https://app.netlify.com/
2. Cliquez sur "New site from Git"
3. Choisissez "GitHub" et connectez votre compte
4. Sélectionnez le repository `lestatouables-website`
5. Configuration :
   - Build command : `echo 'Site statique'`
   - Publish directory : `.` (racine)
6. Cliquez sur "Deploy site"

### 2.3 Configuration du domaine personnalisé (optionnel)
1. Dans Netlify, allez dans "Site settings"
2. Cliquez sur "Domain management"
3. Ajoutez votre domaine personnalisé si vous en avez un

## 🔐 Étape 3 : Configuration de la sécurité Firebase

### 3.1 Règles de sécurité Firestore
1. Dans Firebase Console, allez dans "Firestore Database"
2. Cliquez sur l'onglet "Règles"
3. Remplacez le contenu par :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permettre la lecture à tous
    match /{document=**} {
      allow read: if true;
    }
    
    // Permettre l'écriture seulement avec authentification
    // Pour l'instant, on autorise tout (à sécuriser plus tard)
    match /{document=**} {
      allow write: if true;
    }
  }
}
```

4. Cliquez sur "Publier"

## ✅ Étape 4 : Test du déploiement

### 4.1 Vérifier le site
1. Votre site est maintenant accessible via l'URL Netlify
2. Testez toutes les fonctionnalités :
   - Navigation
   - Formulaire de contact
   - Gestion des créations (avec mot de passe)
   - Système de flash

### 4.2 Tester les modifications permanentes
1. Connectez-vous en mode admin
2. Ajoutez/modifiez des créations
3. Vérifiez que les changements sont visibles sur tous les navigateurs
4. Les données sont maintenant stockées dans Firebase (permanentes)

## 🔧 Maintenance et mises à jour

### Mise à jour du contenu
1. Modifiez les fichiers localement
2. Commitez et poussez vers GitHub
3. Netlify redéploiera automatiquement

### Sauvegarde des données
- Les données sont automatiquement sauvegardées dans Firebase
- Pas de sauvegarde manuelle nécessaire

## 🆘 Dépannage

### Problème : Firebase ne se connecte pas
- Vérifiez que les clés dans `firebase-config.js` sont correctes
- Vérifiez que Firestore est activé dans Firebase Console

### Problème : Les modifications ne se sauvegardent pas
- Vérifiez les règles de sécurité Firestore
- Vérifiez la console du navigateur pour les erreurs

### Problème : Le site ne se met pas à jour
- Vérifiez que Netlify est connecté à votre repository GitHub
- Forcez un redéploiement dans Netlify

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez la console du navigateur (F12)
2. Consultez les logs Netlify
3. Vérifiez les logs Firebase

## 🎉 Félicitations !

Votre site est maintenant en ligne avec :
- ✅ Hébergement gratuit et fiable
- ✅ Modifications permanentes et partagées
- ✅ HTTPS automatique
- ✅ CDN global pour des performances optimales
- ✅ Déploiement automatique depuis GitHub


