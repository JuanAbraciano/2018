<template>
    <section>
        {{stage}}
        <article v-for="group in groups" :key="group[0].homeTeam.id">
            <match-card v-for="match in group" :match="match" :key="match.id"></match-card>
        </article>
    </section>
</template>

<script>
import matchCard from '@/components/match-card.vue'
export default {
    name: 'cupFinalsContainer',
    components: {
        matchCard
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
