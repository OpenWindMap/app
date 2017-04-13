<template lang="html">
  <section>
    <history-chart :data="data" style="height: 180px;"></history-chart>
  </section>
</template>

<script lang="buble">
import historyChart from '@/components/history-chart'

export default {
  name: 'more-view',

  components: { historyChart },

  computed: {
  },

  data() {
    return {
      data: []
    }
  },

  mounted() {
    const start = new Date(new Date().getTime() - (3 * 3600 * 1000)).toISOString()
    this.$http.get(`archive/614?start=${start}&stop=now`).then(({ body }) => {
      this.data = body.data
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
