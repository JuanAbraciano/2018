import axios from 'axios';
import utils from '@/assets/utils'

const axiosInstance = axios.create({
    baseURL: 'https://api.football-data.org/v2/',
    headers: {'X-Auth-Token': 'd739357133e84409a58114e7a7d87fa3' }
});

export default{
 
/* #region Competitions */
    //Trae todas las ligas de los paises
    getAllLeagues() {
        return axiosInstance.get('competitions?plan=TIER_ONE')
            .then((response) => {
                const leaguesIds = [2013,2014,2019,2021,2088];
                return response.data.competitions.filter(comp => leaguesIds.includes(comp.id));
            })
    },   
    
    //Trae todas las copas internacionales
    getAllCups() {
        return axiosInstance.get('competitions?plan=TIER_ONE')
            .then((response) => {
                const coupsIds = [2018,2001,2000];
                return response.data.competitions.filter(comp => coupsIds.includes(comp.id));
            })
    },
/* #endregion Competitions */

/* #region Matches */
    getMatchesByDay(date){
        //FIXME
        return axiosInstance.get('matches?competitions=2013,2014,2019,2021,2088,2018,2001,2000&dateFrom=2018-11-16&dateTo=' + date)
        .then((response) => {
            return response.data.matches;
        });
    },

    //Trae los partidos por campeonato y por fecha
    getMatchesByCompetitionAndMatchday(competitionId, matchday){
        return axiosInstance.get('competitions/' + competitionId + '/matches?matchday=' + matchday)
        .then((response) => {
            return response.data.matches;
        });
    },

    //Trae todos los partidos por campeonato y temporada
    getMatchesByCompetitionAndSeason(competitionId, season){
        return axiosInstance.get('competitions/' + competitionId + '/matches?season=' + season)
        .then((response) => {
            const stagesToIgnore = utils.stagesToIgnore;
            const filteredArray = response.data.matches.filter(match => !stagesToIgnore.includes(match.stage));
            return filteredArray;
        });
    },
/* #endregion Matches */

/* #region Matchdays (Fechas) */
    //Para un campeonato, trae la fecha que se esta jugando (o la proxima, si es que no estamos en un fin de semana)
    getMatchDayByCompetitionId(competitionId, today){
        //FIXME
        return axiosInstance.get('competitions/' + competitionId + '/matches?dateFrom=' + today + '&dateTo=2018-12-31')
        .then((response) => {
            return response.data.matches[0].matchday;
        });
    },

    getMatchDaysForCompetition(competitionId){
        //FIXME
        return axiosInstance.get('competitions/' + competitionId + '/matches?season=2018')
        .then((response) => {
            return  [...new Set(response.data.matches.map(match => match.matchday))]
        });
    },
/* #endregion Matchdays (Fechas) */

/* #region Standings */
    getStandingsByCompetitionId(competitionId){
        return axiosInstance.get('competitions/' + competitionId + '/standings?standingType=TOTAL')
        .then((response) => {
            return response.data;
        })
    }
/* #endregion Standings */
}   