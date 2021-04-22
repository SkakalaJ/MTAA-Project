import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany} from "sequelize-typescript";
import { IMessage } from "../types/entities";
import { User } from './User';
import { Room } from './Room';
import { Media } from './Media';
import { MessageMedia } from './MessageMedia';

@Table({ tableName: "messages", modelName: 'message', timestamps: true, paranoid: true })
export class Message extends Model<Message> implements IMessage {
    
    @Column({ type: DataType.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true })
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

    @Column({ type: DataType.DATE, allowNull: false })
    createdAt: Date;

    @Column({ type: DataType.DATE, allowNull: true })
    deletedAt: Date | null;

    @Column({ type: DataType.TEXT, allowNull: false })
    content: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    medium: boolean;

    @Column({ type: DataType.DATE, allowNull: true })
    updatedAt: Date | null;

    @BelongsToMany(() => Media, () => MessageMedia)
    medias: Media[];
}