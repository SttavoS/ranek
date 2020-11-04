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
				<transition mode="out-in" v-if="product.isSold === 'false'">
					<button
						v-if="!toogleCheckoutForm"
						@click="toogleCheckoutForm = true"
						class="btn"
					>
						Comprar
					</button>
					<CheckOut v-else :product="product"/>
				</transition>
				<button class="btn" v-else disabled>Produto Vendido</button>
			</div>
		</div>
		<PageLoading v-else/>
	</section>
</template>

<script>
import api from '@/services/api';
import CheckOut from '@/components/CheckOut.vue';

export default {
	name: 'Product',
	props: ['id'],
	components: {
		CheckOut,
	},
	data() {
		return {
			product: Object,
			toogleCheckoutForm: false,
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
