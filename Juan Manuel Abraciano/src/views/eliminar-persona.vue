<template>
    <section>
        <section v-if="loading">Loading...</section>
        <section v-else>
            <div v-if="persona && !paramsMensajeEstado.active">
                <header>¿Está seguro de eliminar a esta persona?</header>
                <p style="font-weight:bold">{{persona.nombre}}, {{persona.sexo == "f" ? "Mujer" : "Hombre"}}. {{persona.edad}} años.</p>
                <div>
                    <a @click="eliminar" style="margin-right:20px" class="control-link">Sí</a>
                    <a @click="volver" class="control-link">Cancelar</a>
                </div>
            </div>

            <!-- Se muestra cuando la persona ya fue eliminada -->
            <div v-else>
                <mensaje-estado v-if="paramsMensajeEstado.active" :paramsMensajeEstado="paramsMensajeEstado"></mensaje-estado>
            </div>
        </section>
    </section>
</template>

<script>
import PersonService from '@/services/personService'
import mensajeEstado from '@/components/mensaje-estado.vue'

export default {
    name: 'eliminarPersona',
    components:{
        mensajeEstado
    },
    data(){
        return{
            persona: {
                nombre: "",
                edad: "",
                sexo: "f",
                id: -1
            },
            loading: false,
            paramsMensajeEstado:{
                active: false,
                estado: "",
                msj: "",
                backTo: ""
            } 
            
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
                this.paramsMensajeEstado.active = true;
                this.paramsMensajeEstado.estado = "error";
                this.paramsMensajeEstado.msj = mensajeError;
                this.paramsMensajeEstado.backTo = "lista";

                this.loading = false;
            });
    },
    methods:{
        eliminar(){
            this.loading = true;
            PersonService.eliminarPersona(this.persona.id)
                .then((mensajeOk) => {
                    this.persona = null;

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
                })
        },
        volver(){
            this.$router.push({ name: "lista"});
        }
    }
}
</script>

