<template>
  <div>
    <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <a href="https://nebraska.edu/"><img src="static/logos/un.png" width="150"></a>
        <a href="https://www.nsf.gov/"><img src="static/logos/nsf.png" width="150"></a>
        <a href="https://www.osu.edu/"><img src="static/logos/ohio.png" width="135" class="ohio-logo"></a>
        <a href="http://www.lincoln.ne.gov/"><img src="static/logos/lincoln.png" width="250"></a>
        <a href="https://www.us-ignite.org/"><img src="static/logos/usignite.png" width="250" class="usignite-logo"></a>
      </p>
    </div>
  </footer>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'my-footer',
}
</script>

<style lang="scss" scoped>

.ohio-logo {
  margin-left: 20px;
  margin-right: 10px;
}

.usignite-logo {
  position: relative;
  top: -10px;
}

</style>
