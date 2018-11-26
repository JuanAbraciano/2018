<template>
    <div class="block">
        <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :total="matchdays * 10">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'leagueMatchdaysContainer',
    props: ['competitionId','matchdays'],
    methods:{
        handleCurrentChange(val) {
            this.$emit('changeMatchday', val)
        }
    }
}
</script>
