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
            <pdf-slide :pdfUri="manual.uri" :pdfTitle="manual.title"></pdf-slide>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import PdfSlide from './PdfSlide'

export default {
  name: 'docs',
  components: {
    PdfSlide,
    VueMarkdown
  },
  data () {
    return {
      manual: {
        uri: xSTATICx + 'docs/manual.pdf',
        title: 'NEXTT Research User Manual',
      },
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

.anchor {
  display: block;
  position: relative;
  top: -84px;
  visibility: hidden;
}

</style>
