const { DataTypes } = require('sequelize');

/**
 * Définition du modèle Sequelize pour la table 'artisan'.
 */
module.exports = (sequelize) => {
    const Artisan = sequelize.define('Artisan', {
        id_artisan: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nom: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        telephone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        note: {
            type: DataTypes.DECIMAL(2, 1),
            allowNull: true,
            validate: {
                min: 0,
                max: 5
            }
        },
        ville: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        site_web: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        top: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'artisan',
        timestamps: false // Désactive les champs createdAt et updatedAt
    });

    return Artisan;
};