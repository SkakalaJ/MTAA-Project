'use strict';

import { QueryInterface } from "sequelize/types";

export async function up(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {
        
        await queryInterface.bulkInsert('users', [
            {
                id: 1,
                password: "$2b$10$vEZGd3pEVoULjPj5y.FB5ew5pmWMxO1Hcj7Dzwu3Qiqlz/1kU.vzy", // prihlasovacie heslo pre tento hash: {JD_FIIT}
                username: "JurajDurej",
                email: "admin@admin.sk",
                isActive: false,
                lastActive: new Date(),
                verified: true,
                verifiedAt: new Date(),
                phone: null,
                createdAt: new Date(),
                updatedAt: null,
                deletedAt: null,
                avatar: null,
            }
          ], { transaction });
      
          await queryInterface.sequelize.query(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM "users"))`, { transaction });
          await queryInterface.sequelize.query(`SELECT setval('users_bid_seq', currval('users_id_seq'))`, { transaction });

          await queryInterface.bulkInsert('users', [
            {
                id: 2,
                password: "$2b$10$YKhwwVgt0VOvnUiWziK2/.KiHPn3OA/s3mz2wRI7uSoRFQlBorzYW", // prihlasovacie heslo pre tento hash: {JS_FIIT}
                username: "JurajSkakala",
                email: "admin@admin.sk",
                isActive: false,
                lastActive: new Date(),
                verified: true,
                verifiedAt: new Date(),
                phone: null,
                createdAt: new Date(),
                updatedAt: null,
                deletedAt: null,
                avatar: null,
            }
          ], { transaction });
      
          await queryInterface.sequelize.query(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM "users"))`, { transaction });
          await queryInterface.sequelize.query(`SELECT setval('users_bid_seq', currval('users_id_seq'))`, { transaction });
      

    });
}

export async function down(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {

        await queryInterface.bulkDelete('users', { id: 1 }, { transaction });
        await queryInterface.bulkDelete('users', { id: 2 }, { transaction });

    });
}