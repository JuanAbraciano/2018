<template>
    <div>
        <el-button type="text" v-for="season in seasons" :key="season.year" @click="changeSeason(season.year)">{{season.name}}</el-button>
    </div>
</template>

<script>
export default {
    name: 'cupSeasonsContainer',
    props: ['seasons'],
    methods:{
        changeSeason(year) {
            this.$emit('changeSeason', year)
        }
    }
}
</script>
