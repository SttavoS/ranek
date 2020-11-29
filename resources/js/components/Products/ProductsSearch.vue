<template>
	<form>
		<input type="text" name="search" id="search" v-model="search" placeholder="Buscar...">
		<input type="submit" id="magnifier" value="Buscar" @click.prevent="findProducts">
	</form>
</template>

<script>
export default {
	data() {
		return {
			search: '',
		};
	},
	methods: {
		findProducts() {
			this.$router.push({ query: { q: this.search } });
		},
	},
};
</script>

<style scoped>
form {
	max-width: 600px;
	margin: 30px auto 60px auto;
	position: relative;
	padding: 0 10px;
}

#search {
	width: 100%;;
	padding: 20px;
	border: none;
}

#search:focus, #search:hover {
	transform: scale(1.1);
}

#magnifier {
	position: absolute;
	top: 0;
	right: -40px;
	width: 62px;
	height:62px;
	background: url('../../assets/search.svg') no-repeat center;
	text-indent: -150px;
	border: none;
	box-shadow: none;
	cursor: pointer;
}
</style>
