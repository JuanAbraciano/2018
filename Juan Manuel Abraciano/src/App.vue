<template>
  <div id="app">
    <carga @agregar="agregar"></carga>
    <lista-personas :personas="personas" @borrarPersona="borrarPersona"></lista-personas>
  </div>
</template>

<script>
import carga from './components/carga.vue'
import listaPersonas from './components/lista-personas.vue'

export default {
  name: 'app',
  components: {
    carga,
    listaPersonas
  },
  data(){
    return{
      idInicial: 0,
      personas: []
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
