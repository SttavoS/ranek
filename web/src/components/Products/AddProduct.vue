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
			type="file" multiple
			name="images[]" id="images"
			ref="images"
		>
		<label for="description">Descrição</label>
		<textarea
			name="description" id="description"
			v-model="product.description"
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
				description: '',
				images: null,
			},
			images: [],
		};
	},
	methods: {
		addProduct(event) {
			const data = new FormData();
			data.append('name', this.product.name);
			data.append('price', this.product.price);
			data.append('description', this.product.description);

			const files = this.$refs.images.files;
			files.forEach((image) => {
				data.append('images[]', image);
			});

			const button = event.currentTarget;
			button.value = 'Adcionando...';
			button.setAttribute('disabled', '');

			api.post('/product', data)
				.then(() => {
					this.$store.dispatch('getUserProducts');
				});

			button.removeAttribute('disabled');
			button.value = 'Adicionar';
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
