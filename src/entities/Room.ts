import { Table, Column, Model, DataType} from "sequelize-typescript";
import { IRoom } from "../types/entities";

@Table({ tableName: "rooms", modelName: 'room', timestamps: true, paranoid: true })
export class Room extends Model<Room> implements IRoom {
    
    @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.STRING(45), allowNull: false })
    name: string;

    @Column({ type: DataType.DATE, allowNull: false })
    createdAt: Date;

    @Column({ type: DataType.DATE, allowNull: true })
    updatedAt: Date | null;

    @Column({ type: DataType.DATE, allowNull: true })
    deletedAt: Date | null;

    @Column({ type: DataType.STRING().BINARY, allowNull: true })
    avatar: string | null;
}