<template>
	<transition>
		<ul v-if="errors.length > 0" class="error">
			<li v-for="(error, index) in errors" :key="index" v-html="error">

			</li>
		</ul>
	</transition>
</template>

<script>
	export default {
		name: 'ErrorMessage',
		props: {
			errors: Array
		}
	};
</script>

<style scoped>
	.error {
		margin: 20px auto;
	}

	.error li {
		color: #E80;
	}
</style>
