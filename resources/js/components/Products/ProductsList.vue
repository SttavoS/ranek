<template>
	<section class="products-container">
		<transition mode="out-in">
			<div class="products" v-if="products && products.length > 0" key="products">
				<div class="product" v-for="product in products" :key="product.id">
					<router-link :to="{name: 'product', params: {slug: product.slug}}">
						<!-- <img
							v-if="product.images[0].image_path_url"
							:src="product.images[0].image_path_url"
						> -->
						<p class="product-price">{{product.price | formatedPrice}}</p>
						<h2 class="product-title">{{product.name}}</h2>
						<p>{{product.description}}</p>
					</router-link>
				</div>
			</div>
			<div v-else-if="products && products.total === 0" key="no-results">
				<p class="no-results">Busca sem resultados. Tente buscar outro termo.</p>
			</div>
			<PageLoading v-else key="loading"/>
		</transition>
        <div v-if="products" class="pagination-container">
		    <ProductsPagination :source="pagination" @navigate="navigate"/>
        </div>
	</section>
</template>

<script>
import ProductsPagination from './Pagination.vue';
import api from '../../services/api';
import { serialize } from '../../helpers/index';

export default {
	name: 'ProductsList',
	components: {
		ProductsPagination,
	},
	data() {
		return {
			products: {},
            pagination: {}
		};
	},
	computed: {
		url() {
			const query = serialize(this.$route.query);
			return `/products${query}`;
		},
	},
	watch: {
		url() {
			this.getProducts();
		},
	},
	methods: {
		getProducts(page) {
            this.products = null;
            const url = page ? `/products?page=${page}` : '/products';
			api.get(url)
				.then((response) => {
                    this.products = response.data.products.data;
                    this.pagination = response.data.products;
				});
        },
        navigate(page) {
            this.getProducts(page);
        }
    },
    created() {
		this.getProducts();
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

    .pagination-container {
        margin: 0 auto;
    }

    @media screen and (max-width: 500px) {
        .products {
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 10px;
            margin: 10px;
        }
    }
</style>
