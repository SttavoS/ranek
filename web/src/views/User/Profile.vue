<template>
	<section class="user">
		<aside>
			<ul>
				<li>
					<router-link :to="{name: 'user.edit'}">Editar Perfil</router-link>
				</li>
				<li>
					<router-link :to="{name: 'user.products'}">Meus Produtos</router-link>
				</li>
				<li>
					<router-link :to="{name: 'user.purchases'}">Minhas Compras</router-link>
				</li>
				<li>
					<router-link :to="{name: 'user.sales'}">Minhas Vendas</router-link>
				</li>
				<li>
					<button @click="logout">Deslogar</button>
				</li>
			</ul>
		</aside>
		<transition mode="out-in">
			<router-view></router-view>
		</transition>
	</section>
</template>

<script>
export default {
	name: 'Profile',
	methods: {
		logout() {
			this.$store.dispatch('logoutUser');
			this.$router.push('/login');
		},
	},
};
</script>

<style scoped>
.user {
	display: grid;
	grid-template-columns: minmax(140px, 200px) 1fr;
	max-width: 1024px;
	margin: 40px auto;
	grid-gap: 30px;
	padding: 20px;
}

aside a,
aside button {
	padding: 10px;
	display: block;
	background-color: #F4F7FC;
	margin-bottom: 10px;
	border-radius: 4px;
}

aside a.router-link-exact-active,
aside a:hover,
aside button:hover {
	background-color: #87F;
	color: #FFF;
}

aside button {
	color: #345;
	border: none;
	width: 100%;
	font-size: 1rem;
	text-align: left;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	cursor: pointer;
}

@media screen and (max-width: 500px) {
	.user {
		grid-template-columns:  1fr;
		margin: 0 auto;
	}
}
</style>
