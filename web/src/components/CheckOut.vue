<template>
	<section>
		<h2>Endereço de Envio</h2>
		<UserForm>
			<button @click.prevent="checkout" class="btn">Finalizar Compra</button>
		</UserForm>
	</section>
</template>

<script>
import UserForm from '@/components/UserForm.vue';
import api from '@/services/api';
import { mapState } from 'vuex';

export default {
	name: 'CheckOut',
	props: ['product'],
	components: {
		UserForm,
	},
	computed: {
		...mapState(['user']),
		purchase() {
			return {
				buyer_id: this.user.email,
				seller_id: this.product.user_id,
				product: this.product,
				address: {
					cep: this.user.cep,
					street: this.user.street,
					number: this.user.number,
					neighborhood: this.user.neighborhood,
					city: this.user.city,
					state: this.user.state,
				},
			};
		},
	},
	methods: {
		createTransaction() {
			return api.post('/transaction', this.purchase)
				.then(() => {
					this.$router.push({ name: 'user.purchases' });
				});
		},
		async createUser() {
			try {
				await this.$store.dispatch('createUser', this.$store.state.user);
				await this.$store.dispatch('getUser', this.$store.state.user.email);
				await this.createTransaction();
			} catch (error) {
				console.error(error);
			}
		},
		checkout() {
			if (this.$store.state.login) {
				this.createTransaction();
			} else {
				this.createUser();
			}
		},
	},
};
</script>

<style scoped>
h2 {
	margin-top: 40px;
	margin-bottom: 20px;
}

.btn {
	background-color: #E80;
}
</style>
