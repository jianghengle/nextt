<template>
  <div id="status" class="my-section status-section">
    <div class="container">
      <div class="title">
        Status
      </div>
      <gmap-map ref="map"
        :center="{lat: 40.823545, lng: -96.699600}"
        :zoom="15"
        map-type-id="satellite"
        style="width: 100%; height: 600px">
        <gmap-marker
          v-for="(m, i) in markers"
          :key="'m-' + i"
          :position="m.position"
          :label="m.label"
          :icon="m.icon"
          :clickable="true"
          @click="m.infoOpened = true">
        </gmap-marker>
        <gmap-info-window
          v-for="(m, i) in markers"
          :key="'i-' + i"
          :opened="m.infoOpened"
          :position="m.position"
          :options="infoOptions"
          @closeclick="m.infoOpened = false">
          <span v-html="m.info"></span>
        </gmap-info-window>
        <gmap-polyline
          v-for="(p, i) in polylines"
          :key="'p-' + i"
          :path="p.path"
          :options="p.options">
        </gmap-polyline>
        <gmap-marker
          v-for="(m, i) in polylineLabels"
          :key="'pl-' + i"
          :position="m.position"
          :icon="m.icon"
          :label="m.label">
        </gmap-marker>
      </gmap-map>

      <div class="table-container">
        <table class="table is-fullwidth is-bordered">
          <thead>
            <tr>
              <th class="no-break">Deployment Procedure</th>
              <th v-for="(s, i) in sites" :key="'th-'+i" class="has-text-centered clickable" @click="markers[i].infoOpened = !markers[i].infoOpened">{{s.name}} ({{s.label}})</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(t, i) in tests" :key="'tr-'+i">
              <th class="no-break">{{t}}</th>
              <td v-for="(s, j) in sites" :key="'td-'+i+'-'+j" class="has-text-centered"
                :style="{'background-color': s.testColors[i]}">
                {{s.tests[i] == null ? '-' : s.tests[i]}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

var blue = '#4571e1'
var green = '#aed9a3'
var lightGreen = '#d5ebd1'
var yellow = '#fff2c7'
var red = '#f54160'
var grey = '#999999'


export default {
  name: 'status',
  data () {
    return {
      center: {lat: 40.819621, lng: -96.702347},
      sites: [],
      tests: [],
      links: [],
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -38
        }
      },
      markers: [],
      polylines: [],
      polylineLabels: []
    }
  },
  methods: {
    makeMarkers () {
      var vm = this
      this.markers = this.sites.map(function(s){
        var m = {
          label: {
            text: s.label.toString(),
            color: 'white',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: '14px',
            fontWeight: 'bold'
          },
          position: s.location,
          id: s.name,
          icon: {
            path: 'M255 803 c-16 -105 -40 -160 -145 -328 -38 -60 -74 -131 -80 -157 -22 -88 23 -200 102 -251 150 -97 336 -21 378 154 18 72 1 124 -80 254 -105 168 -129 223 -145 328 -3 20 -10 37 -15 37 -5 0 -12 -17 -15 -37z',
            fillColor: s.status >= 60 ? blue : red,
            fillOpacity: 1,
            strokeColor: 'white',
            strokeWeight: 1,
            scale: 0.052,
            anchor: {x: 280, y: 845},
            labelOrigin: {x: 280, y: 300}
          },
          infoOpened: false,
        }
        m.info = vm.makeInfo(s)
        return m
      })
    },
    makeInfo(s){
      var info = '<h3><strong>' + s.name + ' ' + s.status + '%</strong></h3>'
      info += '<p>' + s.equipments + '</p>'
      info += '<p>' + s.description + '</p>'
      if(s.image){
        info += '<img src="' + s.image + '" style="width:100%">'
      }
      return info
    },
    makePolylines(){
      var lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 4
      }
      var vm = this
      var polylines = []
      var labels = []
      this.links.forEach(function(l){
        polylines.push({
          path: l.link.map(function(s){return s.location}),
          options: {
            strokeOpacity: 0,
            icons: [{
              icon: lineSymbol,
              offset: '10px',
              repeat: '20px'
            }],
            strokeColor: '#f7de40'
          }
        })
        labels.push({
          label: {
            text: l.m + 'm/' +l.ft + 'ft',
            color: 'white',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: '12px',
            fontWeight: 'bold'
          },
          position: vm.getCenterPoint(l.link[0].location, l.link[1].location),
          icon: {
            path: 'M255 803 c-16 -105 -40 -160 -145 -328 -38 -60 -74 -131 -80 -157 -22 -88 23 -200 102 -251 150 -97 336 -21 378 154 18 72 1 124 -80 254 -105 168 -129 223 -145 328 -3 20 -10 37 -15 37 -5 0 -12 -17 -15 -37z',
            fillOpacity: 0,
            strokeWeight: 0,
            scale: 0.052,
            anchor: {x: 280, y: 845},
            labelOrigin: {x: 0 + l.offset[0], y: 600 + l.offset[1]}
          },
        })
      })
      this.polylines = polylines
      this.polylineLabels = labels
    },
    getCenterPoint(p1, p2){
      return {
        lat: (p1.lat + p2.lat) / 2,
        lng: (p1.lng + p2.lng) / 2 
      }
    }
  },
  mounted () {
    this.$http.get(xSTATICx + 'sites.json').then(response => {
      var resp = response.body
      var sites = resp.sites
      sites.forEach(function(site){
        site.testColors = site.tests.map(function(t){
          if(t === null)
            return grey
          if(t == 100)
            return green
          if(t >= 90)
            return lightGreen
          if(t >= 20)
            return yellow
          return red
        })
      })
      this.sites = sites
      this.tests = resp.tests

      var ofh = this.sites[0]
      var wesc = this.sites[1]
      var ah = this.sites[2]
      var avtl = this.sites[3]
      var fic = this.sites[4]
      var nema = this.sites[5]
      var hub = this.sites[6]
      var hcc = this.sites[7]

      this.links = [
        {link: [fic, nema], m: 776, ft: 2544, offset: [0, 0]},
        {link: [fic, wesc], m: 1160, ft: 3800, offset: [200, 0]},
        {link: [wesc, ofh], m: 563, ft: 1848, offset: [0, -100]},
        {link: [wesc, avtl], m: 456, ft: 1527, offset: [150, -100]},
        {link: [wesc, ah], m: 774, ft: 2541, offset: [300, 300]},
        {link: [ofh, avtl], m: 939, ft: 3083, offset: [-800, 600]},
        {link: [ofh, ah], m: 607, ft: 1993, offset: [-600, 100]},
        {link: [avtl, ah], m: 858, ft: 2817, offset: [1000, 400]},
      ]

      this.makeMarkers()
      this.makePolylines()
    }, response => {
      console.log('failed to get json')
    })
  }
}
</script>

<style lang="scss" scoped>

.status-section {
  padding-bottom: 100px;
}

.table-container {
  margin-top: 30px;
  overflow-x: auto;
}

.no-break {
  white-space: nowrap;
}

.clickable {
  cursor: pointer;
}

</style>
