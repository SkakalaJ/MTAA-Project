'use strict';

import { QueryInterface } from "sequelize/types";

export async function up(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {
        
      await queryInterface.sequelize.query(`CREATE SEQUENCE IF NOT EXISTS users_bid_seq START 1`);
      await queryInterface.createTable('users', {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          bid: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: Sequelize.literal(`'USR' || LPAD(nextval('users_bid_seq'::regclass)::TEXT, 8, '0')`)
          },
          password: {
            type: Sequelize.STRING(512),
            allowNull: false
          },
          username: {
            type: Sequelize.STRING(45),
            allowNull: false
          },
          email: {
            type: Sequelize.STRING(256),
            allowNull: false
          },
          isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
          },
          lastActive: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
          },
          verified: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
          },
          verifiedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
          },
          phone: {
            type: Sequelize.STRING(16),
            allowNull: true
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

        await queryInterface.dropTable('users', { transaction });
        
    });
}