const db = require('../models');

/**
 * Récupère la liste complète de toutes les catégories depuis la base de données.
 */
exports.getAllCategories = async () => {
    try {
        const categories = await db.Categorie.findAll();
        return categories;
    } catch (error) {
        throw new Error("Erreur service get all categories: " + error.message);
    }
};