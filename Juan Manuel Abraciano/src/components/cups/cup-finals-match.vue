<template>
    <div class="cup-finals-match">
        <header class="cup-final-date-description">
            <span>{{formatedDate}}</span>
        </header>
        <section class="cup-finals-match-inner">
            <el-table
                :data="getFormatedMatch" 
                border
                style="width: 100%"
                class="cup-finals-match-inner">
                <el-table-column 
                    width="70px">
                    <template slot-scope="scope">
                        <div style="padding:0px;">
                            <span style="font-weight:bold; font-size:11px;">
                                {{scope.row.status}}
                            </span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                            <span style="">
                                {{scope.row.homeTeam}}
                            </span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column 
                    prop="homeGoals"
                    width="50px">
                </el-table-column>
                <el-table-column 
                    prop="awayGoals"
                    width="50px">
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                            <span style="">
                                {{scope.row.awayTeam}}
                            </span>
                        </div>
                    </template>
                </el-table-column>
            </el-table> 
        </section>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'cupFinalsMatch',
    props: ['match'],
    data() {
        return {
            formatedDate: null,
        }
    },
    computed: {
        getFormatedMatch() {
            let formatedMatch = {
                homeTeam: '',
                awayTeam: '',
                homeGoals: '',
                awayGoals: '',
                status: ''
            };

            formatedMatch.homeTeam = this.match.homeTeam.name;
            formatedMatch.awayTeam = this.match.awayTeam.name;

            //Me fijo si se jugo tiempo extra y/o penales
            let homeScore = null;
            let awayScore = null;
            homeScore = (this.match.score.extraTime.homeTeam || this.match.score.fullTime.homeTeam) !== null ?
                        (this.match.score.extraTime.homeTeam || this.match.score.fullTime.homeTeam) : '-';
            awayScore = (this.match.score.extraTime.awayTeam || this.match.score.fullTime.awayTeam) !== null ?
                        (this.match.score.extraTime.awayTeam || this.match.score.fullTime.awayTeam) : '-';            
            if(this.match.score.penalties.homeTeam !== null)
                homeScore +=  ' (' + this.match.score.penalties.homeTeam + ')';
            if(this.match.score.penalties.awayTeam !== null)
                awayScore +=  ' (' + this.match.score.penalties.awayTeam + ')';
            formatedMatch.homeGoals = homeScore;
            formatedMatch.awayGoals = awayScore;

            switch (this.match.status) {
                case "FINISHED": formatedMatch.status = "Finalizado"; break;
                case "IN_PLAY": formatedMatch.status = "Jugando"; break;
                case "PAUSED": formatedMatch.status = "Entretiempo"; break;
                case "SCHEDULED": formatedMatch.status = moment(match.utcDate).format("HH:mm"); break;
                default: formatedMatch.status = "";
            };

            return [formatedMatch];
        }
    },
    created() {
        moment.locale('es');
        this.formatedDate = moment(this.match.utcDate).format('dddd DD [de] MMMM');
    }
}
</script>

