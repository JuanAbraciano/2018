<template>
  <div id="app">
    <top-menu></top-menu>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import topMenu from '@/components/top-menu.vue'
import apiService from '@/services/APIService'

export default {
  name: 'app',
  components: {
    topMenu
  },
  data(){
    return{
    }
  },
  created() {
    // apiService.getAllLeagues()
    //     .then((comp) => {
    //         this.list = comp;
    //     })
    //     .catch((err) => {
    //         alert(err);
    //     }); 

    //     apiService.getAllCups()
    //     .then((comp) => {
    //         this.list2 = comp;
    //     })
    //     .catch((err) => {
    //         alert(err);
    //     })
  }
}
</script>
