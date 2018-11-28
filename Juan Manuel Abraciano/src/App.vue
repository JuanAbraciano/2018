<template>
  <div id="app">
    <header>
      <top-menu></top-menu>
    </header>
    <section>
      <el-container id="container">
        <el-aside></el-aside>
        <el-main style="background-color:white; margin-top:5px;">
          <router-view :key="$route.fullPath"/>
        </el-main>
        <el-aside></el-aside>
      </el-container>
    </section>
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
  }
}
</script>
