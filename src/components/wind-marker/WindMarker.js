import L from 'leaflet'

const windIcon = L.divIcon({
  iconSize: [26, 48],
  popupAnchor: [1, -10],
  iconAnchor: [13, 12]
})

export const WindMarker = L.Marker.extend({
  options: {
    speed: 0,
    heading: 0,
    title: '',
    icon: windIcon
  },

  _setPos(pos) {
    L.Marker.prototype._setPos.call(this, pos)

    this._icon.style.background = 'url("/img/map-wind-icon.png")'
    this._icon.style.border = 'none'

    this.setSpeed(this.options.speed)
    this.setHeading(this.options.heading)
    this.setTitle(this.options.title)
  },

  setSpeed(speed) {
    let colorIndex = Math.floor(speed / 5)
    colorIndex = (colorIndex > 15) ? 15 : colorIndex
    const colorX = -colorIndex * 26

    this._icon.style['background-position'] = colorX + 'px 0px'
  },
  setHeading(heading) {
    const rotate = 'rotate(' + heading + 'deg)'

    this._icon.style[L.DomUtil.TRANSFORM] += ' ' + rotate
    this._icon.style[L.DomUtil.TRANSFORM + '-origin'] = '13px 10px'
  },
  setTitle(title) {
    this._icon.title = title
  }
})

export const windMarker = function (pos, options) {
  return new WindMarker(pos, options)
}

export default WindMarker
