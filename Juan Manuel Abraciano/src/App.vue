<template>
  <div id="app">
    <carga @agregar="agregar"></carga>
    <filtro @filtrarPersonas="filtrarPersonas"></filtro>
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
      criteria: 'todos'
    }
  },
  computed: {
    total() {
      return this.personas.length;
    },
    personasFiltradas(){
      if(this.criteria == 'todos')
        return this.personas;
      else
        return this.personas.filter(persona => persona.sexo == this.criteria);
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
