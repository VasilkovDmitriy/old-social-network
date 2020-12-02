import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '4101c911-9bf9-4b6f-b6dd-1ba4c9dfe8f8'
    }
});

const authAPI = {
    me() {
        return instance.get('auth/me')
            .then(response => console.log(response.data))
            .catch(response => console.log(response))
    }
}