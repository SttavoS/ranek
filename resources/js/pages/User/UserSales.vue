<template>
	<section>
		<div v-if="sales">
			<h2>Vendas</h2>
			<div
				class="products-wrapper"
				v-for="(sale, index) in sales"
				:key="index"
			>
				<ProductItem v-if="sale.product" :product="sale.product">
					<p class="buyer">
						<span>Comprador: </span>
						{{sale.buyer_id}}
					</p>
				</ProductItem>
				<div class="delivery">
					<h3>Entrega:</h3>
					<ul v-if="sale.address">
						<li v-for="(value, key) in sale.address" :key="key">
							{{key}}: {{value}}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
    import ProductItem from '../../components/Products/ProductItem.vue';
    import api from '../../services/api';
    import { mapState } from 'vuex';

    export default {
        name: 'UserSales',
        components: {
            ProductItem,
        },
        data() {
            return {
                sales: null,
            };
        },
        computed: {
            ...mapState(['user', 'login']),
        },
        methods: {
            getSales() {
                api.get(`/transaction?seller_id=${this.user.id}`)
                    .then((response) => {
                        this.sales = response.data;
                    });
            },
        },
        watch: {
            login() {
                this.getSales();
            },
        },
        created() {
            if (this.login) {
                this.getSales();
            }
        },
    };
</script>

<style>
    .product-wrapper {
        margin-bottom: 40px;
    }

    .buyer span {
        color: #E80;
    }

    h2 {
        margin-bottom: 20px;
    }

    h3 {
        margin: 0;
        justify-self: end;
    }

    .delivery {
        display: grid;
        grid-template-columns: minmax(100px, 200px) 1fr;
        grid-gap: 20px;
    }

    @media screen and (max-width: 500px) {
        .delivery {
            grid-template-columns: 1fr;
            grid-gap: 10px;
        }
    }
</style>
