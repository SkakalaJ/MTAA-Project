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

    postLogout = async (body: any) => {
        return await instance.post('/users/logout', body);
    }

    postMessage = async (roomId: number, body: any) => {
        return await instance.post('/users/' + roomId + '/messages/', body)
    }

    postRoom = async (body: any) => {
        return await instance.post('/rooms/', body);
    }

}

export class Put{

    updatePassword = async (body: any) => {
        return await instance.put('/users/password', body);
    }

    updateRoom = async (roomId: number, body: any) => {
        return await instance.put('/rooms/' + roomId, body);
    }

}

export class Get{

    getUserById = async (userId: number) => {
        return await instance.get('/users/' + userId);
    }

    getMessages = async (roomId: number, query: any) => {
        return await instance.get('/rooms/' + roomId + '/messages/', { params: query });
    }

}

export class Delete{

    deleteMessage = async (roomId: number, messageId: number) => {
        return await instance.delete('/rooms/' + roomId + '/messages/' + messageId);
    }

}

export const post = new Post();
export const put = new Put();
export const get = new Get();
export const del = new Delete();