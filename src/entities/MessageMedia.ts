import { Table, Column, Model, DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import { IMessageMedia } from "../types/entities";
import { Message } from './Message';
import { Media } from './Media';

@Table({ tableName: "message_medias", modelName: 'message_media', timestamps: true, paranoid: true })
export class MessageMedia extends Model<MessageMedia> implements IMessageMedia {
    
    @Column({ type: DataType.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => Message)
    @Column({ allowNull: false, onDelete: 'CASCADE' })
    messageId: number;
  
    @BelongsTo(() => Message)
    message: Message;

    @ForeignKey(() => Media)
    @Column({ allowNull: false, onDelete: 'CASCADE' })
    mediaId: number;
  
    @BelongsTo(() => Media)
    media: Media;
}
