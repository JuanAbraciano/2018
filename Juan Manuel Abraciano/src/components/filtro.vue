<template>
	<section style="margin-bottom:20px">
		<input type="radio" v-model="criteria" @change="filtrar" value="todos"> Ver todos
		<input type="radio" v-model="criteria" @change="filtrar" value="f"> Ver mujeres
		<input type="radio" v-model="criteria" @change="filtrar" value="m"> Ver hombres		
	</section>
</template>

<script>
	export default{
		name: 'filtro',
		data() {
			return{
				criteria: 'todos' 
			}
		},
		methods: {
			filtrar(){
				this.$emit('filtrarPersonas', this.criteria);
			}
		}
	}
</script>