<template>
    <div id="home">
        <span>Partidos de hoy</span>
        <daily-matches-container :date="date"></daily-matches-container>       
    </div>
</template>

<script>    
import dailyMatchesContainer from '@/components/daily-matches-container'
import apiService from '@/services/APIService'
import moment from 'moment'

export default {
    name: 'home',
    components: {
        dailyMatchesContainer
    },
    data(){
        return{
            date: moment(new Date()).format("YYYY-MM-DD")
        }
    }
}
</script>
