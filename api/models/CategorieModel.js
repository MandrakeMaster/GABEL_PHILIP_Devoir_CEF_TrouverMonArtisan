const { DataTypes } = require('sequelize');

/**
 * Définition du modèle Sequelize pour la table 'categorie'.
 */
module.exports = (sequelize) => {
    const Categorie = sequelize.define('Categorie', {
        id_categorie: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nom: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        tableName: 'categorie',
        timestamps: false
    });

    return Categorie;
};