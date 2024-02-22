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
  'rgb(148,   0,  87)',
  'rgb(138,   0,  94)',
  'rgb(122,   0,  98)',
  'rgb(107,   0,  99)',
  'rgb( 87,   0,  92)',
  'rgb( 72,   0,  87)',
  'rgb( 60,   0,  87)',
  'rgb( 52,   0,  82)',
  'rgb( 40,   0,  77)',
  'rgb( 27,   0,  66)',
  'rgb( 17,   0,  36)',
  'rgb(  8,   0,  46)',
  'rgb(  2,   0,  31)',
  'rgb(  0,   0,   0)'
]

const count = palette.length

export const speedToColorsFilter = Vue.filter('speedToColors', speed => {
  const i = Math.floor(speed / 5)
  return palette[i > count ? count : i]
})

export const speedToColorsFilter2 = Vue.filter('speedToColors2', speed => {
  const i = Math.floor(speed / 5)
  if (i == 0) return ''
  return palette[i > count ? count : i]
})
