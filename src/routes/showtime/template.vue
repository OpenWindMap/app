<template lang="html">
  <section>
    <div class="columns is-mobile is-gapless">
      <div class="column">
        <details-view :id="123"></details-view>
      </div>
      <div class="column">
        <details-view :id="321"></details-view>
      </div>
      <div class="column">
        <details-view :id="132"></details-view>
      </div>
    </div>
  </section>
</template>

<script lang="buble">
import detailsView from '@/routes/details/template'

export default {
  name: 'showtime',

  components: { detailsView }
}
</script>

<style lang="scss" scoped>
</style>
