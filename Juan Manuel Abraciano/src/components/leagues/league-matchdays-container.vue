<template>
    <section>   
        <a href="#" v-for="matchDay in matchdays" :key="matchDay" @click="changeMatchday(matchDay)">{{matchDay}}</a>
    </section>
</template>

<script>
export default {
    name: 'leagueMatchdaysContainer',
    props: ['competitionId','matchdays'],
    methods:{
        changeMatchday(matchDay){
            this.$emit('changeMatchday', matchDay);
        }
    }
}
</script>
