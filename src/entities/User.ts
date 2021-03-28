import { Table, Column, Model, DataType } from "sequelize-typescript";
import { IUser } from "../types/entities";
import sequelize from "sequelize";


@Table({ tableName: "users", modelName: 'user', timestamps: true, paranoid: true })
export class User extends Model<User> implements IUser {
    
    @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.TEXT, allowNull: false, defaultValue: sequelize.literal(`'USR' || LPAD(nextval('users_bid_seq'::regclass)::TEXT, 8, '0')`) })
    bid: string;

    @Column({ type: DataType.STRING(512), allowNull: false })
    password: string;

    @Column({ type: DataType.STRING(45), allowNull: false })
    username: string;

    @Column({ type: DataType.STRING(256), allowNull: false })
    email: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    isActive: boolean;

    @Column({ type: DataType.DATE, allowNull: false })
    lastActive: Date;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    verified: boolean;

    @Column({ type: DataType.DATE, allowNull: false })
    verifiedAt: Date;

    @Column({ type: DataType.STRING(16), allowNull: true })
    phone: string | null;

    @Column({ type: DataType.DATE, allowNull: false })
    createdAt: Date;

    @Column({ type: DataType.DATE, allowNull: true })
    updatedAt: Date | null;

    @Column({ type: DataType.DATE, allowNull: true })
    deletedAt: Date | null;

    @Column({ type: DataType.STRING().BINARY, allowNull: true })
    avatar: string | null;
}