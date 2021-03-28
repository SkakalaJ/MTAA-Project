'use strict';

import { QueryInterface } from "sequelize/types";

export async function up(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {
        
        await queryInterface.bulkInsert('messages', [
            {
                id: 1,
                content: "Message from Juraj Durej",
                createdAt: new Date(),
                deletedAt: null,
                medium: false,
                userId: 1,
                roomId: 1,
            }
          ], { transaction });
      
          await queryInterface.sequelize.query(`SELECT setval('messages_id_seq', (SELECT MAX(id) FROM "messages"))`, { transaction });

          await queryInterface.bulkInsert('messages', [
            {
                id: 2,
                content: "Message from Juraj Skakala",
                createdAt: new Date(),
                deletedAt: null,
                medium: false,
                userId: 2,
                roomId: 1,
            }
          ], { transaction });
      
          await queryInterface.sequelize.query(`SELECT setval('messages_id_seq', (SELECT MAX(id) FROM "messages"))`, { transaction });
          

    });
}

export async function down(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {

        await queryInterface.bulkDelete('messages', { id: 1 }, { transaction });
        await queryInterface.bulkDelete('messages', { id: 2 }, { transaction });

    });
}