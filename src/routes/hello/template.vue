<template>
  <div>
    <h1 class="title is-1">
      <translate>Hello %{ name } !!!</translate>
    </h1>
    <h1 class="subtitle is-2">
      <translate :translate-n="count" translate-plural="%{ count } cars">%{ count } car</translate>
    </h1>


    <demo-input></demo-input>
  </div>
</template>

<script>
import DemoInput from '@/components/demo-input'

export default {
  name: 'hello-view',
  data() {
    return {
      name: this.$gettext('World'),
      count: 3
    }
  },
  components: {
    DemoInput
  }
}
</script>

<style lang="css">
</style>
