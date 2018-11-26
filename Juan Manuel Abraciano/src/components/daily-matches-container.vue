<template>
    <section>
        <br>
        <span>{{ formatedDate }}</span>
        <competition-matches-container v-for="c in getCompetitions()" :competitionId="c" :displayCompetitionName="getCompetitions().length > 1" :matches="getCompetitionMatches(c)" :key="c"></competition-matches-container>
        <span v-if="noMatchesToday">Sin partidos</span>
    </section>
</template>

<script>
import competitionMatchesContainer from '@/components/competition-matches-container'
import apiService from '@/services/APIService'
import moment from 'moment'

export default {
    name: 'dailyMatchesContainer',
    props:['date'],
    components: {
        competitionMatchesContainer
    },
    data() {
        return {
            formatedDate: null,
            matches: [],
            noMatchesToday: false
        }
    },
    methods: {
        getCompetitions(){
            return  [...new Set(this.matches.map(match => match.competition.id))]
        },

        //Partidos para cada competencia
        getCompetitionMatches(competitionId){
            return this.matches.filter(match => match.competition.id == competitionId);
        }
    },
    created(){
        moment.locale('es');
        this.formatedDate = moment(this.date).format('dddd DD [de] MMMM');

        apiService.getMatchesByDay(this.date)
        .then((comp) => {
            if(comp.length > 0)
                this.matches = comp;            
            else
                this.noMatchesToday = true;
        })
        .catch((err) => {
            alert(err);
        });
    }
}
</script>

