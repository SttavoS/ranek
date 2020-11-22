import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import api from '@/services/api';

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	state: {
		login: false,
		token: localStorage.getItem('token') || '',
		user: {
			// id: '',
			// name: '',
			// email: '',
			// email_verified_at: '',
			// password: '',
			// cep: '',
			// street: '',
			// number: '',
			// neighborhood: '',
			// city: '',
			// state: '',
		},
		user_products: null,
	},
	mutations: {
		UPDATE_LOGIN(state, payload) {
			state.login = payload;
		},
		UPDATE_USER(state, payload) {
			state.user = payload;
		},
		UPDATE_USER_PRODUCTS(state, payload) {
			state.user_products = payload;
		},
		ADD_USER_PRODUCTS(state, payload) {
			state.user_products.unshift(payload);
		},
	},
	actions: {
		getUser(context) {
			return api.post('/auth/me')
				.then((response) => {
					console.log(response);
					context.commit('UPDATE_USER', response.data);
					context.commit('UPDATE_LOGIN', true);
				});
		},
		authenticateUser(context, payload) {
			return api.post('/auth/login', {
				email: payload.email,
				password: payload.password,
			}).then((response) => {
				localStorage.setItem('token', `Bearer ${response.data.access_token}`);
				context.commit('UPDATE_USER', response.data.user);
				context.commit('UPDATE_LOGIN', true);
			});
		},
		createUser(context, payload) {
			// TODO: Remove this after the real API has created
			context.commit('UPDATE_USER', { id: payload.email });
			return api.post('/user', payload);
		},
		getUserProducts(context) {
			api.get(`/products?user_id=${context.state.user.id}`)
				.then((response) => {
					context.commit('UPDATE_USER_PRODUCTS', response.data);
				});
		},
		logoutUser(context) {
			context.commit('UPDATE_USER', {
				id: '',
				name: '',
				email: '',
				password: '',
				cep: '',
				street: '',
				number: '',
				neighborhood: '',
				city: '',
				state: '',
			});
			context.commit('UPDATE_LOGIN', false);
		},
	},
	modules: {
	},
	plugins: [createPersistedState()],
});
