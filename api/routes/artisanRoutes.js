const express = require('express');
const router = express.Router();
const artisanController = require('../controllers/artisanController');

/**
 * @route GET /api/artisans
 * @desc Récupère la liste de tous les artisans (version allégée)
 */
router.get('/', artisanController.getAllArtisans);

/**
 * @route GET /api/artisans/top
 * @desc Récupère la sélection des artisans "coup de cœur"
 */
router.get('/top', artisanController.getTopArtisans);

/**
 * @route GET /api/artisans/categorie/:id
 * @desc Récupère les artisans d'une catégorie spécifique
 */
router.get('/categorie/:id', artisanController.getArtisansByCategorie);

/**
 * @route GET /api/artisans/specialite/:id
 * @desc Récupère les artisans d'une spécialité spécifique
 */
router.get('/specialite/:id', artisanController.getArtisansBySpecialite);

/**
 * @route GET /api/artisans/:id
 * @desc Récupère la fiche détaillée d'un artisan par son ID
 */
router.get('/:id', artisanController.getArtisanById);

/**
 * @route POST /api/artisans/:id/contact
 * @desc Traite l'envoi du message de contact pour un artisan spécifique
 */
router.post('/:id/contact', artisanController.sendContactMessage);

module.exports = router;