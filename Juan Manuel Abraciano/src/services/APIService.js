import axios from 'axios';
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
        return axiosInstance.get('matches?competitions=2013,2014,2019,2021,2088,2018,2001,2000&dateFrom=2018-11-08&dateTo=' + date)
        .then((response) => {
            return response.data.matches;
        });
    }

/* #endregion Matches */
}   