import { Media } from "../../entities/Media";
import { IMedia } from "../../types/entities";
import * as MessageMediaModel from '../MessageMedia';

export async function deleteByIds(medias: Media[]): Promise<number>{
    let ids: number[] = [];

    for (const medium of medias) {
        ids.push(medium.id);
    }

    if(ids.length === 0)
        return 0;

    await MessageMediaModel.deleteMedias(ids);
    return await deleteMedias(ids);
}

export type TMediaCreateInput = Omit<IMedia, 'updatedAt' | 'createdAt' | 'deletedAt' | 'id'>;

export async function create(params: TMediaCreateInput): Promise<IMedia> {
    return await Media.create(params);
}

export async function deleteMedias(ids: number[]): Promise<number>{
    return await Media.destroy({
        where: {
            id: ids,
            deletedAt: null
        }
    });
}