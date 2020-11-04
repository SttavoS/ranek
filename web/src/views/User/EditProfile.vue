<template>
	<section>
		<h1>Editar Perfil</h1>
		<UserForm>
			<button @click.prevent="updateUser" class="btn">Salvar</button>
		</UserForm>
	</section>
</template>

<script>
import UserForm from '@/components/UserForm.vue';
import api from '@/services/api';

export default {
	name: 'EditProfile',
	components: {
		UserForm,
	},
	methods: {
		updateUser() {
			api.put(`/users/${this.$store.state.user.id}`, this.$store.state.user)
				.then(() => {
					this.$store.dispatch('getUser');
					this.$router.push({ name: 'user.edit' });
				})
				.catch((error) => {
					console.log(error.response);
				});
		},
	},
};
</script>

<style>

</style>
