<template>
	<section>
		<h2>Crie a sua Conta</h2>
		<transition mode="out-in">
			<button
				v-if="!toogleCreateForm"
				@click="toogleCreateForm = true"
				class="btn"
			>
				Criar Conta
			</button>
			<UserForm v-else>
				<button class="btn btn-form" @click.prevent="createUser">Criar Usuário</button>
			</UserForm>
		</transition>
	</section>
</template>

<script>
	import UserForm from '@/components/UserForm.vue';

	export default {
		name: 'CreateAccount',
		components: {
			UserForm,
		},
		data() {
			return {
				toogleCreateForm: false,
			};
		},
		methods: {
			async createUser() {
				try {
					await this.$store.dispatch('createUser', this.$store.state.user);
					await this.$store.dispatch('authenticateUser', );
					// await this.$store.dispatch('getUser', this.$store.state.user.email);
					this.$router.push({ name: 'user' });
				} catch (error) {
					console.error(error);
				}
			},
		},
	};
</script>

<style scoped>
	h2 {
		text-align: center;
		margin: 40px 0 10px 0;
	}

	.btn {
		width: 100%;
		max-width: 300px;
		margin: 0 auto;
	}

	.btn-form {
		max-width: 100%;
	}
</style>
