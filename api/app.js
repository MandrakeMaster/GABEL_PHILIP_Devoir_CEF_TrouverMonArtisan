/**
 * @file Point d'entrée principal de l'API Back-end.
 * Configure Express, les middlewares (CORS, JSON, fichiers statiques), les routes et la connexion au serveur.
 */

const express = require('express');
const path = require('path');
const cors = require('cors');

// Chargement explicite des variables d'environnement
require('dotenv').config({ path: './env/.env' });

const db = require("./models");

const app = express();

// Configuration CORS agnostique : utilise la variable d'environnement ou bascule sur le localhost par défaut
const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

app.use(cors({
  origin: function (origin, callback) {
    // Autorise les requêtes sans origine (Postman, scripts, etc.) ou provenant de l'URL autorisée
    if (!origin || origin === clientUrl) {
      return callback(null, true);
    }
    return callback(new Error('La politique CORS interdit l\'accès depuis cette origine.'), false);
  }
}));

// Importation des routeurs
const artisanRoutes = require('./routes/artisanRoutes');
const specialiteRoutes = require('./routes/specialiteRoutes');
const categorieRoutes = require('./routes/categorieRoutes');

// Middlewares globaux
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// Enregistrement des routes de l'API
app.use('/api/artisans', artisanRoutes);
app.use('/api/specialites', specialiteRoutes);
app.use('/api/categories', categorieRoutes);

const PORT = process.env.PORT || 5000;

// Lancement du serveur
app.listen(PORT, () => {
    // Journalisation conditionnelle restreinte à l'environnement de développement
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Le serveur tourne sur le port ${PORT}`);
    }
});