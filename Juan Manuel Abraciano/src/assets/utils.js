export default{
    //Indica la cantidad de fechas de cada liga
    leagueMatchdays: [{id:2013,matchdays:38}, {id:2014,matchdays:38}, {id:2021,matchdays:38}, {id:2019,matchdays:38}],

    //Indica si una copa tiene formato de llaves y la cantidad de equipos en éstas
    cupInfo: [{id:2001,currentSeason:2018,hasBrackets:false,teamsInFinals:32}, {id:2000,currentSeason:2018,hasBrackets:true,teamsInFinals:32}],

    //Stages a ignorar al traer los partidos de una copa (son partidos preliminares de equipos medio falopa)
    stagesToIgnore: ['PRELIMINARY_FINAL','PRELIMINARY_SEMI_FINALS','1ST_QUALIFYING_ROUND','2ND_QUALIFYING_ROUND','3RD_QUALIFYING_ROUND','PLAY_OFF_ROUND'],

    finalStages: ['ROUND_OF_32','ROUND_OF_16','QUARTER_FINALS','SEMI_FINALS','FINAL']
}