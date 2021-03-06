<template>
  <div class="content">
    <h4 class="title is-3">{{pdfTitle}}
      <a :href="pdfUri" class="button is-text" download>link</a>
    </h4>
    <canvas id="the-canvas"></canvas>
    <div class="field has-addons has-addons-centered page-buttons">
      <p class="control">
        <a class="button is-medium" @click="previousPage" :disabled="page == 1 || rendering">
          <icon name="chevron-left"></icon>
        </a>
      </p>
      <p class="control">
        <input class="input is-medium page-input" type="text" placeholder="Page Number" v-model="pageLabel" @blur="setPage" @keyup.enter="setPage">
      </p>
      <p class="control">
        <a class="button is-medium" @click="nextPage" :disabled="!numPages || page == numPages || rendering">
          <icon name="chevron-right"></icon>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import pdfjsLib from 'pdfjs-dist'

export default {
  name: 'pdf-slide',
  props: ['pdfUri', 'pdfTitle'],
  data () {
    return {
      pdf: null,
      page: 1,
      numPages: null,
      rendering: false,
      timeoutId: null,
      pageLabel: ''
    }
  },
  watch: {
    page: function (val) {
      this.pageLabel = this.page + '/' + this.numPages
    },
    numPages: function (val) {
      this.pageLabel = this.page + '/' + this.numPages
    },
  },
  methods: {
    renderPage () {
      var vm = this
      vm.rendering = true
      vm.pdf.getPage(vm.page).then(function(page) {
        var el = document.getElementById('docs-container')
        var windowWidth = el.offsetWidth
        var containerWidth = windowWidth - 264
        if(windowWidth <= 768){
          containerWidth = windowWidth
        }
        var canvas = document.getElementById('the-canvas')
        var context = canvas.getContext('2d')

        var viewport = page.getViewport(1)
        var scale = containerWidth / viewport.width

        viewport = page.getViewport(scale)
        canvas.height = viewport.height
        canvas.width = viewport.width

        var renderContext = {
          canvasContext: context,
          viewport: viewport
        }

        page.render(renderContext).then(function(){
          vm.rendering = false
        })
      })
    },
    handleResize () {
      var vm = this
      if(!vm.timeoutId){
        vm.timeoutId = setTimeout(function(){
          if(!vm.rendering){
            vm.renderPage()
          }
          vm.timeoutId = null
        }, 500)
      }
    },
    previousPage () {
      if(this.page == 1 || this.rendering){
        return
      }
      this.page -= 1
      this.renderPage()
    },
    nextPage () {
      if(!this.numPages || this.page == this.numPages || this.rendering){
        return
      }
      this.page += 1
      this.renderPage()
    },
    setPage () {
      var page = parseInt(this.pageLabel)
      if(isNaN(page) || page < 1 || !this.numPages || page > this.numPages || this.rendering || page == this.page){
        this.pageLabel = this.page + '/' + this.numPages
      }else{
        this.page = page
        this.pageLabel = this.page + '/' + this.numPages
        this.renderPage()
      }
    }
  },
  mounted () {
    var vm = this
    pdfjsLib.getDocument(vm.pdfUri).then(function(pdf) {
      vm.pdf = pdf
      vm.numPages = pdf.numPages
      vm.renderPage()
      window.addEventListener('resize', vm.handleResize)
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  }
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

.page-input {
  width: 80px;
}

</style>
