import { Table, Column, Model, DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import { IRoomUser } from "../types/entities";
import { User } from './User';
import { Room } from './Room';

@Table({ tableName: "room_users", modelName: 'room_user', timestamps: true, paranoid: true })
export class RoomUser extends Model<RoomUser> implements IRoomUser {
    
    @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => User)
    @Column({ allowNull: false, onDelete: 'CASCADE' })
    userId: number;
  
    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => Room)
    @Column({ allowNull: false, onDelete: 'CASCADE' })
    roomId: number;
  
    @BelongsTo(() => Room)
    room: Room;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    createdBy: boolean;

    @Column({ type: DataType.DATE, allowNull: false })
    createdAt: Date;

    @Column({ type: DataType.DATE, allowNull: true })
    updatedAt: Date | null;

    @Column({ type: DataType.DATE, allowNull: true })
    deletedAt: Date | null;

    @Column({ type: DataType.DATE, allowNull: false })
    lastSeen: Date;
}