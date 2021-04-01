import { Room } from "../../entities/Room";
import { User } from '../../entities/';
import { IRoom } from '../../types/entities';

export type TRoomCreateInput = Pick<IRoom, 'name' | 'avatar' >;


export async function getById(roomId: number): Promise<Room | null> {
    return await Room.findOne({ 
        where: { id: roomId, deletedAt: null },
        include: [{
            model: User,
            as: 'users'
        }],
    });
}

export async function getAll(): Promise<Room[]> {
    return await Room.findAll({
        where: {deletedAt: null},
        include: [{
            model: User,
            as: 'users'
        }],
    });
}

export async function create(params: TRoomCreateInput): Promise<Room | null> {
    return await Room.create({
        ...params,
        createdAt: new Date()
    });
}

export async function updateNameOfRoom(newName: string, roomId: number): Promise<[number, Room[]]> {
    return await Room.update(
        {
            name: newName
        },
        {
            where: { 
                id: roomId
            }
        }
    );
}

export async function destroy(roomId: number): Promise<number> {
    return await Room.destroy(
        {
            where: { 
                id: roomId
            }
        }
    );
}