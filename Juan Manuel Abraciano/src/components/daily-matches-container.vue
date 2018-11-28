<template>
    <div>
        <header class="matches-date">
            <div><span>{{ formatedDate }}</span></div>
        </header>
        <section>
            <article v-if="!loading">
                <el-alert v-for="msg in errorList" :key="msg" title="Error:" type="error">
                    {{msg}}
                </el-alert>

                <competition-matches-container v-for="c in getCompetitions()" :competitionId="c" :displayCompetitionName="getCompetitions().length > 0" :matches="getCompetitionMatches(c)" :displayDate="false" :key="c"></competition-matches-container>
                <article style="text-align:center; margin:15px; font-weight:bold;">
                    <span v-if="noMatchesToday" >Sin partidos</span>
                </article>
            </article>
            <article v-else style="width:100%;text-align:center">
                <img src="../assets/images/loading.gif" alt="loading">
            </article>
        </section>
    </div>
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
            loading: false,
            formatedDate: null,
            matches: [],
            noMatchesToday: false,
            errorList: []
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
        this.loading = true;
        this.errorList = [];

        apiService.getMatchesByDay(this.date)
        .then((comp) => {
            if(comp.length > 0)
                this.matches = comp;            
            else
                this.noMatchesToday = true;
            this.loading = false;
        })
        .catch(() => {
            this.errorList.push("No se pudo obtener la información de los partidos del día.");
            this.loading = false;
        });
    }
}
</script>

