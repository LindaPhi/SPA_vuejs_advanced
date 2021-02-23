import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({
 state : {
  cities:[]
},

// //to handle state
//  getters : {
//   allCities: (state : any) => state.cities
// },

//to handle actions
 actions : {
  getCities({commit}){
    axios
          .get(
            `https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
          .then(response => {
              const cities = [];
              for (const {
                      name, 
                      coord: {lat, lon},
                      weather: [{description: weather, icon: icon}], 
                      main: {temp: temperature}, 
                      dt: updatedAt
                    } of response.data.list) {
                        cities.push({
                          name, 
                          lat, 
                          lon,
                          weather,
                          icon, 
                          temperature,
                          updatedAt: new Date(updatedAt * 1000)
                        })
                      }
              commit('setCities', cities)
          })
            
  }
},

//to handle mutations
 mutations : {
  setCities(state: any, cities: any) {
    state.cities = cities
    }
}

})
