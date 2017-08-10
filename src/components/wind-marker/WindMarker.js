import L from 'leaflet'
import filters from '@/filters'

const windIcon = L.divIcon({
  iconSize: [25, 35],
  popupAnchor: [1, -10],
  iconAnchor: [12.5, 4.5]
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

    this._icon.style.border = 'none'
    this._icon.style.background = 'rgba(0, 0, 0, 0)'

    const rotate = 'rotate(' + this.options.heading + 'deg)'
    this._icon.style[L.DomUtil.TRANSFORM] += ' ' + rotate
    this._icon.style[L.DomUtil.TRANSFORM + '-origin'] = '12.5px 4.5px'

    this._icon.title = this.options.title

    this._icon.innerHTML = `<svg width="25px" height="35px" style="background: rgba(0,0,0,0);">
      <defs>
        <filter id="f3" x="0" y="0" width="100%" height="100%">
          <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="1.5" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <polygon stroke="black" stroke-width="0.5" strock-linecap="round" filter="url(#f3)" points="22,9.75 12.5,30 3,9.75 12.5,14.75" fill="${filters.speedToColors(this.options.speed)}" />
      <circle cx="12.5" cy="5" r="4.5" fill="#222"/>
    </svg>`

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
