'use strict';

import { QueryInterface } from "sequelize/types";

export async function up(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {

        await queryInterface.createTable('rooms', {
            id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
            },
            name: {
              type: Sequelize.STRING(45),
              allowNull: false
            },
            createdAt: {
              type: Sequelize.DATE,
              allowNull: false,
              defaultValue: Sequelize.NOW
            },
            updatedAt: {
              type: Sequelize.DATE,
              allowNull: true,
              defaultValue: null
            },
            deletedAt: {
              type: Sequelize.DATE,
              allowNull: true,
              defaultValue: null
            },
            avatar: {
              type: Sequelize.STRING.BINARY,
              allowNull: true,
              defaultValue: null
            }
        }, { transaction });

    });
}

export async function down(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {

        await queryInterface.dropTable('rooms', { transaction });

    });
}