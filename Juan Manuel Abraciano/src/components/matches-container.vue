<template>
    <section>
        <span>{{id}}</span> 
        <match-card v-for="match in getMatches" :match="match" :key="match.id"></match-card>
    </section>
</template>

<script>
import matchCard from '@/components/match-card.vue'
export default {
    name: 'matchesContainer',
    components: {
        matchCard
    },
    props: ['id','matches'],
    computed: {
        getMatches(){
            return this.matches.filter(match => match.competition.id == this.id)
        }
    }
}
</script>
