const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');

/**
 * @route GET /api/categories
 * @desc Récupère la liste de toutes les catégories
 */
router.get('/', categorieController.getAllCategories);

module.exports = router;