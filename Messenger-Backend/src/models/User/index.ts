import { User } from '../../entities/User';
import { Room } from '../../entities/Room';
import { Session } from '../../entities/Session';
import * as SessionModel from '../Session';
import { ISession } from '../../types/entities';
import { IUser } from '../../types/entities';
import { ELoginError, ERegisterError, EAccessError, EPasswdUpdateError } from '../../server/api/types/errors';
import { TDevice } from '../../server/api/types';
import { TGeolocation } from '../../server/api/types';
import bcrypt from 'bcrypt';

export type TSessionParams = Pick<ISession, 'geolocation' | 'latitude' | 'longitude'>;
export type TUserCreateInput = Pick<IUser, 'password' | 'username' | 'email' | 'phone'>;

export async function login(username: string, password: string, geolocation: boolean, geoParams: TGeolocation | null, device: TDevice): Promise<Session> {
    console.info(`Login attempt with username '${username}'`);

    const user = await getByLogin(username);

    if (!user)
        throw new Error(ELoginError.Invalid);

    if (!user.password || !(await bcrypt.compare(password, user.password)))
        throw new Error(ELoginError.Invalid);

    const session = await SessionModel.getByUser(user.id);

    if (session)
        return session;

    const newSession = await SessionModel.createSession({
        userId: user.id, 
        geolocation: geolocation, 
        latitude: geoParams? geoParams.latitude : null, 
        longitude: geoParams? geoParams.longitude : null
    }, device);

    return newSession;
}

export async function updatePassword(userBid: string, password: string, newPassword: string, token: string): Promise<User>{
    console.info(`Password change attempt with userBid '${userBid}'`);

    let session: Session;
    try{ 
        session = await verifyToken(token, userBid);
    }catch(err){
        throw err;
    }

    if (!session.user.password || !(await bcrypt.compare(password, session.user.password)))
        throw new Error(EPasswdUpdateError.WrongOldPassword);

    const saltRounds = 10;
    const hashedPasswd = bcrypt.hashSync(newPassword, saltRounds);
    await updatePasswordForUser(hashedPasswd, session.userId);

    const userUpdated = await getById(session.userId);

    if (!newPassword || !(await bcrypt.compare(newPassword, userUpdated!.password)))
        throw new Error(EPasswdUpdateError.UpdateServerError);

    await SessionModel.updateLogout(session.token, session.userId);

    return <User>userUpdated;
}

export async function verifyToken(token: string, userBid: string): Promise<Session>{
    const session = await SessionModel.getByToken(token);

    if(!session)
        throw new Error(EAccessError.InvalidToken);

    if( session.user.bid !== userBid)
        throw new Error(EAccessError.InvalidToken);

    return session;
}

export async function logout(userBid: string, token: string): Promise<string>{
    console.info(`Logout attempt with userBid '${userBid}'`);

    let session: Session;
    try{ 
        session = await verifyToken(token, userBid);
    }catch(err){
        throw err;
    }

    const sessionUpdated = await SessionModel.updateLogout(session.token, session.userId);

    if(!sessionUpdated )
        throw new Error(EAccessError.InvalidToken);

    return "User logged out.";
}

export async function register(username: string, password: string, email: string, phone: string | null): Promise<User>{
    console.info(`Register attempt with username '${username}'`);

    const user = await getByLogin(username);

    if (user)
        throw new Error(ERegisterError.Used);

    const saltRounds = 10;
    const passwd = bcrypt.hashSync(password, saltRounds);
    const newUser = await create({username: username, password: passwd, email: email, phone: phone});

    return <User>newUser;
}

export async function getByLogin(login: string): Promise<User | null> {
    return await User.findOne({ where: { username: login } });
}

export async function getById(userId: number): Promise<User | null> {
    return await User.findOne({ 
        where: { 
            id: userId,
            deletedAt: null
        },
        attributes: ['bid', 'username', 'verified','avatar', 'createdAt']
    });
}

export async function create(params: TUserCreateInput): Promise<User | null> {
    return await User.create({
        ...params,
        isActive: true,
        verified: true,
        verifiedAt: new Date(),
        lastActive: new Date(),
    });
}

export async function updatePasswordForUser(newPassword: string, userId: number): Promise<[number, User[]]> {
    return await User.update(
        {
            password: newPassword
        },
        {
            where: { 
                id: userId,
                deletedAt: null
            }
        }
    );
}

export async function getByIdWithRoomId(userId: number, roomId: number): Promise<User | null> {
    return await User.findOne({ 
        where: { id: userId, deletedAt: null },
        include: [{
            model: Room,
            as: 'rooms',
            where: { id: roomId }
        }],
    });
}

export async function getAllWithRoomId(): Promise<User[] | null> {
    return await User.findAll({ 
        where: { deletedAt: null },
        include: [{
            model: Room,
            as: 'rooms'
        }],
    });
}