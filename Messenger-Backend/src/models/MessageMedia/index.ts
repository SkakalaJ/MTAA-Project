import { MessageMedia } from "../../entities/MessageMedia";

export async function create(messageId: number, mediaId: number): Promise<MessageMedia | null> {
    return await MessageMedia.create({
        messageId: messageId,
        mediaId: mediaId
    });
}

export async function deleteMedias(mediaIds: number[]): Promise<number>{
    return await MessageMedia.destroy({
        where: {
            mediaId: mediaIds,
            deletedAt: null
        }
    });
}