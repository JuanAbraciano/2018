<template>
    <section>
        <el-table
            :data="standings"
            :row-class-name="tableRowClassName"
            border
            style="width: 100%">
            <el-table-column
                prop="position"
                label="#"
                width="45">
            </el-table-column>
            <el-table-column
                prop="team.name"
                label="Equipo">
            </el-table-column>
            <el-table-column
                prop="points"
                label="Pts"
                width="45">
            </el-table-column>
            <el-table-column
                prop="playedGames"
                label="PJ"
                width="45">
            </el-table-column>
            <el-table-column
                prop="won"
                label="PG"
                width="45">
            </el-table-column>
            <el-table-column
                prop="draw"
                label="PE"
                width="45">
            </el-table-column>
            <el-table-column
                prop="lost"
                label="PP"
                width="45">
            </el-table-column>
            <el-table-column
                prop="goalsFor"
                label="GF"
                width="45">
            </el-table-column>
            <el-table-column
                prop="goalsAgainst"
                label="GC"
                width="45">
            </el-table-column>
            <el-table-column
                prop="goalDifference"
                label="DIF"
                width="45">
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
export default {
    name: 'leagueStandings',
    props: ['standings'],
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 0 ) 
          return 'row-success';
      }
    },
}
</script>

<style>
    .el-table .row-success{
        background: #AAF597;
    }
</style>


