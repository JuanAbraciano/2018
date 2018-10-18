<template>
    <div id="lista">       
        <section style="margin-bottom:15px">
            <input type="radio" v-model="filtro" value="todos"> Ver todos
            <input type="radio" v-model="filtro" value="f"> Ver mujeres
            <input type="radio" v-model="filtro" value="m"> Ver hombres		
        </section>
        
        <section v-if="loading">Loading...</section>

        <section v-else>
            <p v-if="personas.length" class="description-link">Se muestran {{personasFiltradas.length}} personas (de un total de {{personas.length}})</p>
            <card-persona v-for="p in personasFiltradas" :persona="p" :key="p.id" @borrarPersona="borrarPersona"></card-persona>
        </section>
    </div>
</template>

<script>
import PersonService from '@/services/personService'
import cardPersona from '@/components/card-persona.vue'

export default {
    name: 'lista',
    components:{
        cardPersona
    },
    data(){
        return{
            personas: [],
            filtro: 'todos',
            loading: false
        }
    },
    created(){
        this.loading = true;
        PersonService.traerTodos()
            .then((personas) => {
                this.loading = false;
                this.personas = personas;
            })
            .catch((mensajeError) => {
                this.loading = false;
                alert(mensajeError);
            })
    },
    computed: {
        personasFiltradas() {
            if(this.filtro == 'todos')
                return this.personas;
            else
                return this.personas.filter(persona => persona.sexo == this.filtro);
        }
    },
    methods: {
        borrarPersona(id) {
            this.$emit('borrarPersona', id);
        }
    }
}
</script>
