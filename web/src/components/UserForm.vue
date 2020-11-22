<template>
	<form>
		<div v-if="showBasicUserData" class="user">
			<label for="name">Nome</label>
			<input
				type="text"
				id="name"
				name="name"
				v-model="name"
			>
			<label for="email">E-mail</label>
			<input
				type="email"
				id="email"
				name="email"
				v-model="email"
			>
			<label for="password">Senha</label>
			<input
				type="password"
				id="password"
				name="password"
				v-model="password"
			>
		</div>
		<label for="cep">Cep</label>
		<input
			type="text"
			id="cep"
			name="cep"
			v-model="cep"
			@keyup="setCep"
		>
		<label for="street">Rua</label>
		<input
			type="text"
			id="street"
			name="street"
			v-model="street"
		>
		<label for="number">Número</label>
		<input
			type="text"
			id="number"
			name="number"
			v-model="number"
		>
		<label for="neighborhood">Bairro</label>
		<input
			type="text"
			id="neighborhood"
			name="neighborhood"
			v-model="neighborhood"
		>
		<label for="city">Cidade</label>
		<input
			type="text"
			id="city"
			name="city"
			v-model="city"
		>
		<label for="state">Estado</label>
		<input
			type="text"
			id="state"
			name="state"
			v-model="state"
		>

		<div class="button">
			<slot></slot>
		</div>
	</form>
</template>

<script>
import { mapFields } from '@/helpers/index';
import getCep from '@/services/cep';

export default {
	name: 'UserForm',
	computed: {
		...mapFields({
			fields: [
				'name',
				'email',
				'password',
				'cep',
				'street',
				'number',
				'neighborhood',
				'city',
				'state',
			],
			base: 'user',
			mutation: 'UPDATE_USER',
		}),
		showBasicUserData() {
			return !this.$store.state.login || this.$route.name === 'user.edit';
		},
	},
	methods: {
		setCep() {
			if (this.cep) {
				const cep = this.cep.replace(/\D/g, '');

				if (cep.length === 8) {
					getCep(cep)
						.then((response) => {
							this.street = response.data.logradouro;
							this.neighborhood = response.data.bairro;
							this.city = response.data.localidade;
							this.state = response.data.uf;
						});
				}
			}
		},
	},
};
</script>

<style scoped>
form,
.user {
	display: grid;
	grid-template-columns: 80px 1fr;
	align-items: center;
}

.user {
	grid-column: 1 / 3;
}

.button {
	grid-column: 2;
	margin-top: 10px;
}
</style>
