<template lang="html">
  <section>
    <div class="columns">
      <div class="column">
        <div class="card" style="box-shadow: initial;">
          <header class="card-header">
            <div class="is-clearfix is-fullwidth">
              <div class="is-pulled-left title is-5">
                <strong>{{pioupiou.meta.name || `Pioupiou sans nom`}}</strong> <br>
                <small>#{{pioupiou.id}}</small>
              </div>
              <div class="is-pulled-right title is-6">
                <small>11:21</small>
              </div>
            </div>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="is-fullwidth has-text-centered title is-3">
                <i class="typcn typcn-location-arrow-outline compass-north-west" style="font-size: 25vw;"></i>
                <br>
                <small>35 Km/h</small>
              </div>
              <br>
              <hr>
              <br>

              <figure>
                <img src="" alt="">
                <div class="direction">
                  <i class="typcn typcn-location-arrow compass-west"></i>
                  &nbsp;
                  <i class="typcn typcn-location-arrow compass-north-west"></i>
                  &nbsp;
                  <i class="typcn typcn-location-arrow compass-north"></i>
                  &nbsp;
                  <i class="typcn typcn-location-arrow compass-north"></i>
                  &nbsp;
                  <i class="typcn typcn-location-arrow compass-west"></i>
                  &nbsp;
                  <i class="typcn typcn-location-arrow compass-north-west"></i>
                  &nbsp;
                  <i class="typcn typcn-location-arrow compass-south"></i>
                  &nbsp;
                  <i class="typcn typcn-location-arrow compass-south"></i>
                  &nbsp;
                  <i class="typcn typcn-location-arrow compass-south-west"></i>
                  &nbsp;
                  <i class="typcn typcn-location-arrow compass-west"></i>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="buble">
export default {
  name: 'details-view',

  props: ['id'],

  data() {
    return {}
  },

  computed: {
    pioupiou() {
      return this.$store.getters['pioupious/get'](this.id)
    }
  },

  mounted() {
    console.log(this.id)
    this.$store.dispatch('pioupious/fetchOne', { stationId: this.id })
  }
}
</script>

<style lang="scss" scoped>
  .card-header {
    padding: 6px 12px;
  }

  .card-content {
    padding: 0.4rem;
  }

  .direction {
    margin-top: 7px;
  }

  figure img {
    height: 50px;
    width: 100%;
  }

  .column {
    padding: 0.75rem 0;
  }

  .columns {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  .card-header {
    box-shadow: initial;
  }

  .card-header .is-pulled-right {
    line-height: 1.8rem;
  }

  .subtitle.is-5 {
    font-size: 1.23rem;
  }

  .typcn {
      font-size: 21px;
      text-align: center;
      vertical-align: top;
  }

  .card-header .typcn {
    font-size: 1.8rem;
    display: inline-block;
  }

  figure .typcn {
    font-size: inherit;
    display: inline-block;
  }

  figure .direction {
    margin-top: -7px;
    margin-bottom: 15px;
    font-size: 5.5vw;
    text-align: center;
  }
</style>
