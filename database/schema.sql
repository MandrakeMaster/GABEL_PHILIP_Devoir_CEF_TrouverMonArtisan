/*DROP DATABASE IF EXISTS trouve_ton_artisan;
CREATE DATABASE trouve_ton_artisan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE trouve_ton_artisan;

DROP USER IF EXISTS 'artisan_admin'@'localhost';
CREATE USER 'artisan_admin'@'localhost' IDENTIFIED BY 'AdminArtisan2026!';
GRANT SELECT, INSERT, UPDATE, DELETE ON trouve_ton_artisan.* TO 'artisan_admin'@'localhost';
FLUSH PRIVILEGES;*/

CREATE TABLE categorie (
    id_categorie INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE specialite (
    id_specialite INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    id_categorie INT NOT NULL,
    CONSTRAINT fk_specialite_categorie 
        FOREIGN KEY (id_categorie) REFERENCES categorie(id_categorie) 
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE artisan (
    id_artisan INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telephone VARCHAR(20),
    note DECIMAL(2,1) CHECK (note >= 0 AND note <= 5),
    ville VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    site_web VARCHAR(255),
    top BOOLEAN DEFAULT FALSE,
    id_specialite INT NOT NULL,
    CONSTRAINT fk_artisan_specialite 
        FOREIGN KEY (id_specialite) REFERENCES specialite(id_specialite) 
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;