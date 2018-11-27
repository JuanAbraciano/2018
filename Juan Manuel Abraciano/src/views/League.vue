<template>
    <div>
        <header>            
            <div class="competition-name-big"> {{getCompetitionName(competitionId)}} - Fecha {{matchday || '-'}}</div>
        </header>
        <nav style="text-align:center; margin-top:10px;">
            <league-matchdays-container :competitionId="competitionId" :matchdays="matchdays" @changeMatchday="changeMatchday"></league-matchdays-container>            
        </nav>
        <section>
            <article v-if="!loading">
                <el-alert v-for="msg in errorList" :key="msg" title="Error:" type="error">
                    {{msg}}
                </el-alert>

                <competition-matches-container :competitionId="competitionId" :matches="matches"></competition-matches-container>
                <league-standings v-if="standings.length > 0" :standings="standings"></league-standings>
            </article>
            <article v-else style="width:100%;text-align:center">
                <img src="../assets/images/loading.gif" alt="loading">
            </article>
        </section>
    </div>
</template>

<script>
import competitionMatchesContainer from '@/components/competition-matches-container'
import leagueMatchdaysContainer from '@/components/leagues/league-matchdays-container'
import leagueStandings from '@/components/leagues/league-standings'
import apiService from '@/services/APIService'
import moment from 'moment'
import utils from '@/assets/utils'

export default {
    name: 'league',
    components: {
        leagueMatchdaysContainer,
        competitionMatchesContainer,
        leagueStandings
    },
    data(){
        return{
            competitionId: 0,
            matchday: 0,
            matchdays: 0,
            matches: [],
            standings: [],
            loading: false,
            errorList: []
        }
    },
    methods: {
        changeMatchday(matchday){
            this.loading = true;
            this.errorList = [];
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
        },
        getCompetitionName(competitionId){
            return utils.competitionNames.find(comp => comp.id == competitionId).name;
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

        apiService.getStandingsByCompetitionAndSeason(this.competitionId, 2018)
            .then((response) => {
                this.standings = response.data.standings[0].table;
            })
            .catch(() => {
                this.errorList.push("No se pudo obtener la información de las posiciones.");
            });
    }
}
</script>

