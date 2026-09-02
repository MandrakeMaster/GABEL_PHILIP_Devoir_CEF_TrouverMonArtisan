const db = require('../models');

/**
 * Récupère la liste complète des artisans (version allégée).
 */
exports.getAllArtisans = async () => {
    try {
        const artisans = await db.Artisan.findAll({
            attributes: { exclude: ['email', 'telephone', 'description', 'site_web'] }
        });
        return artisans;
    } catch (error) {
        throw new Error("Erreur service get all artisans: " + error.message);
    }
};

/**
 * Récupère un artisan spécifique par son ID avec ses relations.
 */
exports.getArtisanById = async (id) => {
    try {
        const artisan = await db.Artisan.findByPk(id, {
            include: [{
                model: db.Specialite,
                include: [{
                    model: db.Categorie
                }]
            }]
        });
        return artisan;
    } catch (error) {
        throw new Error("Erreur service get artisan by id: " + error.message);
    }
};

/**
 * Récupère les artisans d'une catégorie spécifique.
 */
exports.getArtisansByCategorie = async (categorieId) => {
    return await db.Artisan.findAll({
        attributes: { exclude: ['email', 'telephone', 'description', 'site_web'] },
        include: [{
            model: db.Specialite,
            where: { id_categorie: categorieId },
            include: [{
                model: db.Categorie
            }]
        }]
    });
};

/**
 * Récupère les artisans d'une spécialité spécifique.
 */
exports.getArtisansBySpecialite = async (specialiteId) => {
    return await db.Artisan.findAll({
        where: { id_specialite: specialiteId },
        attributes: { exclude: ['email', 'telephone', 'description', 'site_web'] },
        include: [{
            model: db.Specialite,
            include: [{
                model: db.Categorie
            }]
        }]
    });
};

/**
 * Récupère les artisans "coup de cœur".
 */
exports.getTopArtisans = async () => {
    return await db.Artisan.findAll({
        where: { top: 1 },
        attributes: { exclude: ['email', 'telephone', 'description', 'site_web'] },
        include: [{
            model: db.Specialite,
            include: [{
                model: db.Categorie
            }]
        }]
    });
};