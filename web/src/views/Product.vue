<template>
	<section>
		<div v-if="product" class="product">
			<ul class="product-images" v-if="product.images">
				<li v-for="(image, index) in product.images" :key="index">
					<img :src="image.source" :alt="image.title">
				</li>
			</ul>
			<div class="product-info">
				<h1>{{product.name}}</h1>
				<p class="product-price">{{product.price | formatedPrice}}</p>
				<p class="product-description">{{product.description}}</p>
				<button class="btn" v-if="product.isSold === 'false'">Comprar</button>
				<button class="btn" v-else disabled>Comprar</button>
			</div>
		</div>
		<PageLoading v-else/>
	</section>
</template>

<script>
import api from '@/services/api';

export default {
	name: 'Product',
	props: ['id'],
	data() {
		return {
			product: Object,
		};
	},
	methods: {
		getProduct() {
			api.get(`/products/${this.id}`)
				.then((response) => {
					this.product = response.data;
				});
		},
	},
	created() {
		this.getProduct();
	},
};
</script>

<style scoped>
.product {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 30px;
	max-width: 900px;
	padding: 60px 20px;
	margin: 0 auto;
}

.product-price {
	color: #E80;
	font-weight: bold;
	font-size: 1.5rem;
	margin-bottom: 40px;
}

.product-description {
	font-size: 1.2rem;
}

.btn {
	margin-top: 60px;
	width: 200px;
}
</style>
