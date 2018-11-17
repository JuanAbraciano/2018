<template>
    <section>
        {{match.homeTeam.name}} | {{match.score.fullTime.homeTeam}} ||| {{match.score.fullTime.awayTeam}} | {{match.awayTeam.name}} --- {{match.utcDate}}
    </section>
</template>

<script>
export default {
    name: 'matchCard',
    props: ['match']
}
</script>
