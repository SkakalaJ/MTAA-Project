import { Table, Column, Model, DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import { ISession } from "../types/entities";
import { User } from './User';
import { Device } from './Device';


@Table({ tableName: "sessions", modelName: 'session', timestamps: true })
export class Session extends Model<Session> implements ISession {
    
    @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => User)
    @Column({ allowNull: false, onDelete: 'CASCADE' })
    userId: number;
  
    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => Device)
    @Column({ allowNull: false, onDelete: 'CASCADE' })
    deviceId: number;
  
    @BelongsTo(() => Device)
    device: Device;
  
    @Column({ type: DataType.BOOLEAN, allowNull: false })
    geolocation: boolean;

    @Column({ type: DataType.DECIMAL(9,6), allowNull: true })
    longitude: number | null;

    @Column({ type: DataType.DECIMAL(8,6), allowNull: true })
    latitude: number | null;

    @Column({ type: DataType.UUID, allowNull: false })
    token: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    createdAt: Date;

    @Column({ type: DataType.DATE, allowNull: true })
    expiresAt: Date | null;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    locked: boolean;

    @Column({ type: DataType.DATE, allowNull: true })
    lockedAt: Date | null;
}