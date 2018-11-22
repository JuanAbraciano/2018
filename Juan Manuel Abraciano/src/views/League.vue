<template>
    <div>
        {{competitionId}} - Fecha {{matchday || '-'}}
        <league-matchdays-container :competitionId="competitionId" :matchdays="matchdays" @changeMatchday="changeMatchday"></league-matchdays-container>
        <league-matches-container :id="competitionId" :matches="matches" :key="competitionId"></league-matches-container>
    </div>
</template>

<script>
import leagueMatchesContainer from '@/components/leagues/league-matches-container'
import leagueMatchdaysContainer from '@/components/leagues/league-matchdays-container'
import apiService from '@/services/APIService'
import moment from 'moment'
import utils from '@/assets/utils'

export default {
    name: 'league',
    components: {
        leagueMatchesContainer,
        leagueMatchdaysContainer
    },
    data(){
        return{
            competitionId: 0,
            matchday: 0,
            matchdays: 0,
            matches: []
        }
    },
    methods: {
        changeMatchday(matchday){
            if(matchday > 0){
                apiService.getMatchesByCompetitionAndMatchday(this.competitionId, matchday)
                .then((matches) => {
                    this.matchday = matchday;
                    this.matches = matches;
                })
                .catch((err) => {
                    alert(err);
                })
            }
        }
    },
    created(){
        this.competitionId = this.$route.params.id;
        this.matchdays = utils.leagueMatchdays.find(comp => comp.id = this.competitionId).matchdays;
        const date = moment(new Date()).format("YYYY-MM-DD");

        //Por defecto trae la fecha actual
        apiService.getMatchDayByCompetitionId(this.competitionId, date)
        .then((matchday) => {
            this.matchday = matchday;
            apiService.getMatchesByCompetitionAndMatchday(this.competitionId, this.matchday)
            .then((matches) => {
                this.matches = matches;
            })
        })
        .catch((err) => {
            alert(err);
        });
    },
    mounted(){
        
    }
}
</script>

