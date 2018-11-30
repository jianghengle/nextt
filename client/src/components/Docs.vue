<template>
  <div class="my-section">
    <div id="docs-container" class="container docs-container">
      <div class="columns">
        <div class="column">
          <aside class="menu sider-bar">
            <p class="menu-label">
              Tutorials
            </p>
            <ul class="menu-list">
              <li>
                <a @click="scrollToElement('getStarted')">Get Started</a>
              </li>
            </ul>
            <p class="menu-label">
              Lectures
            </p>
            <ul class="menu-list">
              <li>
                <a @click="scrollToElement('manual')">NEXTT Research User Manual</a>
              </li>
            </ul>
          </aside>
        </div>
        <div class="column main-container">

          <div id="getStarted" class="first-sub-section content">
            <vue-markdown :source="getStarted"></vue-markdown>
          </div>

          <hr />
          
          <div id="manual" class="other-sub-section">
            <h4 class="title is-3">NEXTT Research User Manual
              <a href="https://docs.google.com/presentation/d/e/2PACX-1vRhhF88xfiTUtSKStxH_sRFo_I7ejLn1gpMTXSzO8-yZ8f5zX5nbQ7JZ07ABlIqjFZGpLF3O8V9MR8L/pub?start=false&loop=false&delayms=3000" class="button is-text" download>link</a>
            </h4>
            <div class="aspect-ratio">
              <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRhhF88xfiTUtSKStxH_sRFo_I7ejLn1gpMTXSzO8-yZ8f5zX5nbQ7JZ07ABlIqjFZGpLF3O8V9MR8L/embed?start=false&loop=false&delayms=3000" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'docs',
  components: {
    VueMarkdown
  },
  data () {
    return {
      getStarted: ''
    }
  },
  
  methods: {
    scrollToElement(id){
      var el = document.getElementById(id)
      window.scroll({left: 0, top: el.offsetTop, behavior: 'smooth'})
    }
  },
  mounted () {
    this.$http.get(xSTATICx + 'docs/tutorial.md').then(response => {
      this.getStarted = response.data
    }, response => {
      console.log('failed to get md')
    })
  },
}
</script>

<style lang="scss" scoped>

.docs-container {
  margin-top: 50px;
  margin-bottom: 50px;
}

.sider-bar {
  width: 240px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
}

.main-container {
  width: calc(100% - 300px);
}

.first-sub-section {
  margin-top: 10px;
  margin-bottom: 50px;
}

.other-sub-section {
  margin-top: 50px;
  margin-bottom: 50px;
}

.aspect-ratio {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 61%;
}

.aspect-ratio iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0; top: 0;
}

</style>
