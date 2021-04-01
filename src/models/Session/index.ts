import { Session } from "../../entities/Session";
import { User } from '../../entities/';
import { IUser } from '../../types/entities';
import * as DeviceModel from '../Device';
import { ISession } from "../../types/entities";
import { TDevice } from '../../server/api/types';
import { Op } from 'sequelize';
import moment from 'moment';
import { v4 as uuidv4 } from "uuid";

export type TUserSessionInput = Pick<ISession, 'userId' | 'geolocation' | 'latitude' | 'longitude'>;
export type TSessionCreateInput = Omit<ISession, 'id' |'user' |'device' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export type TSessionPartial = Partial<ISession>;

export async function createSession(paramsSession: TUserSessionInput, paramsDevice: TDevice): Promise<Session>{
    const device = await DeviceModel.createForSession(paramsDevice);

    const token = uuidv4();

    const createdSession = await createForUser({
        ...paramsSession,
        deviceId: device.id,
        token: token,
        locked: false,
        expiresAt: null,
        lockedAt: null,
    });

    const session = await getByToken(createdSession.token);

    return <Session>session;
}

export async function getByUser(userId: number): Promise<Session | null> {
    return await Session.findOne({
        where: {
            userId: userId,
            expiresAt: {
                [Op.or]: {
                    [Op.gt]: moment().toDate(),
                    [Op.is]: null
                }
            },
            locked: false
        },
        include: [{ 
            model: User, 
            as: 'user'
        }]
    });
}

export async function getByToken(token: string): Promise<Session | null> {
    return await Session.findOne({
        where: { 
            token: token,
            expiresAt: {
                [Op.or]: {
                    [Op.gt]: moment().toDate(),
                    [Op.is]: null
                }
            },
            locked: false,
            deletedAt: null
        },
        include: [{ 
            model: User, 
            as: 'user'
        }]
    });
}

export async function createForUser(params: TSessionCreateInput): Promise<ISession> {
    return await Session.create(
        params, 
        {
            include: [{
                model: User,
                as: 'user'
            }],
        }
    );
}

export async function updateLogout(token: string, userId: number): Promise<[number, Session[]]> {
    return await Session.update(
        {
            expiresAt: new Date()
        },
        {
            where: { 
                userId: userId,
                token: token,
                locked: false,
            }
        }
    );
}