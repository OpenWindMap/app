import Vue from 'vue'

Object.values = object => Object.keys(object).map(key => object[key])
Object.entries = object => Object.keys(object).map(key => [key, object[key]])

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
    currentTime: 0
  },

  getters: {
    getName(state) {
      return id => id in state.renames ? state.renames[id] : undefined
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
        Vue.set(state, key, value || state[key])
      })
    },
    pushMapControls(state, { zoom, center }) {
      state.zoom = zoom
      state.center = center
    },
    setTimeToNow(state) {
      console.log('Time set')
      state.currentTime = (new Date()).getTime()
    },
    setLang(state, { lang }) {
      state.lang = lang
      Vue.config.language = state.lang
    },
    setUnit(state, { unit }) {
      state.unit = unit
      Vue.config.unit = state.unit
    }
  },

  actions: {
    rotateUnit(context) {
      context.commit('rotateUnit')
      context.dispatch('saveIntoLStorage', { unit: context.state.unit })
    },
    saveIntoLStorage(context, object) {
      Object.entries(object).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value))
      })
    },
    getFromLStorage(context, { key }) {
      const value = JSON.parse(localStorage.getItem(key))
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
    setUnit(context, { unit }) {
      context.commit('setUnit', { unit })
      context.dispatch('saveIntoLStorage', { unit })
    },
    restoreStore(context) {
      Object.keys(context.state).forEach(key => {
        context.dispatch('getFromLStorage', { key })
      })
    },
    syncTime(context) {
      setInterval(() => {
        context.commit('setTimeToNow')
      }, 1000)
    }
  }
}
