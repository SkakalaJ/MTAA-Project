export enum EMediaFormatPicture {
    JPEG = '.jpeg',
    JPG = '.jpg',
    GIF = '.gif',
    PNG = '.png',
    RAW = '.raw',
}

export enum EMediaFormatVideo { 
    WEBM = '.webm',
    MPG = '.mpg',
    MP2 = '.mp2',
    MPEG = '.mpeg',
    MPE = '.mpe',
    MPV = '.mpv',
    OGG = '.ogg',
    MP4 = '.mp4',
    M4P = '.m4p',
    M4V = '.m4v',
    AVI = '.avi',
    WMV = '.wmv',
    MOV = '.mov',
}

export enum EMediaFormatAudio {
    M4A = '.mp4',
    FLAC = '.flac',
    MP3 = '.mp3',
    MP4 = '.mp4',
    WAV = '.wav',
    WMA = '.wma',
    AAC = '.aac',
}

export enum EMediaType {
    Video = 'video',
    Picture = 'picture',
    Audio = 'audio',
}

export enum EDeviceType {
    Mobile = 'mobile phone',
    Tablet = 'tablet',
    PC = 'portable computer',
    Unknown = 'unknown'
}

export interface IUser {
    id: number;
    password: string;
    username: string;
    email: string;
    isActive: boolean;
    lastActive: Date;
    verified: boolean;
    verifiedAt: Date;
    phone: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    avatar: string | null;
}

export interface IMessage {
    id: number;
    user: IUser;
    userId: number;
    room: IRoom;
    roomId: number;
    createdAt: Date;
    deletedAt: Date | null;
    content: string;
    medium: boolean;
}

export interface IRoom {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    avatar: string | null;
}

export interface IRoomUser {
    id: number;
    user: IUser;
    userId: number;
    room: IRoom;
    roomId: number;
    createdBy: boolean;
    lastSeen: Date;
}

export interface IMedia {
    id: number;
    name: string;
    fileName: string;
    format: EMediaFormatVideo | EMediaFormatPicture | EMediaFormatAudio;
    type: EMediaType;
    path: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}

export interface IMessageMedia {
    id: number;
    message: IMessage;
    messageId: number;
    media: IMedia;
    mediaId: number;
}

export interface IBlockList {
    id: number;
    user: IUser;
    userId: number;
    blockedUsersIds: number[];
    createdAt: Date;
    updatedAt: Date | null;
}

export interface ISession {
    id: number;
    user: IUser;
    userId: number;
    device: IDevice;
    deviceId: number;
    geolocation: boolean;
    longitude: number | null;
    latitude: number | null;
    sessionId: string;
    token: string;
    createdAt: Date;
    expiresAt: Date | null;
    locked: boolean;
    lockedAt: Date | null;
}

export interface IDevice {
    id: number;
    type: EDeviceType;
    os: string | null;
    model: string | null;
    touchscreen: boolean | null;
    bluetooth: boolean | null;
    cookies: boolean | null;
    screenWidth: string | null;
    screenHeight: string | null;
    colorDepth: string | null;
    createdAt: Date;
}