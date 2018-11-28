<template>
    <section class="cup-group-matches">   
        <article class="cup-final-date-description">
            <span>{{formatedDate}}</span>
        </article>
        <el-table
            :data="getFormatedMatches" 
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
            <el-table-column 
                prop="awayTeam">
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
import utils from '@/assets/utils'
import moment from 'moment'

export default {
    name: 'cupGroupMatches',
    props: ['date','matches'],
    data() {
        return {
            formatedDate: null,
        }
    },
    computed: {
        getFormatedMatches(){
            //Creo un arreglo con solamente los datos que necesito de los partidos
            let that = this;            
            let formatedMatches = [];

            that.matches.forEach((match) => {
                let newMatch = {
                    homeTeam: '',
                    awayTeam: '',
                    homeGoals: '',
                    awayGoals: '',
                    status: '',
                    class: ''
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
        }
    },
    created(){
        moment.locale('es');
        this.formatedDate = moment(this.date).format('dddd DD [de] MMMM');
    }
}
</script>