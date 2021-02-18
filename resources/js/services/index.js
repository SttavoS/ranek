import axios from 'axios';
import AuthService from './auth';
import ProductsService from './products';
import router from '../router/';

const httpClient = axios.create({
	baseURL: 'http://127.0.0.1:8000/api',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

httpClient.interceptors.request.use(config => {
	const token = window.localStorage.getItem('token');

    if (token) {
        config.headers.common.Authorization = `Bearer ${token}`;
    }

    return config;
});

httpClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const canThrowAnError = error.request.status === 0 || error.request.status === 500;

    if (canThrowAnError) {
        throw new Error(error.message);
    }

    if (error.response.status === 401) {
        router.push({ name: 'home' });
    }

    return error;
});

export default {
    auth: AuthService(httpClient),
    products: ProductsService(httpClient)
};
