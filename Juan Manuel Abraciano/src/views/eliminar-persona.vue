<template>
    <section>
        <section v-if="loading">Loading...</section>
        <section v-else>
            <div v-if="persona">
                <header>¿Está seguro de eliminar a esta persona?</header>
                <p>{{persona.nombre}}, {{persona.sexo == "f" ? "Mujer" : "Hombre"}}. {{persona.edad}} años.</p>
                <div>
                    <a @click="eliminar" style="margin-right:20px">Sí</a>
                    <a @click="volver">Cancelar</a>
                </div>
            </div>

            <!-- Se muestra cuando la persona ya fue eliminada -->
            <div v-else>
                <a @click="volver">Volver</a>
            </div>
        </section>
    </section>
</template>

<script>
import PersonService from '@/services/personService'
import Router from 'vue-router'

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
            loading: false
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
                alert(mensajeError);
                this.loading = false;
            });
    },
    methods:{
        eliminar(){
            this.loading = true;
            PersonService.eliminarPersona(this.persona.id)
                .then((mensajeOk) => {
                    this.persona = null;
                    alert(mensajeOk);
                    this.loading = false;
                })
                .catch((mensajeError) => {
                    alert(mensajeError);
                    this.loading = false;
                })
        },
        volver(){
            this.$router.push({ name: "lista"});
        }
    }
}
</script>

