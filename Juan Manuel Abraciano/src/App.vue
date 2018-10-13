<template>
  <div id="app">
    <div id="nav">
      <router-link to="/lista">Home</router-link> |
      <router-link to="/crear-persona">Crear persona</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{}
  }
  // computed: {
  //   personasFiltradas(){
  //     this.totalPersonas = this.personas.length;
  //     if(this.criteria == 'todos')
  //     {
  //       this.totalPersonasFiltradas = this.totalPersonas;
  //       return this.personas;
  //     }
  //     else{
  //       this.totalPersonasFiltradas = this.personas.filter(persona => persona.sexo == this.criteria).length;
  //       return this.personas.filter(persona => persona.sexo == this.criteria);
  //     }
  //   }
  // },
  // methods: {
  //   agregar(persona) {
  //       this.personas.push({
  //         id: this.idInicial++,
  //         nombre: persona.nombre,
  //         edad: persona.edad,
  //         sexo: persona.sexo
  //       });       
  //   },
  //   borrarPersona(id) {
  //       this.personas = this.personas.filter(persona => persona.id !== id);
  //   },
  //   filtrarPersonas(criteria){
  //     this.criteria = criteria
  //   }
  // }
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
