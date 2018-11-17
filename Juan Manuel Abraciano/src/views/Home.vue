<template>
    <div id="home">
        <span>Partidos de hoy</span>
    </div>
</template>

<script>
import apiService from '@/services/APIService'
export default {
    name: 'home',
    data(){
        return{
            list:[],
            date: null
        }
    },
    created(){
        // apiService.getMatchesByDay()
        // .then((comp) => {
        //     this.list = comp;
        // })
        // .catch((err) => {
        //     alert(err);
        // });
        this.date = new Date();
    }
}
</script>
