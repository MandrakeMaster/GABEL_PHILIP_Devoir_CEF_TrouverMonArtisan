const artisanService = require('../services/artisanService');

exports.getAllArtisans = async (req, res) => {
    try {
        const artisans = await artisanService.getAllArtisans();
        res.status(200).json(artisans);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des artisans", error: error.message });
    }
};

exports.getArtisanById = async (req, res) => {
    try {
        const artisanId = req.params.id;
        const artisan = await artisanService.getArtisanById(artisanId);
        
        if (!artisan) {
            return res.status(404).json({ message: "Artisan non trouvé" });
        }
        
        res.status(200).json(artisan);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'artisan" });
    }
};

exports.getArtisansByCategorie = async (req, res) => {
    try {
        const artisans = await artisanService.getArtisansByCategorie(req.params.id);
        
        if (!artisans || artisans.length === 0) {
            return res.status(404).json({ message: "Aucun artisan trouvé pour cette catégorie" });
        }
        
        res.status(200).json(artisans);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.getArtisansBySpecialite = async (req, res) => {
    try {
        const artisans = await artisanService.getArtisansBySpecialite(req.params.id);
        
        if (!artisans || artisans.length === 0) {
            return res.status(404).json({ message: "Aucun artisan trouvé pour cette spécialité" });
        }
        
        res.status(200).json(artisans);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.getTopArtisans = async (req, res) => {
    try {
        const artisans = await artisanService.getTopArtisans();
        
        if (!artisans || artisans.length === 0) {
            return res.status(404).json({ message: "Aucun artisan coup de cœur trouvé" });
        }
        
        res.status(200).json(artisans);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};