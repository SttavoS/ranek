<template>
	<section>
		<h1>Página não encontrada!</h1>

		<router-link :to="{ name: 'home' }" class="btn">
			Volte para o ínicio
		</router-link>
	</section>
</template>

<script>
export default {
	name: 'PageNotFount'
};
</script>

<style scoped>
	section {
		display: grid;
		justify-content: center;
		margin-top: 100px;
	}

	h1 {
		margin-bottom: 20px;
	}

	.btn {
		display: block;
	}
</style>
