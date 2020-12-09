<template>
    <div id="app">
		<TheHeader />
		<main>
			<transition mode="out-in">
				<router-view/>
			</transition>
		</main>
		<TheFooter />
    </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

export default {
	name: 'App',
	components: {
		TheHeader,
		TheFooter,
	},
};
</script>

<style>
body, ul, li, h1, h2, p {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

ul {
	list-style: none;
}

body {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	color: #345;
	background: url('./assets/pattern.svg') repeat top;
}

a {
	color: #345;
	text-decoration: none;
}

img {
	max-width: 100%;
	display: block;
}

.btn {
	display: block;
	padding: 10px 30px;
	background-color: #87F;
	border-radius: 4px;
	color: #FFF;
	text-align: center;
	font-size: 1rem;
	box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
	transition: all 0.3s;
	border: none;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	cursor: pointer;
}

.btn:hover {
	background-color: #65D;
	transform: scale(1.1);
}

.btn-disabled,
.btn-disabled:hover {
	background-color: #BBC;
	transform: scale(1);
}

#app {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

main {
	flex: 1;
}

label {
	margin-bottom: 5px;
}

input,
textarea {
	border-radius: 4px;
	border: 1px solid white;
	padding: 15px;
	box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
	transition: all .3s;
	font-size: 1rem;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	margin-bottom: 15px;
	width: 100%;
}

input:hover,
input:focus,
textarea:hover
textarea:focus {
	outline: none;
	box-shadow: rgba(30, 60, 90, 0.2);
	border-color: #87F;
}

.v-enter,
.v-leave-to {
	opacity: 0;
}

.v-enter {
	transform: translate3d(0, -20px, 0);
}

.v-leave-to {
	transform: translate3d(0, 20px, 0);
}

.v-enter-active, .v-leave-active {
	transition: all .3s;
}
</style>
