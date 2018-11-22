<template>
    <section>   
        <match-card v-for="match in matches" :match="match" :key="match.id"></match-card>
        <router-link v-for="index in matchdays" :key="index"></router-link>
    </section>
</template>

<script>
export default {
    name: 'matchdaysContainer',
    props: ['competitionId','matchdays']
}
</script>
