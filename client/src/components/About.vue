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
          <vue-markdown :source="introduction"></vue-markdown>
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
import VueMarkdown from 'vue-markdown'

export default {
  name: 'about',
  components: {
    VueMarkdown
  },
  data () {
    return {
      introduction: '',
    }
  },
  mounted () {
    this.$http.get(xSTATICx + 'docs/introduction.md').then(response => {
      this.introduction = response.data
    }, response => {
      console.log('failed to get intro md')
    })
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
