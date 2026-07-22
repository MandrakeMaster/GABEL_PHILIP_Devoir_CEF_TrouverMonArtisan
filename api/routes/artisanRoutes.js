const express = require('express');
const router = express.Router();
const artisanController = require('../controllers/artisanController');

router.get('/', artisanController.getAllArtisans);
router.get('/top', artisanController.getTopArtisans);

router.get('/categorie/:id', artisanController.getArtisansByCategorie);
router.get('/specialite/:id', artisanController.getArtisansBySpecialite);

router.get('/:id', artisanController.getArtisanById);

module.exports = router;