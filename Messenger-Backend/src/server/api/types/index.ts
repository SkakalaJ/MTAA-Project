
import { ELoginError, ERegisterError, ELogoutError, EAccessError, EPasswdUpdateError, EMessageError } from './errors';
import { EDeviceType, IRoom } from '../../../types/entities';
import { IUser } from '../../../types/entities';
import { TCreateMediaOutput } from '../../../models/Message';

export type TUser = Pick<IUser, 'bid' | 'username' | 'email' | 'phone' | 'avatar' | 'verified'>;
export type TRoom = Pick<IRoom, 'id' | 'name' | 'avatar' >;

export type TMessageUser = {
    username: string,
    bid: string,
    avatar: string | null,
    owner: boolean
}

export type TDevice = {
    type: EDeviceType,
    os: string | null,
    model: string | null,
    touchscreen: boolean | null,
    bluetooth: boolean | null,
    cookies: boolean | null,
    screenWidth: string | null,
    screenHeight: string | null,
    colorDepth: string | null,
}

export type TMedia = {
    name: string,
    fileName: string,
    format: string,
    type: string,
    url: string
}

export type TMessage = {
    id: number,
    createdAt: Date,
    content: string,
    sentBy: TMessageUser,
    seenBy: TMessageUser[]
}

export type TGeolocation = {
    latitude: number,
    longitude: number
}

export type TLoginResponseData = {
    userBid: string,
    username: string,
    accessToken: string
}

export type TLoginResponse = {
    error: ELoginError | null,
    data: TLoginResponseData | null,
}

export type TLoginRequest = {
    username: string,
    password: string,
    geolocation: boolean,
    geoParams: TGeolocation | null,
    device: TDevice
}

export type TRegisterResponseData = {
    userBid: string,
    username: string,
    email: string,
    phone: string | null,
    verified: boolean,
    avatar: string | null;
}

export type TRegisterResponse = {
    error: ERegisterError | null,
    data: TRegisterResponseData | null,
}

export type TRegisterRequest = {
    password: string,
    username: string,
    email: string,
    phone: string | null,
}

export type TLogoutResponse = {
    error: ELogoutError | EAccessError | null,
    data: string | null,
}

export type TLogoutRequest = {
    userBid: string,
    device: TDevice | null
}

export type TUpdatePasswdResponse = {
    error: EPasswdUpdateError | null,
    data: TUser | null,
}

export type TUpdatePasswdRequest = {
    userBid: string
    password: string,
    newPassword: string,
}

export type TMessageResponse = {
    error: EMessageError | null,
    data: TMessageResponseData | null,
}

export type TUserMessage = {
    avatar: string | null,
    bid: string,
    username: string,
    owner: boolean
}

export type TMessageResponseData = {
    id: number,
    roomId: number,
    content: string,
    createdAt: Date,
    sentBy: TUserMessage,
    seenBy: TUserMessage[],
    media: boolean,
    medias: TCreateMediaOutput[] | null

}

export type TMessageRequest = {
    content: string,
    medium: boolean,
    medias: TMedia[] | null,
}

export type TMessageDeleteResponse = {
    error: EMessageError | null,
    data: TMessageResponseData | null,
}

export type TAnyResponse = {
    error: any | null,
    data: any | null
}