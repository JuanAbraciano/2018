export default{
    token: 'd739357133e84409a58114e7a7d87fa3',
    users: [{name: 'Juan', pass: '123'}, {name: 'Pepe', pass: '123'}, {name: 'Maria', pass: '123'}, { name: 'Laura', pass: '123'}, {name: 'Cacho', pass: '123'}],
    competitionNames: [
        {id: 2000, name: 'Rusia 2018'}, 
        {id: 2001, name: 'UEFA Champions League 2017/2018'}, 
        {id: 2001, name: 'UEFA Champions League 2018/2019'},
        {id: 2013, name: 'Brasileirao 2018'},
        {id: 2014, name: 'España - La Liga 2018/2019'},
        {id: 2019, name: 'Italia - Serie A 2018/2019'},
        {id: 2021, name: 'Inglaterra - Premier League 2018/2019'}
    ],

    //Indica la cantidad de fechas de cada liga
    leagueMatchdays: [{id:2013,matchdays:38}, {id:2014,matchdays:38}, {id:2021,matchdays:38}, {id:2019,matchdays:38}],

    //Indica las temporadas de cada copa
    cupsSeasons: [
        {competitionId:2001, year: 2017, name: '2017/2018'}, 
        {competitionId:2001, year: 2018, name: '2018/2019'}, 
        {competitionId:2000, year:2018, name: 'Rusia 2018'}
    ],

    //Indica si una copa tiene formato de llaves y la cantidad de equipos en éstas
    cupInfo: [{id:2001,currentSeason:2018}, {id:2000,currentSeason:2018}],

    //Stages a ignorar al traer los partidos de una copa (son partidos preliminares de equipos medio falopa)
    stagesToIgnore: ['PRELIMINARY_FINAL','PRELIMINARY_SEMI_FINALS','1ST_QUALIFYING_ROUND','2ND_QUALIFYING_ROUND','3RD_QUALIFYING_ROUND','PLAY_OFF_ROUND'],

    finalStages: [
        {id:'ROUND_OF_32', name:'Diecisesiavos de final'},
        {id:'ROUND_OF_16', name:'Octavos de final'},
        {id:'QUARTER_FINALS', name:'Cuartos de final'},
        {id:'SEMI_FINALS', name:'Semifinales'},
        {id: '3RD_PLACE', name:'Tercer puesto'},
        {id:'FINAL', name:'Final'}
    ]
}