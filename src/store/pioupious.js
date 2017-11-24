import Vue from 'vue'
import geodist from 'geodist'
// import { connect } from 'socket.io-client'

Object.values = object => Object.keys(object).map(key => object[key])

export default {
  namespaced: true,

  state: {
    timeout: 45 * 60000, // = min
    archiveTime: 3 * 3600000, // = hour
    reloadTime: 60 * 1000, // = sec
    pioupious: {},

    watchers: {}
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
    },
    findByName(state) {
      return search => Object.values(state.pioupious).filter(pioupiou =>
        search.length > 0 && (
          (new RegExp(search, 'i')).test(pioupiou.meta.name) ||
          (new RegExp(search, 'i')).test(pioupiou.id)
        )
      )
    },
    findByProximity(state, getters) {
      return (position, dist) => getters.visible.filter(pioupiou =>
        position !== undefined &&
        geodist(pioupiou.location, position, { unit: 'meters', limit: dist })
      ).sort((pioupiouA, pioupiouB) => {
        const distA = geodist(pioupiouA.location, position, { unit: 'meters' })
        const distB = geodist(pioupiouB.location, position, { unit: 'meters' })
        if (distA > distB) {
          return 1
        } else if (distA < distB) {
          return -1
        }
        return 0
      })
    },
    findByLoc(state, getters) {
      return boundaries => getters.visible.filter(pioupiou =>
        boundaries !== undefined &&
        pioupiou.location.latitude >= boundaries._southWest.lat &&
        pioupiou.location.latitude <= boundaries._northEast.lat &&
        pioupiou.location.longitude >= boundaries._southWest.lng &&
        pioupiou.location.longitude <= boundaries._northEast.lng
      )
    }
  },

  mutations: {
    updateAll(state, { pioupious }) {
      pioupious.forEach(pioupiou => {
        if (pioupiou.id in state.pioupious) {
          Object.keys(pioupiou).forEach(key => {
            if (state.pioupious[pioupiou.id][key] !== pioupiou[key]) {
              Vue.set(state.pioupious[pioupiou.id], key, pioupiou[key])
            }
          })
        } else {
          Vue.set(state.pioupious, pioupiou.id, pioupiou)
        }
      })
    },
    updateOne(state, { pioupiou }) {
      if (pioupiou.id in state.pioupious) {
        Object.keys(pioupiou).forEach(key => {
          if ((typeof pioupiou[key] === 'object' && 'date' in pioupiou[key] && state.pioupious[pioupiou.id][key].date !== pioupiou[key].date) || (typeof pioupiou[key] !== 'object' && state.pioupious[pioupiou.id][key] !== pioupiou[key])) {
            console.log('update', pioupiou.id, key)
            Vue.set(state.pioupious[pioupiou.id], key, pioupiou[key])
          }
        })
      } else {
        Vue.set(state.pioupious, pioupiou.id, pioupiou)
      }
    },
    updateKey(state, { id, value, key }) {
      if (state.pioupious[id][key] !== value) {
        Vue.set(state.pioupious[id], key, value)
      }
    },
    archiveOne(state, { stationId, data }) {
      if (state.pioupious[stationId]['archive'] !== data) { // eslint-disable-line dot-notation
        Vue.set(state.pioupious[stationId], 'archive', data)
      }
    },
    addWatcher(state, { stationId, intId }) {
      Vue.set(state.watchers, stationId, intId)
    },
    removeWatcher(state, { stationId }) {
      Vue.delete(state.watchers, stationId)
    }
  },

  actions: {
    fetchAll(context) {
      Vue.http.get('live/all').then(({ body: response }) => {
        context.commit('updateAll', { pioupious: response.data })
      })
    },
    fetchOne(context, { stationId }) {
      Vue.http.get(`live-with-meta/${stationId}`).then(({ body: response }) => {
        context.commit('updateOne', { pioupiou: response.data })

        const start = new Date(new Date().getTime() - context.state.archiveTime).toISOString()
        context.dispatch('fetchArchive', { stationId, stop: 'now', start })
      })
    },
    fetchArchive(context, { stationId, start, stop }) {
      Vue.http.get(`archive/${stationId}?start=${start}&stop=${stop}`)
      .then(({ body: response }) => {
        context.commit('archiveOne', { stationId, data: response.data })
      })
      .catch(({ status }) => {
        if (status === 404) {
          context.commit('archiveOne', { stationId, data: null })
        }
      })
    },
    keepAllUpdated(context) {
      if ('all' in context.state.watchers) return

      const intId = setInterval(() => {
        console.log('update all')
        context.dispatch('fetchAll')
      }, context.state.reloadTime)

      context.commit('addWatcher', { stationId: 'all', intId })
    },
    keepOneUpdated(context, { stationId }) {
      if (stationId in context.state.watchers) return

      const intId = setInterval(() => {
        console.log('update', stationId)
        context.dispatch('fetchOne', { stationId })
      }, context.state.reloadTime)

      context.commit('addWatcher', { stationId, intId })
    },
    stopAllToBeUpdated(context) {
      console.log('stopAllToBeUpdated', context.state.watchers)
      clearInterval(context.state.watchers['all']) // eslint-disable-line dot-notation
      context.commit('removeWatcher', { stationId: 'all' })
    },
    stopOneToBeUpdated(context, { stationId }) {
      console.log('stopOneToBeUpdated', stationId, context.state.watchers)
      clearInterval(context.state.watchers[stationId])
      context.commit('removeWatcher', { stationId })
    }
  }
}

// NEEDTODO : Move it into resource
// const socket = connect('//api.pioupiou.fr/v1/push')
//
// socket.on('connect', () => {
//   socket.emit('subscribe', stationId)
// })
// socket.on('status', data => {
//   context.commit('updateKey', { id: data.station_id, value: data, key: 'status' })
//
//   const start = new Date(new Date().getTime() - context.state.archiveTime).toISOString()
//   context.dispatch('fetchArchive', { stationId: data.station_id, stop: 'now', start })
// })
// socket.on('measurement', data => {
//   context.commit('updateKey', { id: data.station_id, value: data, key: 'measurements' })
// })
// socket.on('location', data => {
//   context.commit('updateKey', { id: data.station_id, value: data, key: 'location' })
// })
