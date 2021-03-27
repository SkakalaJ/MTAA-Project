'use strict';

import { QueryInterface } from "sequelize/types";

export async function up(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {
        
        await queryInterface.createTable('medias', {
            id: {
              type: Sequelize.BIGINT,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
            },
            name: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            fileName: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            format: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            type: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            path: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true
            }

        }, { transaction });

    });
}

export async function down(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {

        await queryInterface.dropTable('medias', { transaction });

    });
}