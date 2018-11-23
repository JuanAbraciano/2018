<template>
    <div>
        <cup-group-container v-for="group in getGroups()" :key="group" :group="group" :matches="getGroupMatches(group)" :standings="getGroupStandings(group)">a</cup-group-container>
    </div>
</template>

<script>
import apiService from '@/services/APIService'
import moment from 'moment'
import utils from '@/assets/utils'
import cupGroupContainer from '@/components/cups/cup-group-container'

export default {
    name: 'cup',
    components: {
        cupGroupContainer
    },
    data(){
        return {
            competitionId: 0,
            matches: [],
            groups: [],
            standings: []
        }
    },
    methods:{
        getGroups(){
            return [...new Set(this.matches.map(match => match.group))].filter(group => group != null && (group.substring(0,5) == "Group")).sort();
        },
        getGroupMatches(group){
            return this.matches.filter(match => match.group != null && (match.group == group));
        },
        getGroupStandings(group){
            return this.standings.find(standing => standing.stage == "GROUP_STAGE" && (standing.group.slice(-1) == group.slice(-1))).table;
        }
    },
    created(){
        this.competitionId = this.$route.params.id;
        const season = utils.cupInfo.find(comp => comp.id = this.competitionId).currentSeason;

        apiService.getMatchesByCompetitionAndSeason(this.competitionId, 2017)
        .then((response) => {
            this.matches = response;
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

