<template>
  <div>
    <input type="text" v-model="message">
    <span>{{ message }}</span>
  </div>
</template>

<script>
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
