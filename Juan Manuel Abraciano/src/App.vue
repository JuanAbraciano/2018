<template>
  <div id="app">
    <top-menu></top-menu>
    <el-container id="container">
      <el-aside width="20%" ></el-aside>
      <div id="block"></div>
      <el-main style="background-color:white; margin-top:5px;">
        <router-view :key="$route.fullPath"/>
      </el-main>
      <el-aside width="20%" ></el-aside>
    </el-container>
  </div>
</template>

<script>
import topMenu from '@/components/top-menu.vue'
import apiService from '@/services/APIService'
import '@/assets/styles.css'
import '../theme/index.css'

export default {
  name: 'app',
  components: {
    topMenu
  },
  data(){
    return{
    }
  }
}
</script>
