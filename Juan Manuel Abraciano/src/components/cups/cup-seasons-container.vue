<template>
    <div>
        <el-button type="text" v-for="season in seasons" :key="season.year"
         @click="changeSeason(season.year)" style="font-weight:bold;" 
         :class="season.year == currentSeason ? 'seasonActive' : ''">{{season.name}}</el-button>
    </div>
</template>

<script>
export default {
    name: 'cupSeasonsContainer',
    props: ['seasons','currentSeason'],
    methods:{
        changeSeason(year) {
            this.$emit('changeSeason', year)
        }
    }
}
</script>
