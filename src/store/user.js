import Vue from 'vue'

Object.values = object => Object.keys(object).map(key => object[key])
Object.entries = object => Object.keys(object).map(key => [key, object[key]])

export default {
  namespaced: true,

  state: {
    favorites: [542, 293, 438, 265],
    histories: [],
    historyLength: 4,
    center: undefined,
    zoom: undefined
  },

  getters: {
  },

  mutations: {
    rotateUnit(state) {
      const availableUnits = Object.keys(Vue.config.availableUnits)
      let unit = availableUnits.indexOf(Vue.config.unit)
      unit = (unit += 1) && unit >= availableUnits.length ? 0 : unit
      Vue.config.unit = availableUnits[unit]
    },

    pushToHistories(state, { stationId }) {
      if (state.histories.indexOf(stationId) !== -1) {
        state.histories.splice(state.histories.indexOf(stationId), 1)
      }
      state.histories.unshift(stationId)
      state.histories.splice(state.historyLength)
    },
    pushToFavorites(state, { stationId }) {
      if (state.favorites.indexOf(stationId) === -1) {
        state.favorites.unshift(stationId)
      }
    },
    removeToFavorites(state, { stationId }) {
      if (state.favorites.indexOf(stationId) !== -1) {
        state.favorites.splice(state.favorites.indexOf(stationId), 1)
      }
    },
    restoreStore(state, object) {
      Object.entries(object).forEach(([key, value]) => {
        Vue.set(state, key, value || state[key])
      })
    },
    pushMapControls(state, { zoom, center }) {
      state.zoom = zoom
      state.center = center
    }
  },

  actions: {
    saveIntoLStorage(context, object) {
      Object.entries(object).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value))
      })
    },
    getFromLStorage(context, { key }) {
      const value = JSON.parse(localStorage.getItem(key))
      context.commit('restoreStore', { [key]: value })
    },
    pushToHistories(context, { stationId }) {
      context.commit('pushToHistories', { stationId })
      context.dispatch('saveIntoLStorage', { histories: context.state.histories })
    },
    pushToFavorites(context, { stationId }) {
      context.commit('pushToFavorites', { stationId })
      context.dispatch('saveIntoLStorage', { favorites: context.state.favorites })
    },
    removeToFavorites(context, { stationId }) {
      context.commit('removeToFavorites', { stationId })
      context.dispatch('saveIntoLStorage', { favorites: context.state.favorites })
    },
    pushMapControls(context, { zoom, center }) {
      context.commit('pushMapControls', { zoom, center })
      context.dispatch('saveIntoLStorage', { zoom: context.state.zoom, center: context.state.center })
    },
    restoreStore(context) {
      Object.keys(context.state).forEach(key => {
        context.dispatch('getFromLStorage', { key })
      })
    }
  }
}
