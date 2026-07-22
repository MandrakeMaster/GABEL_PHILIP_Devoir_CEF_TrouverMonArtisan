const { DataTypes } = require('sequelize');

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
        timestamps: false // Désactive l'ajout automatique des champs createdAt et updatedAt si tu ne les as pas dans ton SQL
    });

    return Artisan;
};