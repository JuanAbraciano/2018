<template>
    <section style="display:inline-block; margin-bottom:20px; width: 300px">
        <section v-if="loading">Loading...</section>
        <section v-else>
            <div v-if="persona && persona.id > 0 && !mensajeEstado">
                <header>¿Está seguro de eliminar a esta persona?</header>
                <p style="font-weight:bold">{{persona.nombre}}, {{persona.sexo == "f" ? "Mujer" : "Hombre"}}. {{persona.edad}} años.</p>
                <div>
                    <el-button type="success" @click="eliminar" style="text-align:center">Sí</el-button>
                    <el-button type="danger" @click="volver" style="text-align:center">Cancelar</el-button>
                </div>
            </div>
            <div v-if="mensajeEstado">
                <el-alert title="La persona no pudo ser eliminada" type="error" :description="mensajeError" show-icon v-if="mensajeEstado == 'errorEliminando'"></el-alert>
                <el-alert title="Error al encontrar la persona!" type="error" :description="mensajeError" show-icon v-if="mensajeEstado == 'errorTrayendoPersona'"></el-alert>
                <el-alert title="La persona fue eliminada con éxito!" type="success" show-icon  v-if="mensajeEstado == 'ok'"></el-alert>            
                <el-button type="primary" @click="volver()" style="margin-top: 20px;">Volver</el-button>
            </div>
        </section>
    </section>
</template>

<script>
import PersonService from '@/services/personService'

export default {
    name: 'eliminarPersona',
    data(){
        return{
            persona: {
                nombre: "",
                edad: "",
                sexo: "f",
                id: -1
            },
            loading: false,
            mensajeEstado: "",
		    mensajeError: ""            
        }
    },
    created(){
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
    },
    methods:{
        eliminar(){
            this.loading = true;
            PersonService.eliminarPersona(this.persona.id)
                .then((mensajeOk) => {
                    this.persona = null;
                    this.mensajeEstado = "ok";

                    this.loading = false;
                })
                .catch((mensajeError) => {
                    this.mensajeEstado = "errorEliminando";
                    this.mensajeError = mensajeError;
                                
                    this.loading = false;
                })
        },
        volver(){
            this.$router.push({ name: "lista"});
        }
    }
}
</script>

