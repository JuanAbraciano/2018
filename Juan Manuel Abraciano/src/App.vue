<template>
  <div id="app">
    <div id="nav" style="margin-bottom:25px">
      <router-link to="/">Home</router-link> |
      <router-link to="/lista">Personas</router-link> |
      <router-link :to="{ name: 'formPersona', params: { id: -1 }}">Crear persona</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import '@/assets/styles.css'
export default {
  name: 'app',
  data(){
    return{}
  }
}
</script>
