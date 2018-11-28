<template>
    <div class="sombreado">
        <header style="margin:5px 0px 5px 0px;">
            <div class="stage-name">
                <span>{{stage}}</span>
            </div>
        </header>
        <section>
            <el-row>
                <div v-for="group in groups" :key="group[0].homeTeam.id" class="cup-finals-groups">
                    <el-col :span="groups.length > 1 ? 12: 24" v-for="match in group" :key="match.id">
                        <cup-finals-match :match="match" :class="groups.length > 1 ? '' : ' cup-finals-match-single center'"></cup-finals-match>
                    </el-col>
                </div>
            </el-row>
        </section>
    </div>
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
            this.matches.forEach((match) => {
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
