const { Sequelize, DataTypes } = require('sequelize');

/**
 * Initialisation de l'instance Sequelize avec les variables d'environnement.
 * Le SSL est activé uniquement si explicitement requis (ex: en production).
 */
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4',
            ...(process.env.DB_SSL === 'true' && {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            })
        },
        logging: process.env.NODE_ENV !== 'production' ? console.log : false
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importation et enregistrement des modèles
db.Categorie = require('./CategorieModel')(sequelize);
db.Specialite = require('./SpecialiteModel')(sequelize);
db.Artisan = require('./ArtisanModel')(sequelize);

// Définition des associations et des règles de cascade inter-tables
db.Categorie.hasMany(db.Specialite, { foreignKey: 'id_categorie', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
db.Specialite.belongsTo(db.Categorie, { foreignKey: 'id_categorie' });

db.Specialite.hasMany(db.Artisan, { foreignKey: 'id_specialite', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
db.Artisan.belongsTo(db.Specialite, { foreignKey: 'id_specialite' });

module.exports = db;