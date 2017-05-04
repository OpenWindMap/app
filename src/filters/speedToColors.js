import Vue from 'vue'

export const palette = [
  'rgb(255, 255, 255)',
  'rgb(  0, 255, 255)',
  'rgb(  3, 230, 175)',
  'rgb(  5, 204,  95)',
  'rgb(  8, 179,  15)',
  'rgb( 88, 204,  10)',
  'rgb(168, 228,   5)',
  'rgb(248, 253,   0)',
  'rgb(255, 228,   0)',
  'rgb(255, 198,   0)',
  'rgb(255, 168,   0)',
  'rgb(255, 115,   0)',
  'rgb(255,  60,   0)',
  'rgb(255,   5,   0)',
  'rgb(204,   0,  41)',
  'rgb(148,   0,  87)'
]

export default Vue.filter('speedToColors', speed => {
  const i = Math.floor(speed / 5)
  return palette[i > 15 ? 15 : i]
})
