Trouve ton artisan - Région Auvergne-Rhône-Alpes
Plateforme web de mise en relation entre les particuliers et les artisans de la région Auvergne-Rhône-Alpes, réalisée dans le cadre d'une formation de développement web.

🚀 Fonctionnalités
Consultation des artisans par catégorie et mise en avant des artisans du mois.

Affichage détaillé d'un profil artisan (note, spécialité, localisation, description, site web).

Formulaire de contact interactif avec validation des champs.

Barre de recherche dynamique par nom, ville, code postal ou spécialité.

Pages légales, accessibilité, gestion des cookies et page 404 personnalisée.

Optimisation SEO (titres et métadonnées configurés sur toutes les pages).

🛠️ Technologies utilisées
Back-end : Node.js, Express, Sequelize (ORM)

Base de données : MySQL

Front-end : Next.js (App Router), React, Bootstrap, Sass

Versionning : Git / GitHub

📂 Structure du projet
/api : Code source de l'API Node.js/Express.

/database : Scripts SQL de création de la base de données et des jeux d'essais.

/site : Application front-end Next.js.

⚙️ Installation et Lancement
1. Cloner le dépôt
git clone

2. Base de données
Importer le script SQL de création situé dans /database pour créer la base et configurer l'utilisateur dédié.

Importer le jeu d'essais pour alimenter les tables.

3. Lancer l'API
Se rendre dans le dossier de l'API :
cd api

Installer les dépendances :
npm install

Créer un fichier .env à la racine du dossier api avec les informations suivantes :
PORT=5000
DB_NAME=trouve_ton_artisan
DB_USER=artisan_admin
DB_PASSWORD=votre_mot_de_passe
DB_HOST=localhost
DB_PORT=3306

Lancer le serveur en mode développement :
npm run dev

4. Lancer le Front-end
Installer les dépendances dans le dossier du front-end :
npm install

Lancer l'application en mode développement :
npm run dev
