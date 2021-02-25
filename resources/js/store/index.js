import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import httpClient from '../services';

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	state: {
		currentUser: {},
	},
	mutations: {
		setCurrentUserState(state, value) {
            state.currentUser = value;
        }
	},
	actions: {
        setCurrentUser({ commit }) {
            httpClient.get('/auth/me')
                .then(response => {
                    commit('setCurrentUserState', response.data);
                });
        },
		cleanCurrentUser(context) {
			context.commit('setCurrentUserState', {});
			window.localStorage.removeItem('token');
		},
	},
	plugins: [createPersistedState()],
});
