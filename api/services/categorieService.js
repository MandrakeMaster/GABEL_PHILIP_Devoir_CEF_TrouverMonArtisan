const db = require('../models');

exports.getAllCategories = async () => {
    try {
        const categories = await db.Categorie.findAll();
        return categories;
    } catch (error) {
        throw new Error("Erreur service get all categories: " + error.message);
    }
};