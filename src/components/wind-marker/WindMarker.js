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

    this._icon.style.background = 'url("./img/map-wind-icon.png")'
    this._icon.style.border = 'none'

    let colorIndex = Math.floor(this.options.speed / 5)
    colorIndex = (colorIndex > 15) ? 15 : colorIndex
    const colorX = -colorIndex * 26

    this._icon.style['background-position'] = colorX + 'px 0px'

    const rotate = 'rotate(' + this.options.heading + 'deg)'

    this._icon.style[L.DomUtil.TRANSFORM] += ' ' + rotate
    this._icon.style[L.DomUtil.TRANSFORM + '-origin'] = '13px 10px'

    this._icon.title = this.options.title

    return this._icon.title
  },

  setSpeed(speed) {
    this.options.speed = speed
    this.update()
  },
  setHeading(heading) {
    this.options.heading = heading
    this.update()
  },
  setTitle(title) {
    this.options.title = title
    this.update()
  }
})

export const windMarker = function (pos, options) {
  return new WindMarker(pos, options)
}

export default WindMarker
