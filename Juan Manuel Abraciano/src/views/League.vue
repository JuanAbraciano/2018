<template>
    <section>
        <article>
            <span>{{competitionId}} - Fecha {{matchday || '-'}}</span>
            <league-matchdays-container :competitionId="competitionId" :matchdays="matchdays" @changeMatchday="changeMatchday"></league-matchdays-container>
        </article>
        <article v-if="!loading">
            <el-alert v-for="msg in errorList" :key="msg" title="Error:" type="error">
                {{msg}}
            </el-alert>

            <competition-matches-container :competitionId="competitionId" :matches="matches"></competition-matches-container>
        </article>
        <article v-else style="width:100%;text-align:center">
            <img src="../assets/images/loading.gif" alt="loading">
        </article>
    </section>
</template>

<script>
import competitionMatchesContainer from '@/components/competition-matches-container'
import leagueMatchdaysContainer from '@/components/leagues/league-matchdays-container'
import apiService from '@/services/APIService'
import moment from 'moment'
import utils from '@/assets/utils'

export default {
    name: 'league',
    components: {
        competitionMatchesContainer,
        leagueMatchdaysContainer
    },
    data(){
        return{
            competitionId: 0,
            matchday: 0,
            matchdays: 0,
            matches: [],
            loading: false,
            errorList: []
        }
    },
    methods: {
        changeMatchday(matchday){
            this.loading = true;
            if(matchday > 0){
                apiService.getMatchesByCompetitionAndMatchday(this.competitionId, matchday)
                .then((matches) => {
                    this.matchday = matchday;
                    this.matches = matches;
                    this.loading = false;
                })
                .catch(() => {
                    this.errorList.push("No se pudo obtener la información de los partidos para esta fecha.")
                    this.loading = false;
                })
            }
        }
    },
    created(){
        this.competitionId = this.$route.params.id;
        this.matchdays = utils.leagueMatchdays.find(comp => comp.id = this.competitionId).matchdays;
        const date = moment(new Date()).format("YYYY-MM-DD");
        this.loading = true;
        this.errorList = [];

        //Por defecto trae la fecha actual
        apiService.getMatchDayByCompetitionId(this.competitionId, date)
        .then((matchday) => {
            this.matchday = matchday;
            apiService.getMatchesByCompetitionAndMatchday(this.competitionId, this.matchday)
            .then((matches) => {
                this.matches = matches;
                this.loading = false;
            })
            .catch(() => {
                this.errorList.push("No se pudo obtener la información de los partidos para esta fecha.");
                this.loading = false;
            });
        })
        .catch(() => {
            this.errorList.push("No se pudo obtener la información de los partidos para esta fecha.");
            this.loading = false;
        });
    }
}
</script>

