<template>
	<section>
		<div v-if="purchases">
			<h2>Compras</h2>
			<div
				class="products-wrapper"
				v-for="(purchase, index) in purchases"
				:key="index"
			>
				<ProductItem v-if="purchase.product" :product="purchase.product">
					<p class="seller">
						<span>Vendedor: </span>
						{{purchase.seller_id}}
					</p>
				</ProductItem>
			</div>
		</div>
	</section>
</template>

<script>
import ProductItem from '@/components/Products/ProductItem.vue';
import api from '@/services/api';
import { mapState } from 'vuex';

export default {
	name: 'UserPurchases',
	components: {
		ProductItem,
	},
	data() {
		return {
			purchases: null,
		};
	},
	computed: {
		...mapState(['user', 'login']),
	},
	methods: {
		getPurchases() {
			api.get(`/transaction?buyer_id=${this.user.id}`)
				.then((response) => {
					this.purchases = response.data;
				});
		},
	},
	watch: {
		login() {
			this.getPurchases();
		},
	},
	created() {
		if (this.login) {
			this.getPurchases();
		}
	},
};
</script>

<style scoped>
.product-wrapper {
	margin-bottom: 40px;
}

.seller span {
	color: #E80;
}

h2 {
	margin-bottom: 20px;
}
</style>
