<template>
    <div>
        <header>
            <div  class="competition-name-big">
                <span>{{getCompetitionName(competitionId)}} - Temporada {{season || '-'}}</span>
            </div>
            <cup-seasons-container v-if="seasons.length > 1" :seasons="seasons" @changeSeason="changeSeason"></cup-seasons-container>
        </header>
        <section>
            <article v-if="!loading">
                <article v-if="errorList.length > 0">
                    <el-alert v-for="msg in errorList" :key="msg" title="Error:" type="error">
                        {{msg}}
                    </el-alert>
                </article>

                <article v-else>
                    <cup-finals-container v-for="stage in getFinalStages()" :key="stage" :stage="getStageName(stage)" :matches="getFinalMatches(stage)"></cup-finals-container>
                    <cup-group-container v-for="group in getGroups()" :key="group" :group="group" :matches="getGroupMatches(group)" :standings="getGroupStandings(group)">a</cup-group-container>
                </article>
            </article>
            <article v-else style="width:100%;text-align:center">
                <img src="../assets/images/loading.gif" alt="loading">
            </article>
        </section>
    </div>
</template>

<script>
import apiService from '@/services/APIService'
import moment from 'moment'
import utils from '@/assets/utils'
import cupSeasonsContainer from '@/components/cups/cup-seasons-container'
import cupGroupContainer from '@/components/cups/cup-group-container'
import cupFinalsContainer from '@/components/cups/cup-finals-container'

export default {
    name: 'cup',
    components: {
        cupSeasonsContainer,
        cupGroupContainer,
        cupFinalsContainer
    },
    data(){
        return {
            competitionId: 0,
            season: 0,
            seasons: [],
            groupMatches: [],
            finalMatches: [],
            standings: [],
            loading: false,
            errorList: []
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
        getStageName(stageId){
            return utils.finalStages.find(stage => stage.id == stageId).name;
        },
         getCompetitionName(competitionId){
            return utils.competitionNames.find(comp => comp.id == competitionId).name;
        },
        changeSeason(season){
            this.loading = true;
            this.season = season;
            this.errorList = [];

            if(season > 0){
                apiService.getMatchesByCompetitionAndSeason(this.competitionId, this.season)
                .then((response) => {
                    //Divido los partidos en dos arreglos para poder trabajar con menos datos despues
                    this.groupMatches = response.filter(match => match.stage == "GROUP_STAGE");
                    this.finalMatches = response.filter(match => match.stage != "GROUP_STAGE");
                    this.loading = false;
                })
                .catch(() => {
                    this.errorList.push("No se pudo obtener la información de los partidos.");
                    this.loading = false;
                });

                apiService.getStandingsByCompetitionAndSeason(this.competitionId, this.season)
                .then((response) => {
                    this.standings = response.data.standings;
                })
                .catch(() => {
                    this.errorList.push("No se pudo obtener la información de las posiciones.");
                });
            }
        }
    },
    created(){
        this.competitionId = this.$route.params.id;
        //Por defecto trae la temporada actual
        this.season = utils.cupInfo.find(comp => comp.id == this.competitionId).currentSeason;
        this.seasons = utils.cupsSeasons.filter(season => season.competitionId == this.competitionId);
        this.loading = true;
        this.errorList = [];

        apiService.getMatchesByCompetitionAndSeason(this.competitionId, this.season)
        .then((response) => {
            //Divido los partidos en dos arreglos para poder trabajar con menos datos despues
            this.groupMatches = response.filter(match => match.stage == "GROUP_STAGE");
            this.finalMatches = response.filter(match => match.stage != "GROUP_STAGE");
            this.loading = false;
        })
        .catch(() => {
            this.errorList.push("No se pudo obtener la información de los partidos.");
            this.loading = false;
        });

        apiService.getStandingsByCompetitionAndSeason(this.competitionId, this.season)
        .then((response) => {
            this.standings = response.data.standings;
        })
        .catch(() => {
            this.errorList.push("No se pudo obtener la información de las posiciones.");
        });
    }
}
</script>

