import Home from '../pages/Home.vue';
import Product from '../pages/Product.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Profile from '../pages/User/Profile.vue';
import UserProducts from '../pages/User/UserProducts.vue';
import UserPurchases from '../pages/User/UserPurchases.vue';
import UserSales from '../pages/User/UserSales.vue';
import EditProfile from '../pages/User/EditProfile.vue';
import PageNotFount from '../pages/errors/PageNotFount.vue';

export default [
	{ path: '*', component: PageNotFount },
	{ path: '/', name: 'home', component: Home },
	{ path: '/produto/:slug', name: 'product', component: Product, props: true },
	{ path: '/login', name: 'login', component: Login },
	{ path: '/registrar', name: 'register', component: Register },
	{
		path: '/user',
		component: Profile,
		meta: { auth: true },
		children: [
			{ path: '', name: 'user.edit', component: EditProfile },
			{ path: 'produtos', name: 'user.products', component: UserProducts },
			{ path: 'compras', name: 'user.purchases', component: UserPurchases },
			{ path: 'vendas', name: 'user.sales', component: UserSales }
		]
	}
];
