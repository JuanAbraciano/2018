<template>
    <section>
        <table>
            <tr>
                <th v-for="column in columns" :key="column">
                    <td>{{column}}</td>
                </th>
            </tr>
            <tr v-for="entry in standings" :key="entry.team.id">
                <td>{{entry.position}}</td>
                <td>{{entry.team.name}}</td>
                <td>{{entry.points}}</td>
                <td>{{entry.playedGames}}</td>
                <td>{{entry.won}}</td>
                <td>{{entry.draw}}</td>
                <td>{{entry.lost}}</td>
                <td>{{entry.goalsFor}}</td>
                <td>{{entry.goalsAgainst}}</td>
                <td>{{entry.goalDifference}}</td>
            </tr>
        </table>
    </section>
</template>

<script>
export default {
    name: 'cupGroupStandings',
    props: ['standings'],
    data(){
        return{
            columns: ['#','Equipo','Pts','PJ','PG','PE','PP','GF','GC','DIF']
        }
    }
}
</script>

