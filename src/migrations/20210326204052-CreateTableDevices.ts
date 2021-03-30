'use strict';

import { QueryInterface } from "sequelize/types";

export async function up(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {
        
        await queryInterface.createTable('devices', {
            id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
            },
            type: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            os: {
                type: Sequelize.STRING(128),
                allowNull: true
            },
            model: {
                type: Sequelize.STRING(128),
                allowNull: true
            },
            touchscreen: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            bluetooth: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            cookies: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            screenWidth: {
                type: Sequelize.STRING(16),
                allowNull: true
            },
            screenHeight: {
                type: Sequelize.STRING(16),
                allowNull: true
            },
            colorDepth: {
                type: Sequelize.STRING(8),
                allowNull: true
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null
            },
            
        }, { transaction });

    });
}

export async function down(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {

        await queryInterface.dropTable('devices', { transaction });

    });
}