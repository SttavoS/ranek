<template>
	<section class="login">
		<h1>Login</h1>
		<form>
			<label for="email">E-mail</label>
			<input
				type="email"
				name="email"
				id="email"
				v-model="login.email"
			>
			<label for="password">Senha</label>
			<input
				type="password"
				name="password"
				id="password"
				v-model="login.password"
			>
			<button
				type="submit"
				class="btn"
				@click.prevent="authenticate"
			>
				Logar
			</button>
			<ErrorMessage :errors="errors" />
		</form>
		<p class="forgot-password">
			<a href="/" target="_blank">Perdeu a senha? Clique aqui.</a>
		</p>
		<CreateAccount />
	</section>
</template>

<script>
import CreateAccount from '@/components/Auth/CreateAccount.vue';
import ErrorMessage from '@/components/ErrorMessage';

export default {
	name: 'Login',
	components: {
		CreateAccount,
		ErrorMessage
	},
	data() {
		return {
			login: {
				email: '',
				password: '',
			},
			errors: []
		};
	},
	methods: {
		async authenticate() {
			this.errors = [];
			await this.$store.dispatch('authenticateUser', this.login)
				.then(() => {
					this.$router.push({ name: 'user.edit' });
				})
				.catch((error) => {
					console.log(error);
					this.errors.push(error.response.data.message);
				});
		},
	},
	mounted() {
		document.title = 'Login';
	}
};
</script>

<style scoped>
.login {
	max-width: 500px;
	margin: 0 auto;
	padding: 0 20px;
}

h1 {
	text-align: center;
	font-size: 2rem;
	margin-top: 40px;
	color: #87F;
}

form {
	display: grid;
}

.btn {
	width: 100%;
	max-width: 300px;
	margin-left: auto;
	margin-right: auto;
}

.forgot-password {
	text-align: center;
	margin: 20px auto 0 auto;
}

.forgot-password a:hover {
	color: #87F;
	text-decoration: underline;
}
</style>
