<template>
    <section>   
        <match-card v-for="match in matches" :match="match" :key="match.id"></match-card>
    </section>
</template>

<script>
import matchCard from '@/components/match-card.vue'
export default {
    name: 'leagueMatchesContainer',
    components: {
        matchCard
    },
    props: ['id','matches']
}
</script>
