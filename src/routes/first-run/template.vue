<template>
  <section class="section">
    <div class="container">
        <translate tag="h5" class="title is-5">Welcome to OpenWindMap!</translate>

        <translate tag="p">We're building an open-source wind measurement network.</translate>

        <translate tag="p">For almost 10 years, our members have deployed hundreds of stations across Europe.</translate>

        <translate tag="p">Unlike many other networks, our data is open, free and reusable by all. This is the essence of the project. Because weather cannot exist without sharing.</translate>

        <translate tag="p">You can help us by setting up your own station, giving feedback, contributing to software development and many other ways... Visit our discussion forum.</translate>

        <translate tag="p">We hope you will enjoy our work and that it will be of great service to you.</translate>

        <translate tag="p">I wish you all the wind!</translate>
        <p><i><translate tag="small">Nicolas, founder of OpenWindMap</translate></i></p>
    </div>
    <div class="fixed-bottom">
      <p><translate tag="strong">To start, navigate the tabs below :</translate></p>

    </div>
  </section>
</template>

<script lang="buble">
export default {
  name: 'first-run-view',

  data() {
    return {
    }
  },

  computed: {
  },

  watch: {
  },

  activated() {
  },

  deactivated() {
    this.$store.dispatch('user/dissmissFirstRun')
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
  p {
    margin-top: 10px;
  }
  .fixed-bottom {
    display: block;
    position: fixed;
    bottom: 60px;
    width: 100%;
    background-color: white;
    padding-bottom: 10px;
  }
</style>
