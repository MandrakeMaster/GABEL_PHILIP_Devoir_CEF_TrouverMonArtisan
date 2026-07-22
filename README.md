Trouve ton artisan - Région Auvergne-Rhône-Alpes
Plateforme web de mise en relation entre les particuliers et les artisans de la région Auvergne-Rhône-Alpes, réalisée dans le cadre d'une formation de développement web.

🚀 Fonctionnalités
Consultation des artisans par catégorie (Bâtiment, Services, Fabrication, Alimentation).

Affichage des détails d'un artisan (note, spécialité, localisation, description, site web).

Formulaire de contact pour envoyer un message à un artisan.

Barre de recherche dynamique par nom d'artisan.

Respect de la charte graphique de la région et des normes d'accessibilité.

🛠️ Technologies utilisées
Back-end : Node.js, Express, Sequelize (ORM)

Base de données : MySQL

Front-end : React, Bootstrap, Sass, React Router

Versionning : Git / GitHub

📂 Structure du projet
/api : Code source de l'API Node.js/Express.

/database : Scripts SQL de création de la base de données et des jeux d'essais.

/site : Application front-end React.

⚙️ Installation et Lancement
1. Cloner le dépôt
git clone

2. Base de données
Importer le script SQL de création situé dans /database (ex: schema.sql) pour créer la base et l'utilisateur dédié.

Importer le jeu d'essais pour alimenter les tables.

3. Lancer l'API
Se rendre dans le dossier de l'API :
cd api

Installer les dépendances :
npm install

Créer un fichier .env à la racine du dossier api en renseignant les identifiants créés dans le script SQL :
PORT=5000
DB_NAME=trouve_ton_artisan
DB_USER=artisan_admin
DB_PASSWORD=votre_mot_de_passe
DB_HOST=localhost
DB_PORT=3306

Lancer le serveur en mode développement :
npm run dev
