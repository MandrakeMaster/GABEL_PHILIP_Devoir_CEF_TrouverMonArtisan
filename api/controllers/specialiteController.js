const specialiteService = require('../services/specialiteService');

exports.getAllSpecialites = async (req, res) => {
    try {
        const specialites = await specialiteService.getAllSpecialites();
        res.status(200).json(specialites);
    } catch (error) {
        res.status(500).json({message: "Erreur lors de la récupération des spécialités"});
    }
};
