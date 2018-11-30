<template>
  <div id="app">
    <my-header></my-header>
    <div>
      <router-view></router-view>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import Vue from 'vue'
import MyHeader from './components/MyHeader'
import MyFooter from './components/MyFooter'

export default {
  name: 'app',
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/initial-variables";
$navbar-height: 84px;
@import "~bulma";

.my-section {
  min-height: 300px;
  padding-left: 10px;
  padding-right: 10px;
}

a.anchor {
  display: block;
  position: relative;
  top: -130px;
  visibility: hidden;
}

</style>
