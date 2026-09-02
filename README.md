# Trouve ton artisan

Application web full-stack permettant de rechercher des artisans locaux, de consulter leurs fiches détaillées par catégorie ou spécialité, et de les contacter via un formulaire dédié.

## Prérequis techniques
Avant de commencer, assurez-vous d'avoir installé sur votre machine :
* **Node.js** (version LTS recommandée)
* **MySQL** (via un serveur local comme WampServer, XAMPP ou un service MySQL autonome)
* **Git**

---

## Guide d'installation et de lancement

Aucune modification de code source n'est nécessaire. Ouvrez un terminal et suivez séquentiellement les étapes ci-dessous.

### 1. Récupération du projet
Clonez le dépôt sur votre machine et positionnez-vous à la racine du projet :
```
git clone https://github.com/MandrakeMaster/GABEL_PHILIP_Devoir_CEF_TrouverMonArtisan
cd GABEL_PHILIP_Devoir_CEF_TrouverMonArtisan
```

### 2. Initialisation de la base de donnée

   * Exécutez le script de structure `schema.sql` pour créer la base `trouve_ton_artisan` et ses tables.
   * Exécutez ensuite le script de données `data.sql` pour peupler la base avec les catégories, spécialités et artisans.



### 3. Configuration des environnements

Dans le dossier `api/`, créez un fichier `.env` en y renseignant vos accès :
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=trouve_ton_artisan
DB_DIALECT=mysql
```

Dans le dossier site/, créez un fichier .env.local pour configurer l'URL de l'API :

NEXT_PUBLIC_API_URL=http://localhost:5000

### 4. Lancement du Back-end (API)

Ouvrez un premier terminal, positionnez-vous dans le dossier de l'API, installez les dépendances et lancez le serveur :
```
cd api
npm install
npm start
```
### 5. Lancement du Front-end (Site Next.js)
Ouvrez un second terminal (laissez le premier tourner), positionnez-vous dans le dossier du site, installez les dépendances et lancez l'application en mode développement :
```
cd site
npm install
npm run dev
```