// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import 'vue-awesome/icons/sign-out'
import 'vue-awesome/icons/sign-in'
import 'vue-awesome/icons/chevron-left'
import 'vue-awesome/icons/chevron-right'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: xGOOGLEKEYx,
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
