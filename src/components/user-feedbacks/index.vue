<template lang="html">
  <div class="column feedbacks" v-if="!closed">
    <button class="delete" @click="close"></button>
    <template v-if="!answered">
      <h5>
        {{ question.text }}
      </h5>
      <div class="field has-addons" v-if="!answered">
        <p class="control">
          <a class="button is-small is-info" @click="() => answer('under')">
            <span>Sous estimée</span>
          </a>
        </p>
        <p class="control">
          <a class="button is-small is-success" @click="() => answer('ok')">
            <span>Bonne</span>
          </a>
        </p>
        <p class="control">
          <a class="button is-small is-warning" @click="() => answer('upper')">
            <span>Sur estimée</span>
          </a>
        </p>
      </div>
      </template>
      <template v-else>
      <h5>
        Quelle valeur vous semblerait plus juste ?
      </h5>
      <div :class="['field has-addons', hilights.indexOf(que.id) == -1 ? 'is-secondary is-disabled' : '' ]"
        v-for="que in questions">
        <p class="control">
          <label class="label" @click="hilight(que)">{{ que.min }}</label>
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
          <input type="input" class="input" :value="que.value" @click="(evt) => (hilight(que), targetInput(evt))"/>
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
          <span>Envoyer</span>
        </a>
      </p>
    </template>
  </div>
  <div class="column feedbacks-opener" v-else>
    <a class="button is-link is-small" @click="() => (reset(), answer(), open())">
      Ces valeurs vous semblent incorectes ? ({{ distance }}m)
    </a>
  </div>
</template>

<script lang="buble">
import geodist from 'geodist'

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
      questions: [
        { id: 'wind_speed_min', min: 'MIN', text: 'Comment estimez vous cette mesure du vent min ?', value: undefined },
        { id: 'wind_speed_avg', min: 'AVG', text: 'Comment estimez vous cette mesure du vent moy ?', value: undefined },
        { id: 'wind_speed_max', min: 'MAX', text: 'Comment estimez vous cette mesure du vent max ?', value: undefined }
      ]
    }
  },

  computed: {
    question() {
      return this.questions[this.current]
    },
    lastFeedback() {
      return this.$store.state.user.lastFeedback
    },
    distance() {
      const station = this.station.location
      const user = this.$store.state.user.position
      return user && station ? geodist(station, user, { unit: 'meters' }) : undefined
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
        question.value = this.$getvalue(this.station.measurements[question.id])
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
        console.log(
          Date.now(),
          this.station.id,
          this.station.location.latitude,
          this.station.location.longitude,
          this.$store.state.user.position ? this.$store.state.user.position.latitude : undefined,
          this.$store.state.user.position ? this.$store.state.user.position.longitude : undefined,
          this.question.id,
          this.station.measurements[this.question.id],
          value
        )
      }

      this.answered = true
      this.hilight(this.question)
    },

    hilight(question) {
      this.hilights.push(question.id)
    },

    targetInput(evt) {
      evt.target.scrollIntoView()
    },

    changeValue(question, value) {
      question.value += value
    },

    chooseQuestion() {
      this.current = Math.floor(Math.random() * this.questions.length)
    },

    send() {
      this.questions.forEach(question => {
        if (question.value !== this.$getvalue(this.station.measurements[question.id])) {
          console.log(
            Date.now(),
            this.station.id,
            this.station.location.latitude,
            this.station.location.longitude,
            this.$store.state.user.position ? this.$store.state.user.position.latitude : undefined,
            this.$store.state.user.position ? this.$store.state.user.position.longitude : undefined,
            question.id,
            this.$getvalue(this.station.measurements[question.id]),
            question.value,
            this.$convert.current
          )
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
    background: $dark;
  }
  .column.feedbacks-opener {
    margin-top: -0.75rem;
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
