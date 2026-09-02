const db = require('../models');

/**
 * Récupère la liste complète de toutes les spécialités depuis la base de données.
 */
exports.getAllSpecialites = async () => {
    try {
        const specialites = await db.Specialite.findAll();
        return specialites;
    } catch (error) {
        throw new Error("Erreur service get all specialites: " + error.message);
    }
};