<template>
	<section style="display:inline-block; margin-bottom:20px;">
		<section v-if="loading">Loading...</section>

		<section v-else style="text-align:left; margin-bottom:10px;">
			<mensaje-estado v-if="paramsMensajeEstado.active" :paramsMensajeEstado="paramsMensajeEstado"></mensaje-estado>

			<div v-else>
				<p class="description-link">Ingrese los datos de la persona a {{modoEdicion ? "editar" : "crear"}}</p>

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
				
				<a @click="submitPersona()" class="control-link" style="display:inline-block; margin-top:20px">Guardar</a>
			</div>
		</section>
	</section>
</template>

<script>
	import PersonService from '@/services/personService'
	import mensajeEstado from '@/components/mensaje-estado.vue'

	export default {
		name: 'formPersona',
		components:{
			mensajeEstado
		},
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
				},
				paramsMensajeEstado:{
					active: false,
					estado: "",
					msj: "",
					backTo: ""
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
						this.paramsMensajeEstado.active = true;
						this.paramsMensajeEstado.estado = "error";
						this.paramsMensajeEstado.msj = mensajeError;
						this.paramsMensajeEstado.backTo = "lista";

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
								this.paramsMensajeEstado.active = true;
								this.paramsMensajeEstado.estado = "ok";
								this.paramsMensajeEstado.msj = mensajeOk;
								this.paramsMensajeEstado.backTo = "lista";

								this.loading = false;
								this.persona.nombre = "";
								this.persona.edad = "";	
							})
							.catch((mensajeError) => {
								this.paramsMensajeEstado.active = true;
								this.paramsMensajeEstado.estado = "error";
								this.paramsMensajeEstado.msj = mensajeError;
								this.paramsMensajeEstado.backTo = "lista";

								this.loading = false;
							});					
					} else{
						PersonService.modificarPersona(this.persona.nombre, this.persona.edad, this.persona.sexo, this.persona.id)
							.then((mensajeOk) => {
								this.paramsMensajeEstado.active = true;
								this.paramsMensajeEstado.estado = "ok";
								this.paramsMensajeEstado.msj = mensajeOk;
								this.paramsMensajeEstado.backTo = "lista";

								this.loading = false;							
							})
							.catch((mensajeError) => {
								this.paramsMensajeEstado.active = true;
								this.paramsMensajeEstado.estado = "error";
								this.paramsMensajeEstado.msj = mensajeError;
								this.paramsMensajeEstado.backTo = "lista";
								
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
</style>

