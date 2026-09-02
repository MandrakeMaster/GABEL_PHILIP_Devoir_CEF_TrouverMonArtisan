const artisanService = require('../services/artisanService');

/**
 * Récupère et retourne la liste de tous les artisans (version allégée).
 */
exports.getAllArtisans = async (req, res) => {
    try {
        const artisans = await artisanService.getAllArtisans();
        res.status(200).json(artisans);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des artisans", error: error.message });
    }
};

/**
 * Récupère et retourne un artisan spécifique par son ID (avec toutes ses informations détaillées).
 */
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

/**
 * Récupère et retourne la liste des artisans filtrés par identifiant de catégorie.
 */
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

/**
 * Récupère et retourne la liste des artisans filtrés par identifiant de spécialité.
 */
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

/**
 * Récupère et retourne la sélection des artisans "coup de cœur" (top).
 */
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

/**
 * Traite la soumission du formulaire de contact destiné à un artisan spécifique.
 * Valide l'existence de l'artisan, vérifie les champs et renvoie une réponse de succès.
 */
exports.sendContactMessage = async (req, res) => {
    try {
        const artisanId = req.params.id;
        const { nom, email, objet, message } = req.body;

        // Vérification de l'existence de l'artisan destinataire
        const artisan = await artisanService.getArtisanById(artisanId);
        if (!artisan) {
            return res.status(404).json({ message: "Artisan introuvable, impossible d'envoyer le message." });
        }

        // Validation basique côté serveur
        if (!nom || !email || !objet || !message) {
            return res.status(400).json({ message: "Tous les champs du formulaire sont obligatoires." });
        }

        // Journalisation conditionnelle en développement
        if (process.env.NODE_ENV !== 'production') {
            console.log(`[CONTACT] Message reçu pour l'artisan ID ${artisanId} (${artisan.nom}) de la part de ${nom} (${email})`);
        }

        return res.status(200).json({ 
            success: true, 
            message: `Votre message a bien été transmis à l'artisan ${artisan.nom}.` 
        });

    } catch (error) {
        console.error("Erreur contrôleur sendContactMessage :", error);
        return res.status(500).json({ message: "Erreur interne du serveur lors de l'envoi du message." });
    }
};