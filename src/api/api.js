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
    },

    logout() {
        return instance.delete('auth/login').then(response => response.data);
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url').then(response => response.data);
    }
}

export const profileAPI = {
    getUserProfile(userId) {
        return instance.get(`profile/${userId}`).then(response => response.data);
    },

    saveProfile(profileData) {
        return instance.put('profile', profileData).then(response => response.data);
    },

    savePhoto(photo) {
        let formData = new FormData();
        formData.append('image', photo)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },

    getUserStatus(userId) {
        return instance.get(`profile/status/${userId}`).then(response => response.data);
    },

    saveUserStatus(status) {
        return instance.put('profile/status', {status}).then(response => response.data);
    }
}

export const usersAPI = {
    getUsers(pageSize, portionNumber) {
        return instance.get(`users?count=${pageSize}&page=${portionNumber}`).then(response => response.data);
    },

    follow(userId) {
        return instance.post(`follow/${userId}`).then(response => response.data);
    },

    unfollow(userId) {
        return instance.delete(`follow/${userId}`).then(response => response.data);
    }
}