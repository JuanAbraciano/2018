<template>
	<section style="display:inline-block; margin-bottom:20px;">
		<article v-if="loading">Loading...</article>
		<article v-else style="text-align:left; margin-bottom:10px;">
			<p>Ingrese los datos de la persona a {{modoEdicion ? "editar" : "crear"}}</p>

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
			
			<button @click="submitPersona()">Guardar</button>
		</article>
	</section>
</template>

<script>
	import PersonService from '@/services/personService'
	export default {
	    name: 'formPersona',
	    data() {
	        return {
	            persona: {
					nombre: "",
					edad: "",
					sexo: "f",
					id: -1
				},
				modoEdicion: false, 
				loading: false,
		      	errores:{
		      		errorNombre: "",
		      		errorEdad: ""
		      	}
	        }
		},
		created() {
			this.modoEdicion = this.$route.params.id > 0;
			//Si estamos editando traigo a la persona
			if(this.modoEdicion){
				this.loading = true;
				PersonService.traerUno(this.$route.params.id)
					.then((persona) => {
						this.persona = persona;
						this.loading = false;
					})
					.catch((mensajeError) => {
						alert(mensajeError);
						this.loading = false;
					});
			}
		},
	    methods: {
	        submitPersona() {
				this.validarNombre(this.persona.nombre);
				this.validarEdad(this.persona.edad);
				if(!this.errores.errorNombre && !this.errores.errorEdad) 
				{
					this.loading = true;
					if(!this.modoEdicion){
						PersonService.crearPersona(this.persona.nombre, this.persona.edad, this.persona.sexo)
							.then((mensajeOk) => {
								alert(mensajeOk);
								this.loading = false;
								this.persona.nombre = "";
								this.persona.edad = "";	
							})
							.catch((mensajeError) => {
								alert(mensajeError);
								this.loading = false;
							});					
					} else{
						PersonService.modificarPersona(this.persona.nombre, this.persona.edad, this.persona.sexo, this.persona.id)
							.then((mensajeOk) => {
								alert(mensajeOk);
								this.loading = false;							
							})
							.catch((mensajeError) => {
								alert(mensajeError);
								this.loading = false;
							});	
					}
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

