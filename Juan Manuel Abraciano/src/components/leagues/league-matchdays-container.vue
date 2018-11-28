<template>
    <section class="block">
        <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="currentMatchday"
            :total="matchdays * 10">
        </el-pagination>
    </section>
</template>

<script>
export default {
    name: 'leagueMatchdaysContainer',
    props: ['competitionId','matchdays', 'currentMatchday'],
    methods:{
        handleCurrentChange(val) {
            this.$emit('changeMatchday', val)
        }
    }
}
</script>
