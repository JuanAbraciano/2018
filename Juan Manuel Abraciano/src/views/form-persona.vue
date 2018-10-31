<template>
	<section style="display:inline-block; margin-bottom:20px; width: 500px">
		<section v-if="loading">Loading...</section>

		<section v-else style="text-align:left; margin-bottom:10px;">
			<el-alert title="La persona fue guardada con éxito!" type="success" show-icon v-if="mensajeEstado == 'ok'"></el-alert>
			<el-alert title="La persona no pudo ser guardada" type="error" :description="mensajeError" show-icon v-if="mensajeEstado == 'error'"></el-alert>
			<el-alert title="Error al encontrar la persona!" type="error" :description="mensajeError" show-icon v-if="mensajeEstado == 'errorTrayendoPersona'"></el-alert>

			<el-form v-if="mensajeEstado === ''" :model="persona" :rules="rules" ref="persona" label-width="150px" class="demo-ruleForm">
				<el-form-item label="Nombre" prop="nombre">
					<el-input v-model="persona.nombre"></el-input>
				</el-form-item>

				<el-form-item label="Edad" prop="edad">
					<el-input type="number" v-model="persona.edad"></el-input>
				</el-form-item>

				<el-form-item label="Sexo" prop="sexo">
					 <el-radio-group v-model="persona.sexo">
						<el-radio label="f">Mujer</el-radio>
						<el-radio label="m">Varón</el-radio>
					 </el-radio-group>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="submitPersona('persona')" style="float:right">Guardar</el-button>
				</el-form-item>
			</el-form>

			<div v-else style="margin-top: 20px; text-align: center;">
				<el-button type="primary" @click="volver()">Volver</el-button>
				<el-button v-if="!modoEdicion" type="primary" @click="mensajeEstado=''">Crear otra persona</el-button>
			</div>
		</section>
	</section>
</template>

<script>
	import PersonService from '@/services/personService'

	export default {
		name: 'formPersona',
	    data() {
			var validarEdad = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('Debe llenar este campo'));
				}
				if (value <= 0 || value > 200) {
					callback(new Error('Debe ingresar una edad valida'));
				} else {
					callback();
				}
			};
	        return {
	            persona: {
					nombre: "",
					edad: "",
					sexo: "f",
					id: -1
				},
				rules:{
					nombre:[
						{ required: true, message: 'Debe llenar este campo', trigger: 'blur' },
					],
					edad:[
						{ required: true, validator: validarEdad, trigger: 'blur' }					
					]
				},
				modoEdicion: false, 
				loading: false,
				mensajeEstado: "",
				mensajeError: ""
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
						this.mensajeEstado = "errorTrayendoPersona";
						this.mensajeError = mensajeError;

						this.loading = false;
					});
			}
		},
	    methods: {
			submitPersona(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.loading = true;
						if(!this.modoEdicion){
							PersonService.crearPersona(this.persona.nombre, this.persona.edad, this.persona.sexo)
								.then((mensajeOk) => {
									this.mensajeEstado = "ok";

									this.loading = false;
									this.persona.nombre = "";
									this.persona.edad = "";	
									this.persona.sexo = "f";
								})
								.catch((mensajeError) => {
									this.mensajeEstado = "error";
									this.mensajeError = mensajeError;
									this.persona.nombre = "";
									this.persona.edad = "";	
									this.persona.sexo = "f";

									this.loading = false;
								});					
						} else{
							PersonService.modificarPersona(this.persona.nombre, this.persona.edad, this.persona.sexo, this.persona.id)
								.then((mensajeOk) => {
									this.mensajeEstado = "ok";

									this.loading = false;							
								})
								.catch((mensajeError) => {
									this.mensajeEstado = "error";
									this.mensajeError = mensajeError;
									
									this.loading = false;
								});	
						}
					} 
				});
			},
			volver(){
            	this.$router.push({ name: "lista"});
        	}
	    }
	}
</script>
