<template>
	<section class="products-container">
		<transition mode="out-in">
			<div class="products" v-if="products && products.length" key="products">
				<div class="product" v-for="product in products" :key="product.id">
					<router-link :to="{name: 'product', params: {slug: product.slug}}">
						<img
							v-if="product.images"
							:src="product.images[0].path"
						>
						<p class="product-price">{{product.price | formatedPrice}}</p>
						<h2 class="product-title">{{product.name}}</h2>
						<p>{{product.description}}</p>
					</router-link>
				</div>
				<ProductsPagination :productsTotal="productsTotal" :productsPerPage="productsPerPage"/>
			</div>
			<div v-else-if="products && products.total === 0" key="no-results">
				<p class="no-results">Busca sem resultados. Tente buscar outro termo.</p>
			</div>
			<PageLoading v-else key="loading"/>
		</transition>
	</section>
</template>

<script>
import ProductsPagination from '@/components/Products/ProductsPagination.vue';
import api from '@/services/api';
import { serialize } from '@/helpers/index';

export default {
	name: 'ProductsList',
	components: {
		ProductsPagination,
	},
	data() {
		return {
			products: {},
			productsPerPage: 9,
			productsTotal: 0,
		};
	},
	computed: {
		url() {
			const query = serialize(this.$route.query);
			return `/products?_limit=${this.productsPerPage}${query}`;
		},
	},
	watch: {
		url() {
			this.getProducts();
		},
	},
	created() {
		this.getProducts();
	},
	methods: {
		getProducts() {
			this.products = null;
			api.get('/products')
				.then((response) => {
					this.productsTotal = response.data.total;
					this.products = response.data.products.data;
				});
		},
	},
};
</script>

<style scoped>
.products-container {
	max-width: 1000px;
	margin: 0 auto;
}

.products {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 30px;
	margin: 30px;
}

.product {
	box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
	padding: 10px;
	background: #FFF;
	border-radius: 4px;
	transition: all .2s;
}

.product:hover {
	box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
	transform: scale(1.1);
	position: relative;
	z-index: 1;
}

.product img {
	border-radius: 4px;
	margin-bottom: 20px;
}

.product-title {
	margin-bottom: 10px;
}

.product-price {
	color: #E80;
	font-weight: bold;
}

.no-results {
	text-align: center;
}
</style>
