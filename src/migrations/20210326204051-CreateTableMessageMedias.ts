'use strict';

import { QueryInterface } from "sequelize/types";

export async function up(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {
        
        await queryInterface.createTable('message_medias', {
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
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null
            }
        }, { transaction });

        await queryInterface.addColumn('message_medias', 'messageId', {
            type: Sequelize.BIGINT,
            references: {
              model: 'messages',
              key: 'id'
            },
            onDelete: 'CASCADE',
        }, { transaction });
        
        await queryInterface.addColumn('message_medias', 'mediaId', {
            type: Sequelize.BIGINT,
            references: {
              model: 'medias',
              key: 'id'
            },
            onDelete: 'CASCADE',
        }, { transaction });

    });
}

export async function down(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {

        await queryInterface.dropTable('message_medias', { transaction });

    });
}