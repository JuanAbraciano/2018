<template>
    <div>
        
    </div>
</template>

<script>
import apiService from '@/services/APIService'
import moment from 'moment'
import utils from '@/assets/utils'

export default {
    name: 'cup',
    data(){
        return {
            competitionId: 0,
            matches: [],
            groups: []
        }
    },
    computed:{
        getGroups(){
            return [...new Set(this.matches.map(match => match.group))]
        }
    },
    created(){
        this.competitionId = this.$route.params.id;
        const season = utils.cupInfo.find(comp => comp.id = this.competitionId).currentSeason;

        apiService.getMatchesByCompetitionAndSeason(this.competitionId, season)
        .then((response) => {
            this.matches = response;
        })
        .catch((err) => {
            alert(err);
        });
    }
}
</script>

