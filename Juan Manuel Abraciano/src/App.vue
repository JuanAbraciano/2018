<template>
  <div id="app">
    <el-row>
      <el-col :span="4">
        <div class="margen">&nbsp;</div>
      </el-col>
      <el-col :span="4">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          style="height:100vh">
            <el-menu-item index="1" style="margin-top:60px">
              <i class=""></i>
              <router-link to="/"><span class="menu-item">Home</span></router-link>
            </el-menu-item>

            <el-menu-item index="1">
              <i class=""></i>
              <router-link to="/lista"><span class="menu-item">Personas</span></router-link>
            </el-menu-item>

            <el-menu-item index="1">
              <i class=""></i>
              <router-link :to="{ name: 'formPersona', params: { id: -1 }}"><span class="menu-item">Crear persona</span></router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="12" style="margin-bottom:25px; margin-top: 60px;">
          <router-view/>
        </el-col>
        <el-col :span="4">
          <div class="margen">&nbsp;</div>
        </el-col>
    </el-row>
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
