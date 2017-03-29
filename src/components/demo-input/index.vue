<template lang="html">
  <div class="field">
    <p class="control">
      <input class="input" type="text" placeholder="Text input" v-model="message">
    </p>
    <label class="label">{{ message }}</label>
  </div>
</template>

<script lang="buble">
export default {
  data() {
    return {
      message: ''
    }
  }
}
</script>

<style lang="css">
</style>
