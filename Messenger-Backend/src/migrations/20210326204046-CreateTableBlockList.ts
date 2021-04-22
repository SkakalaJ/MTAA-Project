'use strict';
import { QueryInterface } from "sequelize/types";

export async function up(queryInterface: QueryInterface, Sequelize: any): Promise<void> {

    await queryInterface.sequelize.transaction(async (transaction) => {
        
        await queryInterface.createTable('block_lists', {
            id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            blockedUsersIds: {
              type: Sequelize.ARRAY(Sequelize.INTEGER),
              allowNull: false,
              defaultValue: []
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
        }, { transaction });

        await queryInterface.addColumn('block_lists', 'userId', {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            },
            onDelete: 'CASCADE',
        }, { transaction });

    });
}

export async function down(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {

        await queryInterface.dropTable('block_lists', { transaction });

    });
}