const db = require('../models');


exports.getAllArtisans = async () => {
    try {
        const artisans = await db.Artisan.findAll();
        return artisans;
    } catch (error) {
        throw new Error("Erreur service get all artisans: " + error.message);
    }
};

exports.getArtisanById = async (id) => {
    try {
        const artisan = await db.Artisan.findByPk(id);
        return artisan;
    } catch (error) {
        throw new Error("Erreur service get artisan by id: " + error.message);
    }
};

exports.getArtisansByCategorie = async (categorieId) => {
    return await db.Artisan.findAll({
        include: [{
            model: db.Specialite,
            where: { id_categorie: categorieId },
            include: [{
                model: db.Categorie
            }]
        }]
    });
};

exports.getArtisansBySpecialite = async (specialiteId) => {
    return await db.Artisan.findAll({
        where: { id_specialite: specialiteId },
        include: [{
            model: db.Specialite,
            include: [{
                model: db.Categorie
            }]
        }]
    });
};

exports.getTopArtisans = async () => {
    return await db.Artisan.findAll({
        where: { top: 1 }, // On force explicitement le 1 de MySQL
        include: [{
            model: db.Specialite,
            include: [{
                model: db.Categorie
            }]
        }]
    });
};