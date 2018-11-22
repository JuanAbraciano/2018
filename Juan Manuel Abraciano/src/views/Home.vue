<template>
    <div id="home">
        <span>Partidos de hoy</span>
        <matches-container v-for="c in getCompetitions" :id="c" :matches="matches" :key="c">{{c}}</matches-container>
    </div>
</template>

<script>    
import matchesContainer from '@/components/matches-container'
import apiService from '@/services/APIService'
import moment from 'moment'

export default {
    name: 'home',
    components: {
        matchesContainer
    },
    data(){
        return{
            matches:[]
        }
    },
    computed: {
        getCompetitions(){
            return  [...new Set(this.matches.map(match => match.competition.id))]
        }
    },
    mounted(){
        //Traigo los partidos de hoy
        const date = moment(new Date()).format("YYYY-MM-DD");

        apiService.getMatchesByDay(date)
        .then((comp) => {
            this.matches = comp;
        })
        .catch((err) => {
            alert(err);
        });
    }
}
</script>
