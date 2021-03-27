'use strict';

import { QueryInterface } from "sequelize/types";

export async function up(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {
        
        await queryInterface.createTable('messages', {
            id: {
              type: Sequelize.BIGINT,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
                defaultValue: ""
            },
            medium: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }

        }, { transaction });

        await queryInterface.addColumn('messages', 'userId', {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            },
            onDelete: 'CASCADE',
        }, { transaction });
        
        await queryInterface.addColumn('messages', 'roomId', {
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

        await queryInterface.dropTable('messages', { transaction });

    });
}