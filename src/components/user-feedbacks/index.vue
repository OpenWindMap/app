<template>
  <div class="column feedbacks" v-if="!closed">
    <button class="delete" @click="close"></button>
    <template v-if="!answered">
      <h5>
        <translate>Are you nearby?</translate>
        {{ question.text }}
      </h5>
      <div class="field has-addons" v-if="!answered">
        <p class="control">
          <a class="button is-small is-info" @click="() => answer('underestimated')">
            <translate>Underestimated</translate>
          </a>
        </p>
        <p class="control">
          <a class="button is-small is-success" @click="() => answer('ok')">
            <translate>Perfect</translate>
          </a>
        </p>
        <p class="control">
          <a class="button is-small is-warning" @click="() => answer('overestimated')">
            <translate>Overestimated</translate>
          </a>
        </p>
      </div>
    </template>
    <template v-else>
      <translate tag="h5">
        Which value will fit your thoughts better?
      </translate>
      <div :class="['field has-addons', hilights.indexOf(que.id) == -1 ? 'is-secondary is-disabled' : '' ]"
        v-for="que in questions">
        <p class="control">
          <label class="label" @click="hilight(que)">{{ que.abbr }}</label>
        </p>
        <p class="control">
          <a class="button is-small is-info" @click="() => (hilight(que), changeValue(que, -5))">
            <span>-5</span>
          </a>
        </p>
        <p class="control">
          <a class="button is-small is-success" @click="() => (hilight(que), changeValue(que, -1))">
            <span>-1</span>
          </a>
        </p>
        <p class="control">
          <input type="input" class="input" :value="values[que.id]" @click="(evt) => (hilight(que), targetInput(evt))"/>
        </p>
        <p class="control">
          <a class="button is-small is-warning" @click="() => (hilight(que), changeValue(que, 1))">
            <span>+1</span>
          </a>
        </p>
        <p class="control">
          <a class="button is-small is-danger" @click="() => (hilight(que), changeValue(que, 5))">
            <span>+5</span>
          </a>
        </p>
      </div>
      <p class="control">
        <a class="button is-small is-primary is-outlined is-inverted" @click="() => (send(), close())">
          <translate>Send it and close</translate>
        </a>
      </p>
    </template>
  </div>
  <div class="column feedbacks-opener" v-else>
    <a class="button is-link" @click="() => (reset(), open())">
      <translate tag="small">
        Are you nearby?
      </translate>
    </a>
  </div>
</template>

<script lang="buble">
export default {
  name: 'user-feedbacks',

  props: {
    station: {
      Type: Object,
      required: true
    }
  },

  data() {
    return {
      closed: true,
      current: 0,
      answered: false,
      hilights: [],
      values: {
        wind_speed_min: undefined, // eslint-disable-line camelcase
        wind_speed_avg: undefined, // eslint-disable-line camelcase
        wind_speed_max: undefined // eslint-disable-line camelcase
      }
    }
  },

  computed: {
    questions() {
      return [
        { id: 'wind_speed_min', abbr: this.$gettext('MIN'), text: this.$gettext('What is your feeling about the wind measurement?') },
        { id: 'wind_speed_avg', abbr: this.$gettext('AVG'), text: this.$gettext('What is your feeling about the wind measurement?') },
        { id: 'wind_speed_max', abbr: this.$gettext('MAX'), text: this.$gettext('What is your feeling about the wind measurement?') }
      ]
    },
    question() {
      return this.questions[this.current]
    },
    lastFeedback() {
      return this.$store.state.user.lastFeedback
    }
  },

  watch: {
    station() {
      this.reset()

      if (this.lastFeedback === undefined || (Date.now() - this.lastFeedback) / 1000 >= 20) {
        setTimeout(() => {
          this.open()
        }, 1500)
      }
    }
  },

  methods: {
    reset() {
      Object.assign(this.$data, this.$options.data.apply(this))
      this.start()
    },

    start() {
      if (!this.station.measurements) return

      this.questions.forEach(question => {
        this.values[question.id] = this.$getvalue(this.station.measurements[question.id])
      })

      this.chooseQuestion()
    },

    open() {
      this.closed = false
    },

    close() {
      this.closed = true

      if (!this.answered) {
        this.$store.dispatch('user/setLastFeedback', { lastFeedback: Date.now() })
      }
    },

    toggle() {
      this.closed = !this.closed
    },

    answer(value) {
      if (value) {
        this.$store.dispatch('user/sendFeedback', {
          date: Date(),
          type: 'feeling',
          station: {
            id: this.station.id,
            location: {
              latitude: this.station.location.latitude,
              longitude: this.station.location.longitude
            }
          },
          user: {
            location: {
              latitude: this.$store.state.user.position ? this.$store.state.user.position.latitude : undefined,
              longitude: this.$store.state.user.position ? this.$store.state.user.position.longitude : undefined
            }
          },
          feedback: {
            measurement: this.question.id,
            value: this.station.measurements[this.question.id],
            feeling: value
          }
        })
      }

      this.answered = true

      if (value === 'ok') {
        this.close()
      }

      this.hilight(this.question)
    },

    hilight(question) {
      this.hilights.push(question.id)
    },

    targetInput(evt) {
      evt.target.scrollIntoView()
    },

    changeValue(question, value) {
      this.values[question.id] = Math.round(this.values[question.id] + value)
      if (this.values[question.id] < 0) {
        this.values[question.id] = 0
      }
    },

    chooseQuestion() {
      // this.current = Math.floor(Math.random() * this.questions.length)
      this.current = 1
    },

    send() {
      this.questions.forEach(question => {
        if (this.values[question.id] !== (this.$getvalue(this.station.measurements[question.id]))) {
          this.$store.dispatch('user/sendFeedback', {
            date: Date(),
            type: 'values',
            station: {
              id: this.station.id,
              location: this.station.location
            },
            user: {
              location: this.$store.state.user.position ? this.$store.state.user.position : {}
            },
            feedback: {
              measurement: question.id,
              value: this.station.measurements[question.id],
              unitValue: this.$getvalue(this.station.measurements[question.id]),
              unit: this.$convert.current,
              userValue: this.values[question.id]
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~src/assets/vars";

  .column.feedbacks {
    padding: 8px;
    margin: 0;
    background: $light;
  }
  .column.feedbacks-opener {
    margin: 0 0.75rem;
    margin-top: -0.75rem;
    text-align: right;
  }

  .field {
    margin: 0;

    &.is-secondary {
      opacity: 0.4;
    }
  }

  .control {
    flex: 1;
    margin: 5px;
    margin-bottom: 5px !important;

    a.button {
      width: 100%;
    }

    input.input {
      height: 27px;
      text-align: center;
    }

    label.label {
      font-size: 0.9rem;
      text-align: center;
      height: 100%;
      line-height: 2;
      vertical-align: middle;
    }
  }

  .delete {
    float: right;
    height: 26px;
    max-height: 26px;
    max-width: 26px;
    min-height: 26px;
    min-width: 26px;
    width: 26px;
  }
</style>
