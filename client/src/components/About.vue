<template>
  <div id="about" class="my-section about-section">
    <div class="container">
      <div class="text-container">
        <div class="title-container">
          <p class="title is-1">NEXTT</p>
        </div>
        <div class="sponsors">
          <img src="static/logos/un.png" class="logo">
          <img src="static/logos/lincoln.png" class="city-logo">
          <img src="static/logos/ohio.png" class="ohio-logo">
          <img src="static/logos/gt.png" class="long-logo">
          <img src="static/logos/ub.png" class="ub-logo">
          <img src="static/logos/nsf.png" class="logo">
          <img src="static/logos/usignite.png" class="long-logo">
        </div>
        <div class="content">
          <p>The NEXTT pilot testbed is a novel, Cloud-Radio Access Network (C-RAN)-based experimental wireless network. The testbed contains three major components: Software Defined Distribution Units (SD-DU) (a.k.a Cognitive Remote Radio Heads), fiber Ethernet-based fronthaul network, and cloud-based baseband processing and data storage. Currently, there are 5 SD-DUs deployed at 4 buildings on UNL campus and 1 street light in Lincoln city. Via Fiber Ethernet-based fronthaul network, these SD-DUs are connected to Holland Computing Center (HCC), where baseband processing and data storage are taken place. The core of SD-DU is a high-end 4x4 MIMO Software Defined Radio (SDR) Transceiver, Ettus N310, which can be tuned to any sub-6GHz frequency. The NEXTT pilot testbed allows researchers to access its radio sites and computing resources remotely.</p>
        </div>
      </div>
      <div class="image-container has-text-centered">
        <img src="https://github.com/jianghengle/nextt/raw/master/client/static/images/concept.png" class="concept-image">
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'about',
  data () {
    return {
      data: '',
    }
  }
}
</script>

<style lang="scss" scoped>

.about-section {
  padding-top: 100px;
  padding-bottom: 100px;
}

.title-container {
  margin-bottom: 10px;
}

.text-container {
  margin: auto;
  max-width: 800px;
}

.image-container {
  overflow-x: auto;
}

.concept-image {
  width: 800px;
}

.sponsors {
  width: 370px;
  float: right;
  text-align: left;
}

.logo {
  width: 100px;
}

.ohio-logo {
  width: 70px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.city-logo {
  width: 190px;
}

.ub-logo {
  width: 100px;
  margin-left: 3px;
  margin-right: 10px;
  position: relative;
  top: -10px;
}

.long-logo {
  width: 150px;
}
</style>
