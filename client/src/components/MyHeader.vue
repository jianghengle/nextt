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
            <a class="navbar-item" @click="scrollTo('about')">
              About
            </a>
            <a class="navbar-item" @click="scrollTo('status')">
              Status
            </a>
            <a class="navbar-item" @click="scrollTo('team')">
              Team
            </a>
            <a class="navbar-item" @click="scrollTo('contact')">
              Contact
            </a>
          </div>
          <div class="navbar-end">
            <router-link class="navbar-item" :to="'/docs'" :class="{'is-active': routePath == '/docs'}">
              Docs
            </router-link>
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <a class="button is-link">
                    <icon name="sign-in"></icon>&nbsp;
                    Sign In
                  </a>
                </p>
              </div>
            </div>
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
    }
  },
  computed: {
    routePath () {
      return this.$route.path
    },
  },
  methods: {
    scrollTo(id){
      if(this.routePath != '/'){
        this.$router.push('/')
      }
      this.$nextTick(function () {
        var el = document.getElementById(id)
        window.scroll(0, (el.offsetTop - 84))
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
