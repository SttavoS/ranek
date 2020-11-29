import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior() {
		return window.scrollTo({ top: 0, behavior: 'smooth' });
	},
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.auth)) {
		if(!window.localStorage.token) {
			next('/login');
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
