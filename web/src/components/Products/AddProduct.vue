<template>
	<form>
		<label for="name">Nome</label>
		<input
			type="text"
			name="name" id="name"
			v-model="product.name"
		>
		<label for="price">Preço</label>
		<input
			type="text"
			name="price" id="price"
			v-model="product.price"
		>
		<label for="images">Fotos</label>
		<input
			type="file"
			name="images" id="images"
			ref="images"
		>
		<label for="description">Descrição</label>
		<textarea
			name="description" id="description"
		>
		</textarea>
		<input
			type="button"
			class="btn"
			value="Adicionar"
			@click.prevent="addProduct"
		>
	</form>
</template>

<script>
import api from '@/services/api';

export default {
	name: 'AddProduct',
	data() {
		return {
			product: {
				name: '',
				price: '',
				isSold: 'false',
				description: '',
				user_id: '',
				images: null,
			},
			images: [],
		};
	},
	methods: {
		formatProduct() {
			this.product.user_id = this.$store.state.user.id;
		},
		addProduct() {
			this.formatProduct();
			api.post('/products', this.product)
				.then(() => {
					this.$store.dispatch('getUserProducts');
				});
		},
	},
};
</script>

<style scoped>
form {
	display: grid;
	grid-template-columns: 100px 1fr;
	align-items: center;
	margin-bottom: 60px;
}

.btn {
	grid-column: 2;
}

textarea {
	resize: vertical;
	min-height: 80px;
}
</style>
