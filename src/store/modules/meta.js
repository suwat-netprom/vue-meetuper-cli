import axios from 'axios'

export default {
  namespaced: true,

  state: {
    isLocationResolved: false,
    item: {
      city: '',
      country: ''
    }
  },
  getters: {
    location (state) {
      console.log('state', state);
      const {city, country} = state.item
      return (city.name && country.name) ? (city.name + ', ' + country.name) : ''
    }
  },
  actions: {
    fetchMetaData ({commit, state}) {
      return axios.get('/api/v1')
        .then(res => {
          const meta = res.data
          console.log('meta', meta);
          commit('setItem', {item: meta, resource: 'meta'}, {root: true})
          commit('resolveLocation', true)
          return meta
        })
        .catch(err => {
          commit('resolveLocation', true)
          return err
        })
    }
  },
  mutations: {
    resolveLocation(state, isLocationResolved) {
      state.isLocationResolved = isLocationResolved
    }
  }
}
