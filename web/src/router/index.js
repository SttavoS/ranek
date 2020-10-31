import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Product from '@/views/Product.vue';

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
	],
	scrollBehavior() {
		return window.scrollTo({ top: 0, behavior: 'smooth' });
	},
});

export default router;
