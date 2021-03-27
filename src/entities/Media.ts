import { Table, Column, Model, DataType } from "sequelize-typescript";
import { IMedia, EMediaType, EMediaFormatVideo, EMediaFormatPicture, EMediaFormatAudio } from "../types/entities";


@Table({ tableName: "medias", modelName: 'media', timestamps: true, paranoid: true })
export class Media extends Model<Media> implements IMedia {
    
    @Column({ type: DataType.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.STRING(45), allowNull: false })
    name: string;

    @Column({ type: DataType.STRING(45), allowNull: false })
    fileName: string;

    @Column({ type: DataType.STRING(10), allowNull: false })
    format: EMediaFormatVideo | EMediaFormatPicture | EMediaFormatAudio;

    @Column({ type: DataType.STRING(10), allowNull: false })
    type: EMediaType;

    @Column({ type: DataType.TEXT, allowNull: false })
    path: string;

    @Column({ type: DataType.DATE, allowNull: false })
    createdAt: Date;

    @Column({ type: DataType.DATE, allowNull: true })
    updatedAt: Date | null;

    @Column({ type: DataType.DATE, allowNull: true })
    deletedAt: Date | null;
}