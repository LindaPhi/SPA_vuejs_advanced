<template>
  <div style="height: 100vh; width: 100vw;">
    <l-map
      v-model:zoom="zoom"
      :center="[45.8910906, 6.0925617]"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>

      <l-marker v-for="city in cities" :lat-lng="[city.lat, city.lon]" :key="city.name">
        <l-icon :icon-url="`https://openweathermap.org/img/wn/${city.icon}.png`" :icon-size="iconSize" />
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { LMap, LTileLayer, LMarker, LIcon, } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default defineComponent({
  name: "CitiesMap",
  components: {
      LMap,
      LTileLayer,
      LMarker,
      LIcon,
    },
  data() {
      return {
        zoom: 12,
        
      }
    },
  computed: {
      
      iconSize() {
        return [50, 50];
      },
      cities(){
        return this.$store.state.cities
      }
    },
  mounted() {
      this.$store.dispatch("getCities");
  },
});
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
