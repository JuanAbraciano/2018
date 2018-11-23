<template>
    <div>
        <el-menu class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">
                <router-link :to="{ name: 'home'}"><span class="menu-item">Inicio</span></router-link>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">Ligas</template>
                <el-menu-item index="2-1">
                    <router-link :to="{ name: 'league', params: { id: 2013 }}"><span class="menu-item">Brasil</span></router-link>
                </el-menu-item>
                <el-menu-item index="2-2">
                    <router-link :to="{ name: 'league', params: { id: 2014 }}"><span class="menu-item">España</span></router-link>
                </el-menu-item>
                <el-menu-item index="2-3">
                    <router-link :to="{ name: 'league', params: { id: 2021 }}"><span class="menu-item">Inglaterra</span></router-link>
                </el-menu-item>
                <el-menu-item index="2-4">
                    <router-link :to="{ name: 'league', params: { id: 2019 }}"><span class="menu-item">Italia</span></router-link>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">Copas</template>
                <el-menu-item index="3-1">
                    <router-link :to="{ name: 'cup', params: { id: 2001 }}"><span class="menu-item">Champions League</span></router-link>
                </el-menu-item>
                <el-menu-item index="3-3">
                    <router-link :to="{ name: 'cup', params: { id: 2000 }}"><span class="menu-item">Mundial 2018</span></router-link>
                </el-menu-item>
            </el-submenu>
            <el-menu-item index="4">
                <router-link :to="{ name: 'calendario'}"><span class="menu-item">Calendario</span></router-link>
            </el-menu-item>
            <el-menu-item index="5" style="float:right">
                <router-link :to="{ name: 'login'}"><span class="menu-item">Log in</span></router-link>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'topMenu',
    data(){
        return{}
    }
}
</script>

