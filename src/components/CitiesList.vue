<template>
  <div>
    <h1>Liste des villes</h1>
    <City v-for="city of cities" :key="city.id" :name="city.name" :weather="city.weather" :temperature="city.temperature" :updated-at="city.updatedAt"></City>
  </div>
</template>

<script>
  import City from "./City.vue";
  import {defineComponent} from "vue";

  export default defineComponent({
    name: 'CitiesList',
    components: {
      City
    },
    computed:{
      cities(){
        return this.$store.state.cities
      }
    },
    mounted() {
      this.$store.dispatch("getCities");
    }
  })
</script>

<style scoped>
  h1 {
    margin: 40px 0 0;
  }
</style>
