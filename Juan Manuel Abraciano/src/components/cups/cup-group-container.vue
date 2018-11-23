<template>
    <section>
        {{group}}
        <cup-group-standings :standings="standings"></cup-group-standings>
        <match-card v-for="match in matches" :match="match" :key="match.id"></match-card>
    </section>
</template>

<script>
import matchCard from '@/components/match-card.vue'
import cupGroupStandings from '@/components/cups/cup-group-standings.vue'
export default {
    name: 'cupGroupContainer',
    components: {
        matchCard,
        cupGroupStandings
    },
    props: ['group','matches', 'standings']
}
</script>