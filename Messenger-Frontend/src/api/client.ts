import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:4000/api/',
    timeout: 1000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type':'application/json',
        'Accept':'application/json',
        // 'Origin':'http://localhost:4000'
    },
});

export class Post{

    postLogin = async (body: any) => {
        return await instance.post('/users/login', body); 
    }

    postRegister = async (body: any) => {
        return await instance.post('/users/register', body);
    }

    postLogout = async (body: any, token: string) => {
        return await instance.post('/users/logout', body, { headers: {'Authorization': 'Bearer ' + token}});
    }

    postMessage = async (roomId: number, body: any, token: string) => {
        return await instance.post('/rooms/' + roomId + '/messages/', body, { headers: {'Authorization': 'Bearer ' + token}})
    }

    postRoom = async (body: any, token: string) => {
        return await instance.post('/rooms/', body, { headers: {'Authorization': 'Bearer ' + token}});
    }

}

export class Put{

    updatePassword = async (body: any, token: string) => {
        return await instance.put('/users/password', body, {headers: {'Authorization': 'Bearer ' + token}});
    }

    updateRoom = async (roomId: number, body: any, token: string) => {
        return await instance.put('/rooms/' + roomId, body, { headers: {'Authorization': 'Bearer ' + token}});
    }

}

export class Get{

    getUserById = async (userId: number, token: string) => {
        return await instance.get('/users/' + userId, { headers: {'Authorization': 'Bearer ' + token}});
    }

    getUsersAll = async (token: string) => {
        return await instance.get('/users', { headers: {'Authorization': 'Bearer ' + token}});
    }

    getRoomsAll = async (token: string) => {
        return await instance.get('/users/rooms', { headers: {'Authorization': 'Bearer ' + token}});
    }

    getMessages = async (roomId: number, query: any, token: string) => {
        return await instance.get('/rooms/' + roomId + '/messages/', { params: query, headers: {'Authorization': 'Bearer ' + token} });
    }

}

export class Delete{

    deleteMessage = async (roomId: number, messageId: number, token: string) => {
        return await instance.delete('/rooms/' + roomId + '/messages/' + messageId, { headers: {'Authorization': 'Bearer ' + token}});
    }

}

export const post = new Post();
export const put = new Put();
export const get = new Get();
export const del = new Delete();