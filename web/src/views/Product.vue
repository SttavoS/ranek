<template>
	<section>
		<div v-if="product" class="product">
			<ul class="product-images" v-if="product.images.length > 0">
				<li v-for="image in product.images" :key="image.id">
					<img :src="image.path">
				</li>
			</ul>
			<div class="product-info">
				<h1>{{product.name}}</h1>
				<p class="product-price">{{product.price | formatedPrice}}</p>
				<p class="product-description">{{product.description}}</p>
				<transition mode="out-in" v-if="product.sold === 0">
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
	props: {
		slug: {
			type: String,
			required: true,
		},
	},
	components: {
		CheckOut,
	},
	data() {
		return {
			product: {},
			toogleCheckoutForm: false,
		};
	},
	methods: {
		getProduct() {
			api.get(`/product/${this.slug}`)
				.then((response) => {
					this.product = response.data.product;
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
