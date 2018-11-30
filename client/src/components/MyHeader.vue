<template>
  <div>
    <nav class="navbar has-shadow is-fixed-top">
      <div class="container">
        <div class="navbar-brand">
          <router-link class="navbar-item is-size-4 has-text-weight-bold has-text-black" :to="'/'">
            NEXTT
          </router-link>
          <div class="navbar-burger burger app-burger" :class="{'is-active': menuActive}"
            @click="menuActive = !menuActive">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="navbar-menu" :class="{'is-active': menuActive}">
          <div class="navbar-start">
            <a class="navbar-item" @click="scrollTo('about')" :class="{'is-active': currentSection == 'about', 'has-text-link': currentSection == 'about'}">
              About
            </a>
            <a class="navbar-item" @click="scrollTo('status')" :class="{'is-active': currentSection == 'status', 'has-text-link': currentSection == 'status'}">
              Status
            </a>
            <a class="navbar-item" @click="scrollTo('team')" :class="{'is-active': currentSection == 'team', 'has-text-link': currentSection == 'team'}">
              Team
            </a>
            <a class="navbar-item" @click="scrollTo('contact')" :class="{'is-active': currentSection == 'contact', 'has-text-link': currentSection == 'contact'}">
              Contact
            </a>
          </div>
          <div class="navbar-end">
            <router-link class="navbar-item" :to="'/docs'" :class="{'is-active': routePath == '/docs', 'has-text-link': routePath == '/docs'}">
              Docs
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'my-header',
  data () {
    return {
      menuActive: false,
      currentScroll: 0,
      aboutScroll: null,
      statusScroll: null,
      teamScroll: null,
      contactScroll: null
    }
  },
  computed: {
    routePath () {
      return this.$route.path
    },
    currentSection () {
      if(this.routePath != '/')
        return ''
      if(this.aboutScroll != null && this.statusScroll != null && this.currentScroll >= 0 && this.currentScroll < this.statusScroll)
        return 'about'
      if(this.statusScroll != null && this.teamScroll != null && this.currentScroll >= this.statusScroll && this.currentScroll < this.teamScroll)
        return 'status'
      if(this.teamScroll != null && this.contactScroll != null && this.currentScroll >= this.teamScroll && this.currentScroll < this.contactScroll)
        return 'team'
      if(this.contactScroll != null && this.currentScroll >= this.contactScroll)
        return 'contact'
      return ''
    }
  },
  watch: {
    routePath: function (val) {
      this.getScrollPositions()
    },
  },
  methods: {
    scrollTo(id){
      if(this.routePath != '/'){
        this.$router.push('/')
      }
      this.$nextTick(function () {
        var el = document.getElementById(id)
        window.scroll({left:0, top: (el.offsetTop - 84), behavior: 'smooth'})
      })
    },
    getScrollPositions(){
      if(this.aboutScroll == null && this.statusScroll == null && this.teamScroll == null && this.contactScroll == null){
        this.$nextTick(function () {
          var el = document.getElementById('about')
          this.aboutScroll = el ? el.offsetTop : null
          el = document.getElementById('status')
          this.statusScroll = el ? el.offsetTop : null
          el = document.getElementById('team')
          this.teamScroll = el ? el.offsetTop : null
          el = document.getElementById('contact')
          this.contactScroll = el ? el.offsetTop : null
        })
      } 
    }
  },
  mounted () {
    var vm = this
    window.addEventListener("scroll", function (event) {
      vm.currentScroll = this.scrollY
    })
    this.getScrollPositions()
  }
}
</script>

<style lang="scss" scoped>

</style>
