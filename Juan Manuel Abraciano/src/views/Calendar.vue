<template>
  <section>
    <daily-matches-container v-for="date in days" :key="date" :date="date"></daily-matches-container>  
  </section>
</template>

<script>
import dailyMatchesContainer from '@/components/daily-matches-container'
import apiService from '@/services/APIService'
import moment from 'moment'

export default {
  name: 'calendario',
  components: {
    dailyMatchesContainer
  },
  data(){
    return{
      today: moment(new Date()).format("YYYY-MM-DD"),
      days: []
    }
  },
  methods: {
    setDates(){
      for(let i = 0; i < 5; i++) {
        this.days.push(moment(this.today).add(i, 'days').format("YYYY-MM-DD"));
      }
    }
  },
  created(){
    this.setDates();
  }
}
</script>
