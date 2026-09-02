const express = require('express');
const router = express.Router();
const specialiteController = require('../controllers/specialiteController');

/**
 * @route GET /api/specialites
 * @desc Récupère la liste de toutes les spécialités
 */
router.get('/', specialiteController.getAllSpecialites);

module.exports = router;