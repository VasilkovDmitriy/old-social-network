import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '4101c911-9bf9-4b6f-b6dd-1ba4c9dfe8f8'
    }
});

export const authAPI = {
    me() {
        return instance.get('auth/me').then(response => response.data);
    },

    login(email, password, rememberMe, captcha) {
        return instance.post('auth/login', {email, password, rememberMe, captcha})
            .then(response => response.data);
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url').then(response => response.data);
    }
}