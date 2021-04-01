import { Room } from "../../entities/Room";
import { User } from '../../entities/';

export async function getById(roomId: number): Promise<Room | null> {
    return await Room.findOne({ 
        where: { id: roomId },
        include: [{
            model: User,
            as: 'users'
        }],
    });
}

export async function getAll(): Promise<Room[]> {
    return await Room.findAll({ 
        include: [{
            model: User,
            as: 'users'
        }],
    });
}