import { ROOT_DIR } from '../../config';
import path from 'path';
import { TMedia, TMessageRequest } from "../../server/api/types";
import { Message } from "../../entities/Message";
import { Media } from "../../entities/Media";
import { EMediaFormatVideo, EMediaFormatPicture, EMediaFormatAudio, EMediaType, IMessage } from '../../types/entities';
import { Session } from "../../entities/Session";
import { EMessageError } from '../../server/api/types/errors';
import * as UserModel from '../User';
import * as MediaModel from '../Media';
import * as MessageMediaModel from '../MessageMedia';
import { IMedia } from '../../types/entities';

export type TCreateMediaOutput = Pick<IMedia, 'id' | 'name' | 'fileName' | 'format' | 'type' | 'url'>;

export async function storeMessage(message: TMessageRequest, session: Session, roomId: number): Promise<[Message, TCreateMediaOutput[] | null]> {
    console.info(`Message sent by username '${session.user.username}' to room with id '${roomId}'`);


    let storedMedias: TCreateMediaOutput[] | null = [];

    if(!roomId)
        throw new Error(EMessageError.Permission);

    const user = await UserModel.getByIdWithRoomId(session.userId, roomId);

    if(!user)
        throw new Error(EMessageError.Permission);

    const msg = await create({content: message.content, medium: message.medium, userId: user.id, roomId: roomId});

    if(!msg)
        throw new Error(EMessageError.ServerError);

    if(message.medium && message.medias){
        for (const medium of message.medias) {
            if(await checkMediumParams(medium)){

                const type = medium.type as EMediaType;
                let format;

                if(type === EMediaType.Video){
                    const match = Object.entries(EMediaFormatVideo).find(([key, value]) => value === medium.format);
                    format = match?.[1];
                }

                if(type === EMediaType.Picture){
                    const match = Object.entries(EMediaFormatPicture).find(([key, value]) => value === medium.format);
                    format = match?.[1];
                }
                
                if(type === EMediaType.Audio){
                    const match = Object.entries(EMediaFormatAudio).find(([key, value]) => value === medium.format);
                    format = match?.[1];
                }

                if( format == null )
                    continue;

                const newMedium = await MediaModel.create({...medium, format: format, type: type, path: "possible path if necessary"});
                storedMedias.push({id: newMedium.id, name: newMedium.name, fileName: newMedium.fileName, format: newMedium.format, type: newMedium.type, url: newMedium.url});
                await MessageMediaModel.create(msg.id, newMedium.id);
            }
        }
    }

    if(storedMedias.length === 0)
        storedMedias = null;
    
    return [msg, storedMedias];
}

export async function checkMediumParams(medium: TMedia): Promise<boolean>{
    if(medium.name == null ||
        medium.fileName == null ||
        medium.format == null ||
        medium.type == null ||
        medium.url == null
    )
        return false;

    return true;
}

export async function getByIdForUser(messageId: number, userId: number): Promise<Message | null>{
    return await Message.findOne({ 
        where: { id: messageId, userId: userId, deletedAt: null },
        include: [{
            model: Media,
            as: 'medias'
        }],
    });
}

export type TMessageCreateInput = Omit<IMessage, 'updatedAt' | 'createdAt' | 'deletedAt' | 'id' | 'user' | 'room'>;

export async function create(params: TMessageCreateInput): Promise<Message | null> {
    return await Message.create(params);
}

export async function deleteMessage(roomId: number, messageId: number, userId: number): Promise<number>{
    return await Message.destroy({
        where: {
            id: messageId,
            userId: userId,
            roomId: roomId,
            deletedAt: null
        }
    });
}

export async function findForRoomOffset(offset: number, limit: number, roomId: number): Promise<Message[] | null>{
    return await Message.findAll({
        order: [
            ['createdAt', 'DESC'],
        ],
        limit: limit,
        offset: ( offset ) || 0,
        where: { roomId: roomId, deletedAt: null },
        include: [{
            model: Media,
            as: 'medias'
        }]
    });
}