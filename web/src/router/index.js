import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Product from '@/views/Product.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import User from '@/views/User/User.vue';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
		},
		{
			path: '/produto/:id',
			name: 'product',
			component: Product,
			props: true,
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
		},
		{
			path: '/registrar',
			name: 'register',
			component: Register,
		},
		{
			path: '/perfil',
			name: 'user',
			component: User,
		},
	],
	scrollBehavior() {
		return window.scrollTo({ top: 0, behavior: 'smooth' });
	},
});

export default router;
