const { Sequelize, DataTypes } = require('sequelize');

// Initialisation de l'instance Sequelize avec les variables d'environnement de connexion
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: console.log,
        dialectOptions: {
            charset: 'utf8mb4'
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importation et enregistrement des modèles en leur injectant l'instance Sequelize
db.Categorie = require('./CategorieModel')(sequelize);
db.Specialite = require('./SpecialiteModel')(sequelize);
db.Artisan = require('./ArtisanModel')(sequelize);

// Définition des associations et des règles de cascade inter-tables
db.Categorie.hasMany(db.Specialite, { foreignKey: 'id_categorie', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
db.Specialite.belongsTo(db.Categorie, { foreignKey: 'id_categorie' });

db.Specialite.hasMany(db.Artisan, { foreignKey: 'id_specialite', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
db.Artisan.belongsTo(db.Specialite, { foreignKey: 'id_specialite' });

module.exports = db;