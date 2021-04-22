import { Sequelize } from 'sequelize-typescript';
import { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DATABASE } from "./config";
import { User } from "./User";
import { Device } from "./Device";
import { Media } from './Media';
import { BlockList } from './BlockList';
import { Message } from './Message';
import { MessageMedia } from './MessageMedia';
import { Room } from './Room';
import { RoomUser } from './RoomUser';
import { Session } from './Session';

export {
    User,
    BlockList,
    Device,
    Session,
    Media,
    Room,
    RoomUser,
    Message,
    MessageMedia
};

const models = [
    User,
    BlockList,
    Device,
    Session,
    Media,
    Room,
    RoomUser,
    Message,
    MessageMedia
];

let sequelize: Sequelize | null = null;

export async function initDatabase(): Promise<any> {
    sequelize = new Sequelize({
        host: POSTGRES_HOST,
        database: POSTGRES_DATABASE,
        dialect: 'postgres',
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        models: models,
        logging: false,
    });

    return sequelize;
}

export function getConnection() {
    return sequelize;
}
