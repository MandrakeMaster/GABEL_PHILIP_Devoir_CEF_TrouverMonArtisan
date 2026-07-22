const db = require('../models');

exports.getAllSpecialites = async () => {
    try {
        const specialites = await db.Specialite.findAll();
        return specialites;
    } catch (error) {
        throw new Error("Erreur service get all specialites: " + error.message);
    }
};