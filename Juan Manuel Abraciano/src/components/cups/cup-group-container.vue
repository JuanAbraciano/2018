<template>
    <div>
        <header class="group-name">
            {{group.replace("Group", "Grupo")}}
        </header>
        <section>
            <cup-group-standings :standings="standings" style="margin-bottom:10px;"></cup-group-standings>
            <cup-group-matches v-for="date in getDates()" :key="date" :date="date" :matches="getDailyMatches(date)"></cup-group-matches>
        </section>
    </div>
</template>

<script>
import dailyMatchesContainer from '@/components/daily-matches-container'
import cupGroupStandings from '@/components/cups/cup-group-standings.vue'
import cupGroupMatches from '@/components/cups/cup-group-matches.vue'
import moment from 'moment'

export default {
    name: 'cupGroupContainer',
    components: {
        cupGroupStandings,
        cupGroupMatches
    },
    props: ['group','matches', 'standings'],
    methods: {
        getDates(){
            return  [...new Set(this.matches.map(match => moment(match.utcDate).format("YYYY-MM-DD")))]
        },
        getDailyMatches(date){
            return this.matches.filter(match => moment(match.utcDate).format("YYYY-MM-DD") == date);
        }
    }
}
</script>