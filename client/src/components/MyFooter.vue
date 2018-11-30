<template>
  <div>
    <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <a href="https://nebraska.edu/"><img src="static/logos/un.png" width="150"></a>
        <a href="http://www.lincoln.ne.gov/"><img src="static/logos/lincoln.png" width="250"></a>
        <a href="https://www.osu.edu/"><img src="static/logos/ohio.png" width="135" class="ohio-logo"></a>
        <a href="https://www.gatech.edu/"><img src="static/logos/gt.png" width="250"></a>
        <a href="https://https://www.buffalo.edu//"><img src="static/logos/ub.png" width="135" class="ub-logo"></a>
        <a href="https://www.nsf.gov/"><img src="static/logos/nsf.png" width="150"></a>
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

.ub-logo {
  margin-bottom: 25px;
  margin-right: 20px;
}

.usignite-logo {
  position: relative;
  top: -10px;
}

</style>
