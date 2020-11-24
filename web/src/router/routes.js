import Home from '@/views/Home.vue';
import Product from '@/views/Product.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Profile from '@/views/User/Profile.vue';
import UserProducts from '@/views/User/UserProducts.vue';
import UserPurchases from '@/views/User/UserPurchases.vue';
import UserSales from '@/views/User/UserSales.vue';
import EditProfile from '@/views/User/EditProfile.vue';

export default [
	{ path: '/', name: 'Home', component: Home },
	{ path: '/produto/:slug', name: 'product', component: Product, props: true },
	{ path: '/login', name: 'login', component: Login },
	{ path: '/registrar', name: 'register', component: Register },
	{
		path: '/user',
		component: Profile,
		children: [
			{ path: '', name: 'user.edit', component: EditProfile },
			{ path: 'produtos', name: 'user.products', component: UserProducts },
			{ path: 'compras', name: 'user.purchases', component: UserPurchases },
			{ path: 'vendas', name: 'user.sales', component: UserSales }
		]
	}
];
