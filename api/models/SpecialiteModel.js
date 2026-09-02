const { DataTypes } = require('sequelize');

/**
 * Définition du modèle Sequelize pour la table 'specialite'.
 */
module.exports = (sequelize) => {
    const Specialite = sequelize.define('Specialite', {
        id_specialite: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nom: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        id_categorie: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'specialite',
        timestamps: false
    });

    return Specialite;
};