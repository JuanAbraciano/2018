<template>
    <div>
        <cup-finals-container v-for="stage in getFinalStages()" :key="stage" :stage="stage" :matches="getFinalMatches(stage)"></cup-finals-container>
        <cup-group-container v-for="group in getGroups()" :key="group" :group="group" :matches="getGroupMatches(group)" :standings="getGroupStandings(group)">a</cup-group-container>
    </div>
</template>

<script>
import apiService from '@/services/APIService'
import moment from 'moment'
import utils from '@/assets/utils'
import cupGroupContainer from '@/components/cups/cup-group-container'
import cupFinalsContainer from '@/components/cups/cup-finals-container'

export default {
    name: 'cup',
    components: {
        cupGroupContainer,
        cupFinalsContainer
    },
    data(){
        return {
            competitionId: 0,
            groupMatches: [],
            finalMatches: [],
            standings: []
        }
    },
    methods:{
        //Hace algo asi como un SELECT DISTINCT de los grupos, para listarlos
        getGroups(){
            return [...new Set(this.groupMatches.map(match => match.group))].filter(group => group != null && (group.substring(0,5) == "Group")).sort();
        },

        //Partidos y Posiciones para cada grupo
        getGroupMatches(group){
            return this.groupMatches.filter(match => match.group != null && (match.group == group));
        },
        getGroupStandings(group){
            return this.standings.find(standing => standing.stage == "GROUP_STAGE" && (standing.group.slice(-1) == group.slice(-1))).table;
        },

        //Idem getGroups()
        getFinalStages(){
            return [...new Set(this.finalMatches.map(match => match.stage))].reverse();
        },

        //Idem getGroupMatches()
        getFinalMatches(stage){
            return this.finalMatches.filter(match => match.stage != null && (match.stage == stage));
        },
    },
    created(){
        this.competitionId = this.$route.params.id;
        const season = utils.cupInfo.find(comp => comp.id = this.competitionId).currentSeason;

        apiService.getMatchesByCompetitionAndSeason(this.competitionId, 2017)
        .then((response) => {
            //Divido los partidos en dos arreglos para poder trabajar con menos datos despues
            this.groupMatches = response.filter(match => match.stage == "GROUP_STAGE");
            this.finalMatches = response.filter(match => utils.finalStages.includes(match.stage));
        })
        .catch((err) => {
            alert(err);
        });

        apiService.getStandingsByCompetitionAndSeason(this.competitionId, 2017)
        .then((response) => {
            this.standings = response.data.standings;
        })
        .catch((err) => {
            alert(err);
        });
    }
}
</script>

