// This component is a copy of the vue2-leaflet's utils functions

export const eventsBinder = (vueElement, leaflet, events) => {
  for (let i = 0; i < events.length; i++) {
    const exposedName = 'l-' + events[i]
    const eventName = events[i]
    leaflet.on(eventName, ev => {
      vueElement.$emit(exposedName, ev)
    })
  }
}

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1)

export const propsBinder = (vueElement, leafletElement, props, options) => {
  const keys = Object.keys(props)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const setMethodName = 'set' + capitalizeFirstLetter(key)
    const deepValue = props[key].type === Object
    if (props[key].custom) {
      vueElement.$watch(key, (newVal, oldVal) => {
        vueElement[setMethodName](newVal, oldVal)
      }, {
        deep: deepValue
      })
    } else {
      vueElement.$watch(key, (newVal, oldVal) => {
        leafletElement[setMethodName](newVal)
      }, {
        deep: deepValue
      })
    }
  }
}
