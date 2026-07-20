-- ========================================================
-- Script de test et de validation - Trouve ton Artisan
-- Auteur : Philip Gabel
-- Formation CEF Développeur Web
-- ========================================================

USE trouve_ton_artisan;

-- Test 1 : Vérification du volume global (Comptages)
SELECT 'Catégories' AS element, COUNT(*) AS total FROM categorie
UNION ALL
SELECT 'Spécialités', COUNT(*) FROM specialite
UNION ALL
SELECT 'Artisans', COUNT(*) FROM artisan;

-- Test 2 : Contrôle des artisans à la une (Top Artisans)
SELECT nom, id_specialite, note, ville FROM artisan WHERE top = 1;

-- Test 3 : Jointure entre Artisans, Spécialités et Catégories
SELECT a.nom AS artisan, s.nom AS specialite, c.nom AS categorie, a.ville
FROM artisan a
JOIN specialite s ON a.id_specialite = s.id_specialite
JOIN categorie c ON s.id_categorie = c.id_categorie
LIMIT 5;

-- Test 4 : Recherche par ville (ex: Lyon)
SELECT nom, ville, note FROM artisan WHERE ville LIKE '%Lyon%';

-- Test 5 : Vérification des privilèges de l'utilisateur dédié
SHOW GRANTS FOR 'artisan_admin'@'localhost';