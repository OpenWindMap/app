import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex, {})

export default new Vuex.Store({
  state: {
    timeout: 45 * 60000, // = min
    pioupious: []
  },

  getters: {
    visiblePioupious(state) {
      const now = new Date().getTime()
      return state.pioupious.filter(pioupiou =>
        pioupiou.status.state === 'on' &&
        pioupiou.location.date !== null &&
        pioupiou.measurements.date !== null &&
        Math.round(now - new Date(pioupiou.measurements.date).getTime()) <= state.timeout
      )
    }
  },

  mutations: {
    updateAllPioupious(state, { pioupious }) {
      pioupious.forEach(pioupiou => {
        Vue.set(state.pioupious, pioupiou.id, pioupiou)
      })
    },
    updatePioupiou(state, { pioupiou }) {
      Vue.set(state.pioupious, pioupiou.id, pioupiou)
    }
  },

  actions: {
    fetchAllPioupious(context) {
      Vue.http.get('live/all').then(({ body: response }) => {
        context.commit('updateAllPioupious', { pioupious: response.data })
      })
    },
    fetchPioupiou(context, { stationId }) {
      Vue.http.get(`live/${stationId}`).then(({ body: response }) => {
        context.commit('updatePioupiou', { pioupiou: response.data })
      })
    }
  }
})
