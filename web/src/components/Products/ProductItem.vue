<template>
	<div class="product" v-if="product">
		<router-link
			:to="{ name: 'product', params: {slug: product.slug} }"
		>
			<img
				class="product-image"
				v-if="product.images"
				:src="product.images[0].path"
			>
			<p>Ver Produto</p>
		</router-link>
		<div class="info">
			<p class="price">{{product.price | formatedPrice}}</p>
			<h2 class="title">{{product.name}}</h2>
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProductItem',
	props: {
		product: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style scoped>
.product {
	display: grid;
	grid-template-columns: minmax(100px, 200px) 1fr;
	grid-gap: 20px;
	margin-bottom: 40px;
	position: relative;
}

.info {
	align-self: end;
}

.product-image {
	border-radius: 4px;
	overflow: hidden;
	height: 100px;
}
</style>
