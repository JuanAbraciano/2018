<template>
    <section id="competition-matches-container">   
        <div id="competition-name" v-if="displayCompetitionName">
            <span>{{competitionName}}</span>
        </div>
        <el-table
            :data="getFormatedMatches" 
            stripe 
            style="width: 100%">
            <el-table-column 
                width="110px">
                <template slot-scope="scope">
                    <div style="border-right: 1px solid darkgray">
                    {{scope.row.status}}
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
            <el-table-column 
                prop="awayTeam">
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
import matchCard from '@/components/match-card.vue'
import utils from '@/assets/utils'
import moment from 'moment'

export default {
    name: 'competitionMatchesContainer',
    props: ['competitionId','displayCompetitionName','matches'],
    data() {
        return {
            competitionName: utils.competitionNames.find(comp => comp.id == this.competitionId).name
        }
    },
    computed: {
        getFormatedMatches(){
            //Creo un arreglo con solamente los datos que necesito de los partidos
            let that = this;            
            let formatedMatches = [];

            that.matches.forEach(function(match) {
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
                    case "FINISHED": newMatch.status = "Finalizado"; break;
                    case "IN_PLAY": newMatch.status = "Jugando"; break;
                    case "PAUSED": newMatch.status = "Entretiempo"; break;
                    case "SCHEDULED": newMatch.status = moment(match.utcDate).format("HH:mm"); break;
                    default: newMatch.status = "";
                };

                formatedMatches.push(newMatch);
            });
            return formatedMatches;
        }
    }
}
</script>
