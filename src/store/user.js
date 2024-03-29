import Vue from 'vue'
import fakeStorage from 'fa-storage/src/memory.js'

Object.values = object => Object.keys(object).map(key => object[key])
Object.entries = object => Object.keys(object).map(key => [key, object[key]])

function isLocalStorageSupported() {
  const item = 'localStoragePollyfill'
  try {
    localStorage.setItem(item, item)
    localStorage.removeItem(item)
    return true
  } catch (e) {
    return false
  }
}

window.fakeStorage = fakeStorage()

function localStoragePolyfill() {
  if (isLocalStorageSupported()) {
    return window.localStorage
  }
  return window.fakeStorage
}

export default {
  namespaced: true,

  state: {
    favorites: [],
    histories: [],
    renames: {},
    historyLength: 4,
    lang: undefined,
    unit: undefined,
    center: undefined,
    zoom: undefined,
    currentTime: 0,
    position: undefined,
    lastFeedback: undefined,
    positionWatch: false,
    firstRun: true
  },

  getters: {
    getName(state) {
      return id => id in state.renames ? state.renames[id] : undefined
    },
    isLocalStorage() {
      return localStoragePolyfill().constructor.name === 'Storage'
    }
  },

  mutations: {
    rotateUnit(state) {
      const availableUnits = Object.keys(Vue.config.availableUnits)
      let unit = availableUnits.indexOf(Vue.config.unit)
      unit = (unit += 1) && unit >= availableUnits.length ? 0 : unit
      Vue.config.unit = availableUnits[unit]
      state.unit = availableUnits[unit]
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
    renameStation(state, { stationId, newName }) {
      Vue.set(state.renames, stationId, newName)
    },
    removeRename(state, { stationId }) {
      Vue.delete(state.renames, stationId)
    },
    restoreStore(state, object) {
      Object.entries(object).forEach(([key, value]) => {
        Vue.set(state, key, value === null ? state[key] : value)
      })
    },
    pushMapControls(state, { zoom, center }) {
      state.zoom = zoom
      state.center = center
    },
    setTimeToNow(state) {
      state.currentTime = (new Date()).getTime()
    },
    setLang(state, { lang }) {
      state.lang = lang
      Vue.config.language = state.lang
    },
    setUnit(state, { unit }) {
      state.unit = unit
      Vue.config.unit = state.unit
    },
    userPosition(state, { position }) {
      if (position && position.coords) {
        state.position = position.coords
      } else {
        state.position = null
      }
    },
    setPositionWatch(state, { positionWatch }) {
      state.positionWatch = positionWatch
    },
    setLastFeedback(state, { lastFeedback }) {
      state.lastFeedback = lastFeedback
    },
    dissmissFirstRun(state) {
      state.firstRun = false
    },
  },

  actions: {
    rotateUnit(context) {
      context.commit('rotateUnit')
      context.dispatch('saveIntoLStorage', { unit: context.state.unit })
    },
    saveIntoLStorage(context, object) {
      Object.entries(object).forEach(([key, value]) => {
        localStoragePolyfill().setItem(key, JSON.stringify(value))
      })
    },
    getFromLStorage(context, { key }) {
      const value = JSON.parse(localStoragePolyfill().getItem(key))
      if (key === 'lang') {
        const systemLanguage = navigator.language.split('-')[0]
        const language = value || systemLanguage
        if (language in Vue.$translations) {
          context.dispatch('setLang', { lang: language })
        }
      } else if (key === 'unit') {
        if (value) {
          context.commit('setUnit', { unit: value })
        }
      } else {
        context.commit('restoreStore', { [key]: value })
      }
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
    renameStation(context, { stationId, newName }) {
      context.commit('renameStation', { stationId, newName })
      context.dispatch('saveIntoLStorage', { renames: context.state.renames })
    },
    removeRename(context, { stationId }) {
      context.commit('removeRename', { stationId })
      context.dispatch('saveIntoLStorage', { renames: context.state.renames })
    },
    pushMapControls(context, { zoom, center }) {
      context.commit('pushMapControls', { zoom, center })
      context.dispatch('saveIntoLStorage', { zoom: context.state.zoom, center: context.state.center })
    },
    setLang(context, { lang }) {
      context.commit('setLang', { lang })
      context.dispatch('saveIntoLStorage', { lang })
    },
    setLastFeedback(context, { lastFeedback }) {
      context.commit('setLastFeedback', { lastFeedback })
      context.dispatch('saveIntoLStorage', { lastFeedback })
    },
    setUnit(context, { unit }) {
      context.commit('setUnit', { unit })
      context.dispatch('saveIntoLStorage', { unit })
    },
    watchPosition(context) {
      if ('geolocation' in navigator) {
        navigator.geolocation.watchPosition(position => {
          context.commit('userPosition', { position })
        }, () => {
          // context.commit('userPosition', { position: null })
        }, { maximumAge: 15000, timeout: 5000, enableHighAccuracy: true })
      }
    },
    setPositionWatch(context, { positionWatch }) {
      if (positionWatch && !context.state.positionWatch) context.dispatch('watchPosition')
      context.commit('setPositionWatch', { positionWatch })
      context.dispatch('saveIntoLStorage', { positionWatch  })
    },
    restoreStore(context) {
      Object.keys(context.state).forEach(key => {
        context.dispatch('getFromLStorage', { key })
      })
    },
    sendFeedback(context, feedback) {
      console.log('Feedback > ', feedback)
      Vue.http.post(`http://localhost:4500/${feedback.type}`, feedback) // TODO
      console.error('feedback server not set')
    },
    syncTime(context) {
      setInterval(() => {
        context.commit('setTimeToNow')
      }, 1000)
    },
    dissmissFirstRun(context) {
      context.commit('dissmissFirstRun')
      context.dispatch('saveIntoLStorage', { firstRun: false  })
    }
  }
}
