// import Vue from 'vue'

export default {
  namespaced: true,

  state: {
    unit: 0,
    units: ['kmph', 'mph', 'knot'],

    favorites: [542, 293, 438, 265],
    histories: [],
    historyLength: 4
  },

  getters: {
  },

  mutations: {
    rotateUnit(state) {
      state.unit = (state.unit += 1) && state.unit >= state.units.length ? 0 : state.unit
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
    }
  },

  actions: {
  }
}
