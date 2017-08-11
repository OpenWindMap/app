import L from 'leaflet'
import filters from '@/filters'

const windIcon = L.divIcon({
  // iconSize: [25, 30],
  // popupAnchor: [1, -10],
  iconAnchor: [0, 0]
})

export const WindMarker = L.Marker.extend({
  options: {
    speed: 0,
    heading: 0,
    title: '',
    icon: windIcon,
    type: 0
  },

  _setPos(pos) {
    const pointTypes = [
      `<circle cx="5" cy="5" r="5"/>`,
      `<path d="M5,0C2.243,0,0,2.243,0,5c0,2.757,2.243,5,5,5c2.757,0,5-2.243,5-5C10,2.243,7.757,0,5,0z M5,8.333
      	C3.162,8.333,1.667,6.839,1.667,5c0-1.838,1.496-3.333,3.333-3.333c1.839,0,3.333,1.496,3.333,3.333
      	C8.333,6.839,6.839,8.333,5,8.333z"/>`,
      `<rect x="1.464" y="1.464" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -2.0711 5)" width="7.071" height="7.071"/>`,
      `<path d="M5,0L0,5l5,5l5-5L5,0z M2.205,5L5,2.205L7.795,5L5,7.795L2.205,5z"/>`,
      `<polygon points="9.259,7.812 6.447,5 9.259,2.188 7.812,0.741 5,3.553 2.188,0.741 0.741,2.188 3.553,5 0.741,7.812 2.188,9.259
      	5,6.447 7.812,9.259 "/>`,
      `<rect x="1.5" y="1.5" width="7" height="7"/>`,
      `<path d="M1.5,1.5v7h7v-7H1.5z M6.944,6.944H3.056V3.056h3.889V6.944z"/>`,
      `<polygon points="6.022,10 6.023,6.023 10,6.023 10,3.978 6.023,3.977 6.023,0 3.977,0 3.977,3.977 0,3.978 0,6.023 3.977,6.023
      	3.978,10 "/>`,
      `<polygon points="5,1.218 7.184,5.001 9.367,8.782 5,8.781 0.632,8.781 2.817,5.001 "/>`,
      `<path d="M9.604,8.986H0.396L5,1.013L9.604,8.986z M3.011,7.477h3.979L5,4.034L3.011,7.477z"/>`
    ]

    L.Marker.prototype._setPos.call(this, pos)

    this._icon.style.border = 'none'
    this._icon.style.background = 'rgba(0, 0, 0, 0)'

    // let myRotate = this.options.heading
    // setInterval(() => {
    //   myRotate += 1 / Math.PI
    //   const rotate = 'rotate(' + myRotate + 'deg)'
    //   this._icon.style[L.DomUtil.TRANSFORM] += ' ' + rotate
    // }, 500)

    const rotate = 'rotate(' + this.options.heading + 'deg)'
    this._icon.style[L.DomUtil.TRANSFORM] += ' ' + rotate
    this._icon.style[L.DomUtil.TRANSFORM + '-origin'] = '0px 0px'

    this._icon.style.textAlign = 'center'
    this._icon.title = this.options.title

    this._icon.innerHTML = `
      <svg width="26.5" height="28" style="position: absolute; left: -13.25px;">
        <defs>
          <filter id="blur">
            <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="1.5" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>
        <polygon stroke="black" stroke-width="0.5" strock-linecap="round" filter="url(#blur)"
          points="3.75,4 13.25,8 22.75,4 13.25,24" fill="${filters.speedToColors(this.options.speed)}" />
      </svg>
      <svg width="10px" height="10px" style="position: absolute; left: -5px; top: -5px; transform: rotate(-${this.options.heading}deg); -webkit-transform: rotate(-${this.options.heading}deg)">
        <g fill="#222">
          ${pointTypes[this.options.type]}
        </g>
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
  setTypePoint(type) {
    this.options.type = type
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
