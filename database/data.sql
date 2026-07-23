USE trouve_ton_artisan;

-- Désactiver les contraintes de clés étrangères
SET FOREIGN_KEY_CHECKS = 0;

-- Vider les tables existantes pour éviter les doublons si on relance le script
DELETE FROM artisan;
DELETE FROM specialite;
DELETE FROM categorie;


-- Insertion des catégories (Niveau 1)
INSERT INTO categorie (nom) VALUES
('Alimentation'),
('Bâtiment'),
('Fabrication'),
('Services');

-- Insertion des spécialités (Niveau 2)
INSERT INTO specialite (nom, id_categorie) VALUES
('Boucher', 1),
('Boulanger', 1),
('Chocolatier', 1),
('Traiteur', 1),
('Chauffagiste', 2),
('Electricien', 2),
('Menuisier', 2),
('Plombier', 2),
('Bijoutier', 3),
('Couturier', 3),
('Ferronier', 3),
('Coiffeur', 4),
('Fleuriste', 4),
('Toiletteur', 4),
('Webdesign', 4);

-- Insertion des artisans (Niveau 3)
INSERT INTO artisan (nom, email, telephone, note, ville, description, site_web, top, id_specialite) VALUES
('Boucherie Dumont', 'boucherie.dumond@gmail.com', '0400000000', 4.5, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', NULL, 0, 1),
('Au pain chaud', 'aupainchaud@hotmail.com', '0400000000', 4.8, 'Montélimar', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', NULL, 1, 2),
('Chocolaterie Labbé', 'chocolaterie-labbe@gmail.com', '0400000000', 4.9, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'https://chocolaterie-labbe.fr', 1, 3),
('Traiteur Truchon', 'contact@truchon-traiteur.fr', '0400000000', 4.1, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'https://truchon-traiteur.fr', 0, 4),
('Orville Salmons', 'o-salmons@live.com', '0400000000', 5.0, 'Evian', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', NULL, 1, 5),
('Mont Blanc Eléctricité', 'contact@mont-blanc-electricite.com', '0400000000', 4.5, 'Chamonix', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'https://mont-blanc-electricite.com', 0, 6),
('Boutot & fils', 'boutot-menuiserie@gmail.com', '0400000000', 4.7, 'Bourg-en-bresse', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'https://boutot-menuiserie.com', 0, 7),
('Vallis Bellemare', 'v.bellemare@gmail.com', '0400000000', 4.0, 'Vienne', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'https://plomberie-bellemare.com', 0, 8),
('Claude Quinn', 'claude.quinn@gmail.com', '0400000000', 4.2, 'Aix-les-bains', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', NULL, 0, 9),
('Amitee Lécuyer', 'a.amitee@hotmail.com', '0400000000', 4.5, 'Annecy', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'https://lecuyer-couture.com', 0, 10),
('Ernest Carignan', 'e-carigan@hotmail.com', '0400000000', 5.0, 'Le Puy-en-Velay', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', NULL, 0, 11),
('Royden Charbonneau', 'r.charbonneau@gmail.com', '0400000000', 3.8, 'Saint-Priest', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', NULL, 0, 12),
('Leala Dennis', 'l.dennos@hotmail.fr', '0400000000', 3.8, 'Chambéry', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'https://coiffure-leala-chambery.fr', 0, 12),
('C''est sup''hair', 'sup-hair@gmail.com', '0400000000', 4.1, 'Romans-sur-Isère', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'https://sup-hair.fr', 0, 12),
('Le monde des fleurs', 'contact@le-monde-des-fleurs-annonay.fr', '0400000000', 4.6, 'Annonay', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'https://le-monde-des-fleurs-annonay.fr', 0, 13),
('Valérie Laderoute', 'v-laredoute@gmail.com', '0400000000', 4.5, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', NULL, 0, 14),
('CM Graphisme', 'contact@cm-graphisme.com', '0400000000', 4.4, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'https://cm-graphisme.com', 0, 15);

-- Réactiver les contraintes
SET FOREIGN_KEY_CHECKS = 1;