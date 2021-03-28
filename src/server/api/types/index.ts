import { ELoginError } from './errors';

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
    password: string
}