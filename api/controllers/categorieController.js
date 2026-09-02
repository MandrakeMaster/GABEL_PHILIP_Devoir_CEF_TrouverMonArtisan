const categorieService = require('../services/categorieService');

/**
 * Récupère et retourne la liste complète de toutes les catégories.
 */
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categorieService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des catégories" });
    }
};