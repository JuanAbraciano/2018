<template>
	<section style="margin-bottom:10px">
		<input type="text" v-model="persona.nombre" placeholder="Nombre">
		<input type="number" min="0" max="100" v-model="persona.edad" placeholder="Edad">
		<input type="radio" v-model="persona.sexo" value="f">Mujer
		<input type="radio" v-model="persona.sexo" value="m">Hombre

		<button @click="submitPersona()">Agregar</button>
	</section>
</template>

<script>
	export default {
	    name: 'carga',
	    data() {
	        return {
	            persona: {
			        nombre: "",
			        edad: "",
			        sexo: "f"
		      	},
	        }
	    },
	    methods: {
	        submitPersona() {
				if(this.persona.nombre != null && this.persona.nombre.length > 0 && this.persona.edad != null && this.persona.edad.length > 0) 
				{
				 	this.$emit('agregar', this.persona);
					this.persona.nombre = "";
					this.persona.edad = "";
				} else {
					alert('Debe ingresar todos los campos');
				}					
			},
	    }
	}
</script>

