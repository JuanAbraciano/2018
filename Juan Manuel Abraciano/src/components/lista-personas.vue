<template>
    <div id="listaPersonas">
        <section style="margin-bottom:20px">
            <input type="radio" v-model="filtro" value="todos"> Ver todos
            <input type="radio" v-model="filtro" value="f"> Ver mujeres
            <input type="radio" v-model="filtro" value="m"> Ver hombres		
        </section>
        
        <section>
            <p v-if="personas.length">Se muestran {{personasFiltradas.length}} personas (de un total de {{personas.length}})</p>
            <card-persona v-for="p in personasFiltradas" :persona="p" :key="p.id" @borrarPersona="borrarPersona"></card-persona>
        </section>
    </div>
</template>

<script>
import cardPersona from './card-persona.vue'

export default {
    name: 'listaPersonas',
    components:{
        cardPersona
    },
    props: ['personas'],
    data(){
        return{
            filtro: 'todos'
        }
    },
    computed: {
        personasFiltradas() {
            if(this.filtro == 'todos')
                return this.personas;
            else
                return this.personas.filter(persona => persona.sexo == this.filtro);
        },
        totalPersonas(){

        }
    },
    methods: {
        borrarPersona(id) {
            this.$emit('borrarPersona', id);
        }
    }
}
</script>
