'use strict';

import { QueryInterface } from "sequelize/types";

export async function up(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {
        
        await queryInterface.bulkInsert('rooms', [
            {
                id: 1,
                name: "Chatroom",
                createdAt: new Date(),
                updatedAt: null,
                deletedAt: null,
                avatar: null,
            }
          ], { transaction });
      
          await queryInterface.sequelize.query(`SELECT setval('rooms_id_seq', (SELECT MAX(id) FROM "rooms"))`, { transaction });
          
          await queryInterface.bulkInsert('room_users', [
            {
                id: 1,
                createdBy: true,
                lastSeen: new Date(),
                userId: 1,
                roomId: 1,
            }
          ], { transaction });
      
          await queryInterface.sequelize.query(`SELECT setval('room_users_id_seq', (SELECT MAX(id) FROM "room_users"))`, { transaction });
          
          await queryInterface.bulkInsert('room_users', [
            {
                id: 2,
                createdBy: false,
                lastSeen: new Date(),
                userId: 2,
                roomId: 1,
            }
          ], { transaction });
      
          await queryInterface.sequelize.query(`SELECT setval('room_users_id_seq', (SELECT MAX(id) FROM "room_users"))`, { transaction });
          

    });
}

export async function down(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {

        await queryInterface.bulkDelete('rooms', { id: 1 }, { transaction });
        await queryInterface.bulkDelete('room_users', { id: 1 }, { transaction });
        await queryInterface.bulkDelete('room_users', { id: 2 }, { transaction });
    });
}