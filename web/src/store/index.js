import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import api from '@/services/api';

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	state: {
		login: false,
		user: {},
		user_products: null,
	},
	mutations: {
		SET_LOGIN(state, payload) {
			state.login = payload;
		},
		SET_USER(state, payload) {
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
					context.commit('SET_USER', response.data.user);
					context.commit('SET_LOGIN', true);
				});
		},
		authenticateUser(context, payload) {
			return api.post('/auth/login', {
				email: payload.email,
				password: payload.password,
			}).then((response) => {
				localStorage.setItem('token', `Bearer ${response.data.access_token}`);
				context.commit('SET_USER', response.data.user);
				context.commit('SET_LOGIN', true);
			});
		},
		createUser(context, payload) {
			// TODO: Remove this after the real API has created
			context.commit('SET_USER', { id: payload.email });
			return api.post('/user', payload);
		},
		getUserProducts(context) {
			api.get(`/user/${context.state.user.id}/products`)
				.then((response) => {
					context.commit('UPDATE_USER_PRODUCTS', response.data.user_products);
				});
		},
		logoutUser(context) {
			context.commit('SET_USER', null);
			context.commit('SET_LOGIN', false);
			localStorage.removeItem('token');
		},
	},
	modules: {
	},
	plugins: [createPersistedState()],
});
