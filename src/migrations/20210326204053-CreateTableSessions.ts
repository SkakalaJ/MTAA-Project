'use strict';

import { QueryInterface } from "sequelize/types";

export async function up(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {
        
        await queryInterface.createTable('sessions', {
            id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
            },
            geolocation: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            longitude: {
                type: Sequelize.DECIMAL(9,6),
                allowNull: true
            },
            latitude: {
                type: Sequelize.DECIMAL(8,6),
                allowNull: true
            },
            token: {
                type: Sequelize.UUID,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            expiresAt: {
              type: Sequelize.DATE,
              allowNull: true
            },
            locked: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            lockedAt: {
              type: Sequelize.DATE,
              allowNull: true
            }
            
        }, { transaction });

        await queryInterface.addColumn('sessions', 'userId', {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            },
            onDelete: 'CASCADE',
        }, { transaction });

        await queryInterface.addColumn('sessions', 'deviceId', {
            type: Sequelize.INTEGER,
            references: {
              model: 'devices',
              key: 'id'
            },
            onDelete: 'CASCADE',
        }, { transaction });

    });
}

export async function down(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {

        await queryInterface.dropTable('sessions', { transaction });

    });
}