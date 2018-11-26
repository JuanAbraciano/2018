<template>
    <section>
        {{stage}}
        <section v-for="group in groups" :key="group[0].homeTeam.id" class="cup-finals-groups">
           <cup-finals-match  v-for="match in group"  :match="match" :key="match.id"></cup-finals-match>
            <!-- <article v-for="match in group" :match="match" :key="match.id" class="cup-finals-match"></article> -->
        </section>
    </section>
</template>

<script>
import matchCard from '@/components/match-card.vue'
import cupFinalsMatch from '@/components/cups/cup-finals-match'

export default {
    name: 'cupFinalsContainer',
    components: {
        matchCard,
        cupFinalsMatch
    },
    props: ['stage','matches'],
    data(){
        return {
            teams: [],
            groups: []
        }
    },
    methods: {
        getGroups(){
            const that = this;
            this.matches.forEach(function(match){
                if(!that.groups.length) {
                    that.groups.push([match]);
                } else {
                    let exists = false;
                    that.groups.forEach(function(group){
                        if(group.find(groupMatch => groupMatch.homeTeam.id == match.homeTeam.id || groupMatch.awayTeam.id == match.homeTeam.id)){
                            exists = true;
                            group.push(match);
                        }
                    });
                    if (!exists)
                        that.groups.push([match]);
                }
            })
        }
    },
    mounted(){
        this.getGroups();
    }
}
</script>
