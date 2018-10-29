<template>
  <div>
    <about/>
    <status/>
    <team/>
    <contact/>
  </div>
</template>

<script>
import Vue from 'vue'
import About from './About'
import Status from './Status'
import Team from './Team'
import Contact from './Contact'

export default {
  name: 'my-main',
  components: {
    About,
    Status,
    Team,
    Contact
  },
  data () {
    return {
      data: '',
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
