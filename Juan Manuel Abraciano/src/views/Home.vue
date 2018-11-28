<template>
    <div id="home">
        <header class="competition-name-big" style="margin-bottom:5px;">
            <span>Partidos de hoy</span>
        </header>
        <section>
            <daily-matches-container :date="date"></daily-matches-container>       
        </section>
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
