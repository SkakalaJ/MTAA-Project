import { User } from '../../entities/User';
import { IUser } from '../../types/entities';
import { ELoginError } from '../../server/api/types/errors';
import { FindOptions } from '../../types';
import bcrypt from 'bcrypt';
import sequelize from "sequelize";

export async function login(username: string, password: string): Promise<IUser | null> { //Promise<IUserSession>
    const user = await getByLogin(username);

    console.info(`Login attempt with username '${username}'`);

    if (!user)
        throw new Error(ELoginError.Invalid);

    if (!user.password || !(await bcrypt.compare(password, user.password)))
        throw new Error(ELoginError.Invalid);

    // const session = await UserSession.createForUser(user.id, params);
    // return { ...<IUserSession>session.get({ plain: true }), user };
    return user;
}


export async function getByLogin(login: string): Promise<User | null> {
    return await User.findOne({ where: { username: login } });
}
