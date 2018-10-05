<template>
  <div id="app">
    <carga @agregar="agregar"></carga>
    <filtro @filtrarPersonas="filtrarPersonas"></filtro>
    <p v-if="totalPersonas">Se muestran {{totalPersonasFiltradas}} personas (de un total de {{totalPersonas}})</p>
    <card-persona v-for="p in personasFiltradas" :persona="p" :key="p.id" @borrarPersona="borrarPersona"></card-persona>
  </div>
</template>

<script>
import carga from './components/carga.vue'
import cardPersona from './components/card-persona.vue'
import filtro from './components/filtro.vue'

export default {
  name: 'app',
  components: {
    carga,
    cardPersona,
    filtro
  },
  data(){
    return{
      idInicial: 0,
      personas: [],
      criteria: 'todos',
      totalPersonas: 0,
      totalPersonasFiltradas: 0
    }
  },
  computed: {
    personasFiltradas(){
      this.totalPersonas = this.personas.length;
      if(this.criteria == 'todos')
      {
        this.totalPersonasFiltradas = this.totalPersonas;
        return this.personas;
      }
      else{
        this.totalPersonasFiltradas = this.personas.filter(persona => persona.sexo == this.criteria).length;
        return this.personas.filter(persona => persona.sexo == this.criteria);
      }
    }
  },
  methods: {
    agregar(persona) {
        this.personas.push({
          id: this.idInicial++,
          nombre: persona.nombre,
          edad: persona.edad,
          sexo: persona.sexo
        });       
    },
    borrarPersona(id) {
        this.personas = this.personas.filter(persona => persona.id !== id);
    },
    filtrarPersonas(criteria){
      this.criteria = criteria
    }
  }

}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

  }
</style>
