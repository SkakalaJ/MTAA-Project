import { Table, Column, Model, DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import { IBlockList } from "../types/entities";
import { User } from './User';

@Table({ tableName: "block_lists", modelName: 'block_list', timestamps: true })
export class BlockList extends Model<BlockList> implements IBlockList {
    
    @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => User)
    @Column({ allowNull: false, onDelete: 'CASCADE' })
    userId: number;
  
    @BelongsTo(() => User)
    user: User;

    @Column({ type: DataType.ARRAY(DataType.NUMBER), allowNull: false })
    blockedUsersIds: number[];

    @Column({ type: DataType.DATE, allowNull: false })
    createdAt: Date;

    @Column({ type: DataType.DATE, allowNull: true })
    updatedAt: Date | null;

    @Column({ type: DataType.DATE, allowNull: true })
    deletedAt: Date | null;
}