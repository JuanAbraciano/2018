<template>
	<section style="display:inline-block; margin-bottom:20px;">
		<article style="text-align:left; margin-bottom:10px;">

			<p>Ingrese una persona</p>

			<div >
				<input class="input-textbox" type="text" v-model="persona.nombre" @change="validarNombre" placeholder="Nombre">
				<p class="lbl-error" v-if="errores.errorNombre">{{errores.errorNombre}}</p>
			</div>
			<div >
				<input class="input-textbox" type="number" min="0" max="100" v-model="persona.edad"  @change="validarEdad"  placeholder="Edad">
				<p class="lbl-error" v-if="errores.errorEdad">{{errores.errorEdad}}</p>
			</div>
			<div>
				<input type="radio" v-model="persona.sexo" value="f">Mujer
				<input type="radio" v-model="persona.sexo" value="m">Hombre
			</div>
		</article>

		<button @click="submitPersona()">Agregar</button>
	</section>
</template>

<script>
	import PersonService from '@/services/personService'
	export default {
	    name: 'crearPersona',
	    data() {
	        return {
	            persona: {
			        nombre: "",
			        edad: "",
			        sexo: "f"
		      	},
		      	errores:{
		      		errorNombre: "",
		      		errorEdad: ""
		      	}
	        }
	    },
	    methods: {
	        submitPersona() {
				this.validarNombre(this.persona.nombre);
				this.validarEdad(this.persona.edad);
				if(!this.errores.errorNombre && !this.errores.errorEdad) 
				{
				 	PersonService.guardar(this.persona.nombre, this.persona.edad, this.persona.sexo);
					this.persona.nombre = "";
					this.persona.edad = "";
				} 				
			},
			validarNombre(){
				if(this.persona.nombre == undefined || this.persona.nombre.length == 0)
					this.errores["errorNombre"] = "Debe llenar este campo"
				else
					this.errores["errorNombre"] = ""
			},
			validarEdad(){
				if(this.persona.edad == null || this.persona.edad == 0)
					this.errores["errorEdad"] = "Debe llenar este campo"
				else if(this.persona.edad < 0 || this.persona.edad > 200)
					this.errores["errorEdad"] = "Debe ingresar una edad valida"
				else
					this.errores["errorEdad"] = ""
			}
	    }
	}
</script>

<style>
	.lbl-error{
		display:inline;
		color:red;
		font-size:12px;
	}
	.input-textbox{
		margin-right:10px;
	}
</style>

