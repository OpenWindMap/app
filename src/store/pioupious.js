import Vue from 'vue'
import { connect } from 'socket.io-client'

Object.values = object => Object.keys(object).map(key => object[key])

export default {
  namespaced: true,

  state: {
    timeout: 45 * 60000, // = min
    pioupious: {}
  },

  getters: {
    visible(state) {
      const now = new Date().getTime()
      return Object.values(state.pioupious).filter(pioupiou =>
        pioupiou.status.state === 'on' &&
        pioupiou.location.date !== null &&
        pioupiou.measurements.date !== null &&
        pioupiou.measurements.wind_heading !== null &&
        Math.round(now - new Date(pioupiou.measurements.date).getTime()) <= state.timeout
      )
    },
    get(state) {
      return id => id in state.pioupious ? state.pioupious[id] : {}
    }
  },

  mutations: {
    updateAll(state, { pioupious }) {
      pioupious.forEach(pioupiou => {
        Vue.set(state.pioupious, pioupiou.id, pioupiou)
      })
    },
    updateOne(state, { pioupiou }) {
      Vue.set(state.pioupious, pioupiou.id, pioupiou)
    },
    updateKey(state, { id, value, key }) {
      Vue.set(state.pioupious[id], key, value)
    }
  },

  actions: {
    fetchAll(context) {
      Vue.http.get('live/all').then(({ body: response }) => {
        context.commit('updateAll', { pioupious: response.data })
      })
    },
    fetchOne(context, { stationId }) {
      Vue.http.get(`live/${stationId}`).then(({ body: response }) => {
        context.commit('updateOne', { pioupiou: response.data })
      })
    },
    keepAllUpdated(context) {
      // NEEDTODO : Move it into resource
      const socket = connect('//api.pioupiou.fr/v1/push')

      socket.on('connect', () => {
        socket.emit('subscribe', 'all')
      })
      socket.on('status', data => {
        context.commit('updateKey', { id: data.station_id, value: data, key: 'status' })
      })
      socket.on('measurement', data => {
        context.commit('updateKey', { id: data.station_id, value: data, key: 'measurements' })
      })
      socket.on('location', data => {
        context.commit('updateKey', { id: data.station_id, value: data, key: 'location' })
      })
    },
    keepOneUpdated(context, { stationId }) {
      // NEEDTODO : Move it into resource
      const socket = connect('//api.pioupiou.fr/v1/push')

      socket.on('connect', () => {
        socket.emit('subscribe', stationId)
      })
      socket.on('status', data => {
        context.commit('updateKey', { id: data.station_id, value: data, key: 'status' })
      })
      socket.on('measurement', data => {
        context.commit('updateKey', { id: data.station_id, value: data, key: 'measurements' })
      })
      socket.on('location', data => {
        context.commit('updateKey', { id: data.station_id, value: data, key: 'location' })
      })
    }
  }
}
