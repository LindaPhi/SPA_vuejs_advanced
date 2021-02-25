import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore, } from 'vuex'
import axios from 'axios'

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })
/// define your typings for the store state
export interface State {
  cities: Array<Object>,
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()


export default createStore<State>({
    state : {
      cities:[]
    },

    //to handle actions
    actions : {
      getCities({commit, state}){
        if (localStorage.getItem('cities') == null){
          console.log('Appel à l\'API')
        axios
              .get(
                `https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
              .then(response => {
                  const cities = [];
                  for (const {
                          name, coord: {lat, lon}, weather: [{description: weather, icon: icon}], main: {temp: temperature},  dt: updatedAt } of response.data.list) { cities.push({ name, lat, lon, weather, icon,  temperature, updatedAt: new Date(updatedAt * 1000)
                            })
                          }
                  commit('setCities', cities)
                  localStorage.setItem('cities', JSON.stringify(cities));
              })
      }else{
        console.log('Pas d\'appel à l\'API');
        commit('setCities', JSON.parse(localStorage.cities));
      }
      }
    },

    //to handle mutations
    mutations : {
      setCities(state: any, cities: any) {
        state.cities = cities
        }
    },

})

// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key)
}
