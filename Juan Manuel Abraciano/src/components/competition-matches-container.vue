<template>
    <div class="sombreado">
        <section v-for="day in getDays()" :key="day">
            <header v-if="displayDate" class="league-date-description">
                <div><span>{{ formatDay(day) }}</span></div>
            </header>
            <section id="competition-matches-container">   
                <div id="competition-name" v-if="displayCompetitionName">
                    <span>{{competitionName}}</span>
                </div>
                <el-alert v-for="msg in errorList" :key="msg" title="Error:" type="error">
                    {{msg}}
                </el-alert>
                <el-table
                    v-if="!errorList.length"
                    :data="getFormatedMatches(day)" 
                    stripe 
                    style="width: 100%">
                    <el-table-column 
                        width="110px">
                        <template slot-scope="scope">
                            <div :class="scope.row.class">
                                <span>
                                    {{scope.row.status}}
                                </span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column 
                        prop="homeTeam">
                    </el-table-column>
                    <el-table-column 
                        prop="homeGoals"
                        width="40px">
                    </el-table-column>
                    <el-table-column 
                        prop="awayGoals"
                        width="40px">
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                            <div style="float:right">
                            {{scope.row.awayTeam}}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </section>
        </section>
    </div>
</template>

<script>
import matchCard from '@/components/match-card.vue'
import utils from '@/assets/utils'
import moment from 'moment'

export default {
    name: 'competitionMatchesContainer',
    props: ['competitionId','displayCompetitionName','matches', 'displayDate'],
    data() {
        return {
            days: [],
            competitionName: utils.competitionNames.find(comp => comp.id == this.competitionId).name,
            errorList: []
        }
    },
    methods:{
        getDays(){
            return [...new Set(this.matches.map(match => moment(match.utcDate).format("YYYY-MM-DD")))];
        },
        formatDay(day){
            moment.locale('es');
            return moment(day).format('dddd DD [de] MMMM');
        },
        getFormatedMatches(day){
            //Creo un arreglo con solamente los datos que necesito de los partidos
            let that = this;          
            const dayMatches = that.matches.filter(match => moment(match.utcDate).format("YYYY-MM-DD") == day);  
            let formatedMatches = [];
            try{
                dayMatches.forEach(function(match) {
                    let newMatch = {
                        homeTeam: '',
                        awayTeam: '',
                        homeGoals: '',
                        awayGoals: '',
                        status: ''
                    };

                    newMatch.homeTeam = match.homeTeam.name;
                    newMatch.awayTeam = match.awayTeam.name;

                    if(!utils.finalStages.includes(match.stage)){
                        //Si es un partido de liga, solo miro el resultado en los 90 minutos
                        newMatch.homeGoals = match.score.fullTime.homeTeam !== null ? match.score.fullTime.homeTeam : '-';
                        newMatch.awayGoals = match.score.fullTime.awayTeam !== null ? match.score.fullTime.awayTeam : '-';
                    } else {
                        //Sino, me fijo si se jugo tiempo extra y/o penales
                        let homeScore = null;
                        let awayScore = null;

                        homeScore = (match.score.extraTime.homeTeam || match.score.fullTime.homeTeam) !== null ?
                                    (match.score.extraTime.homeTeam || match.score.fullTime.homeTeam) : '-';
                        awayScore = (match.score.extraTime.awayTeam || match.score.fullTime.awayTeam) !== null ?
                                    (match.score.extraTime.awayTeam || match.score.fullTime.awayTeam) : '-';
                        
                        if(match.score.penalties.homeTeam !== null)
                        homeScore +=  ' (' + match.score.penalties.homeTeam + ')';
                        if(match.score.penalties.awayTeam !== null)
                        awayScore +=  ' (' + match.score.penalties.awayTeam + ')';
                    };

                    switch (match.status) {
                        case "FINISHED": 
                            newMatch.status = "Finalizado"; 
                            newMatch.class = "time-indicator finished";
                            break;
                        case "IN_PLAY":
                            newMatch.status = "Jugando"; 
                            newMatch.class = "time-indicator playing";
                            break;
                        case "PAUSED": 
                            newMatch.status = "Entretiempo"; 
                            newMatch.class = "time-indicator playing";
                            break;
                        case "SCHEDULED": 
                            newMatch.status = moment(match.utcDate).format("HH:mm"); 
                            newMatch.class = "time-indicator scheduled";
                            break;
                        default: 
                            newMatch.status = "";
                            newMatch.class = "time-indicator";
                    };

                    formatedMatches.push(newMatch);
                });
                return formatedMatches;
            } catch (error) {
                this.errorList.push("No se pudo obtener la información de los partidos");
            }
        }
    }
}
</script>
