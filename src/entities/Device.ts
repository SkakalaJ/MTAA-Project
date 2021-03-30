import { Table, Column, Model, DataType} from "sequelize-typescript";
import { IDevice, EDeviceType } from "../types/entities";

@Table({ tableName: "devices", modelName: 'device', timestamps: true })
export class Device extends Model<Device> implements IDevice {
    
    @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.STRING(45), allowNull: false })
    type: EDeviceType;

    @Column({ type: DataType.STRING(128), allowNull: true })
    os: string | null;

    @Column({ type: DataType.STRING(128), allowNull: true })
    model: string | null;

    @Column({ type: DataType.BOOLEAN, allowNull: true })
    touchscreen: boolean | null;

    @Column({ type: DataType.BOOLEAN, allowNull: true })
    bluetooth: boolean | null;

    @Column({ type: DataType.BOOLEAN, allowNull: true })
    cookies: boolean | null;

    @Column({ type: DataType.STRING(16), allowNull: true })
    screenWidth: string | null;

    @Column({ type: DataType.STRING(16), allowNull: true })
    screenHeight: string | null;

    @Column({ type: DataType.STRING(8), allowNull: true })
    colorDepth: string | null;

    @Column({ type: DataType.DATE, allowNull: false })
    createdAt: Date;

    @Column({ type: DataType.DATE, allowNull: true })
    updatedAt: Date | null;

    @Column({ type: DataType.DATE, allowNull: true })
    deletedAt: Date | null;
}