'use strict';

import { QueryInterface } from "sequelize/types";

export async function up(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {
        
        await queryInterface.createTable('room_users', {
            id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
            },
            createdBy: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            lastSeen: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }

        }, { transaction });

        await queryInterface.addColumn('room_users', 'userId', {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            },
            onDelete: 'CASCADE',
        }, { transaction });
        
        await queryInterface.addColumn('room_users', 'roomId', {
            type: Sequelize.INTEGER,
            references: {
              model: 'rooms',
              key: 'id'
            },
            onDelete: 'CASCADE',
        }, { transaction });

    });
}

export async function down(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {

        await queryInterface.dropTable('room_users', { transaction });

    });
}