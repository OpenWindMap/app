let convertVm // Singleton

export default {
  install(Vue, options = {}) {
    const defaultConfig = {
      availableUnits: { kpmh: 'kpmh' },
      defaultUnit: 'kpmh',
      unitVmMixin: {},
      conversions: {
        kpmh: v => v
      }
    }

    options = Object.assign(defaultConfig, options)

    convertVm = new Vue({
      created() {
        this.available = options.availableUnits
      },
      data: {
        current: options.defaultUnit
      },
      mixins: [options.unitVmMixin],
      computed: {
        currentLabel() {
          return this.available[this.current]
        }
      }
    })

    Vue.config.availableUnits = options.availableUnits

    Object.defineProperty(Vue.config, 'unit', {
      enumerable: true,
      configurable: true,
      get: () => {
        return convertVm.current
      },
      set: val => {
        convertVm.current = val
      }
    })

    // Override the main init sequence. This is called for every instance.
    const init = Vue.prototype._init
    Vue.prototype._init = function (options = {}) {
      const root = options._parent || options.parent || this
      // Expose convertVm to every instance.
      this.$convert = root.$convert || convertVm
      init.call(this, options)
    }

    // Override the main destroy sequence to destroy all convertVm watchers.
    const destroy = Vue.prototype._destroy
    Vue.prototype._destroy = function () {
      this.$convert = null
      destroy.apply(this, arguments)
    }

    Vue.$conversions = options.conversions

    Vue.prototype.$getvalue = function (value) {
      return Vue.$conversions[Vue.config.unit].apply(this, arguments)
    }
  }
}
