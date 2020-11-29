<template>
	<section>
		<h2>Adicionar Produto</h2>
		<AddProduct/>
		<h2>Seus Produtos</h2>
		<transition-group
			v-if="user_products"
			name="list"
			tag="ul"
			key="product_list"
		>
			<li v-for="product in user_products" :key="product.id">
				<ProductItem :product="product" >
					<p>{{product.description}}</p>
					<button
						@click="deleteProduct(product.id)"
						class="delete-product"
					>
						Deletar
					</button>
				</ProductItem>
			</li>
		</transition-group>
	</section>
</template>

<script>
    import AddProduct from '../../components/Products/AddProduct.vue';
    import ProductItem from '../../components/Products/ProductItem.vue';
    import { mapState, mapActions } from 'vuex';
    import api from '../../services/api';

    export default {
        name: 'UserProducts',
        components: {
            AddProduct,
            ProductItem,
        },
        computed: {
            ...mapState([
                'login',
                'user',
                'user_products',
            ]),
        },
        methods: {
            ...mapActions(['getUserProducts']),
            deleteProduct(id) {
                const confirm = window.confirm('Deseja realmente deletar esse produto?');
                if (confirm) {
                    api.delete(`/products/${id}`)
                        .then(() => {
                            this.getUserProducts();
                        })
                        .catch((error) => {
                            console.log(error.response);
                        });
                }
            },
        },
        watch: {
            login() {
                this.getUserProducts();
            },
        },
        created() {
            if (this.login) {
                this.getUserProducts();
            }
        },
    };
</script>

<style scoped>
h2 {
	margin-bottom: 20px;
}

.delete-product {
	position: absolute;
	top: 0;
	right: 0;
	background: url('../../assets/remove.svg') no-repeat center;
	widows: 24px;
	height: 24px;
	text-indent: -140px;
	overflow: hidden;
	cursor: pointer;
	border: none;
}

.list-enter,
.list-leave-to {
	opacity: 0;
	transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
	transition: all .3s;
}
</style>
