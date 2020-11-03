import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/services/api';

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	state: {
		login: false,
		user: {
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
		},
	},
	mutations: {
		UPDATE_LOGIN(state, payload) {
			state.login = payload;
		},
		UPDATE_USER(state, payload) {
			state.user = Object.assign(state.user, payload);
		},
	},
	actions: {
		getUser(context, payload) {
			return api.get(`/users/${payload}`)
				.then((response) => {
					context.commit('UPDATE_USER', response.data);
					context.commit('UPDATE_LOGIN', true);
				});
		},
		createUser(context, payload) {
			/** TODO: Remove this after the real API has created */
			context.commit('UPDATE_USER', { id: payload.email });
			return api.post('/users', payload);
		},
	},
	modules: {
	},
});