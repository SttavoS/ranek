import Vue from 'vue';
import PageLoading from '@/components/PageLoading.vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.component('PageLoading', PageLoading);
Vue.filter('formatedPrice', (value) => {
	const price = Number(value);
	if (!isNaN(price)) {
		return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
	}
	return value;
});

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
