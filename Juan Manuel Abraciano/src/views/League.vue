<template>
    <div>
        {{competitionId}} - Fecha {{matchday || '-'}}
        <matches-container :id="competitionId" :matches="matches" :key="competitionId"></matches-container>
    </div>
</template>

<script>
import matchesContainer from '@/components/matches-container'
import apiService from '@/services/APIService'
import moment from 'moment'
import utils from '@/assets/utils'

export default {
    name: 'league',
    components: {
        matchesContainer
    },
    data(){
        return{
            competitionId: 0,
            matchday: 0,
            matches: [],
            matchdays: 0
        }
    },
    computed: {

    },
    created(){
        this.competitionId = this.$route.params.id;
        this.matchdays = utils.competitionMatchdays.find(comp => comp.id = this.competitionId).matchdays;
    },
    mounted(){
        const date = moment(new Date()).format("YYYY-MM-DD");

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
    }
}
</script>

