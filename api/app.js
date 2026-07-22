const express = require('express');
const path = require('path');

require('dotenv').config({ path: './env/.env' });

const db = require("./models");

const app = express();

const artisanRoutes = require('./routes/artisanRoutes');
const specialiteRoutes = require('./routes/specialiteRoutes');
const categorieRoutes = require('./routes/categorieRoutes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.use('/api/artisans', artisanRoutes);
app.use('/api/specialites', specialiteRoutes);
app.use('/api/categories', categorieRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}`);
});
