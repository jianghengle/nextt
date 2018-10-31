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
                :class="{'background-green': s.tests[i]==100, 'background-red': s.tests[i]!=100 && s.tests[i]!=null, 'background-gray': s.tests[i]==null}">
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
import Vue from 'vue'

var ofh = {
  name: 'Oldfather Hall', label: 'OF', location: {lat: 40.819745, lng: -96.703485},
  equipments: 'Radio (2x10G SFP+), GPS & UHF Antennas',
  status: 99,
  description: 'UHF Antenna Array Replaced, GPS Antenna Installed.',
  tests: [100, 100, 100, 100, 100, 100, 100, 100, 80, 100, 100, 100, 80, 0, 20],
  image: 'static/ofh.png'
}

var wesc = {
  name: 'Scott Engineering Center', label: 'SE', location: {lat: 40.822033, lng: -96.697565},
  equipments: 'Radio Antenna Head/Cable Conduit/RF Cable and Fiber/Ethernet (media converter)',
  status: 95,
  description: 'Radio Antenna Head/Cable Conduit/RF Cable done. Fiber/Ethernet (media converter) installed.',
  tests: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 0],
  image: 'static/wsec.png'
}

var ah = {
  name: 'Andersen Hall', label: 'AH', location: {lat: 40.815343, lng: -96.699225},
  equipments: 'Antenna Head, Cabinet for radio, and Fiber',
  status: 90,
  description: 'Antenna head installed.',
  tests: [100, 100, 100, 100, 100, 100, 100, 100, 60, 100, 100, 0, 0, 0, 0],
  image: 'static/ah.png'
}

var avtl = {
  name: 'Traffic Light ', label: 'TL', location: {lat: 40.820990, lng: -96.692461},
  equipments: 'Separated radio and antenna enclosures',
  status: 15,
  description: 'Separated radio and antenna enclosures hanging on pole.',
  tests: [100, 100, 90, 80, 100, 90, 0, 0, 80, 0, 0, 0, 0, 0, 0],
  image: 'static/avtl.png'
}

var fic = {
  name: 'Food Innovation Center', label: 'FI', location: {lat: 40.831608, lng: -96.692695},
  equipments: 'Fiber & 6U Cabinet',
  status: 90,
  description: 'Fiber & 6U Cabinet installed.',
  tests: [100, 100, 100, 100, 100, 100, 100, 100, 60, 100, 100, 0, 0, 0, 0],
  image: 'static/fic.png'
}

var nema = {
  name: 'NEMA', label: 'NE', location: {lat: 40.831099, lng: -96.701749},
  equipments: 'mmWave Link',
  status: 0,
  description: 'mmWave Link to FIC',
  tests: [100, 100, 100, 100, 100, 100, 100, 100, 60, 100, 100, 0, 0, 0, 0],
  image: 'static/nema.png'
}

var hub = {
  name: 'Fronthaul Fiber Hub', label: 'HB', location: {lat: 40.823006, lng: -96.697363},
  equipments: 'Switch, 4U server, FPGA board',
  status: 80,
  description: 'Switch, 4U server, FPGA board Deployed.',
  tests: [50, 0, 0, 0, 0, 0, null, null, null, null, null, null, null, null, null]
}

var hcc = {
  name: 'Holland Computing Center', label: 'HC', location: {lat: 40.819632, lng: -96.705553},
  equipments: 'Data Center',
  status: 25,
  description: 'Holland Computing Center as the Data center.',
  tests: [100, 100, 100, null, 30, 20, null, null, 20, null, null, null, null, 100, 0]
}

var tests = ['Site Planning & Selection', 'Site Investigation', 'Deployment Solution', 'Enclosure Design',
  'Major Equipments', 'Materials & Supplies', 'Cable Conduit', 'Fiber and power Installation', 'Fiber Backbone Routing',
  'Transceiver Installation', 'Antenna Installation', 'Connectivity Test', 'Site Test', 'Cyber Security', 'MISC'
]

var links = [
  {link: [fic, nema], m: 776, ft: 2544, offset: [0, 0]},
  {link: [fic, wesc], m: 1160, ft: 3800, offset: [200, 0]},
  {link: [wesc, ofh], m: 563, ft: 1848, offset: [0, -100]},
  {link: [wesc, avtl], m: 456, ft: 1527, offset: [150, -100]},
  {link: [wesc, ah], m: 774, ft: 2541, offset: [300, 300]},
  {link: [ofh, avtl], m: 939, ft: 3083, offset: [-800, 600]},
  {link: [ofh, ah], m: 607, ft: 1993, offset: [-600, 100]},
  {link: [avtl, ah], m: 858, ft: 2817, offset: [1000, 400]},
]

var green = '#4571e1'
var red = '#f54160'

export default {
  name: 'status',
  data () {
    return {
      center: {lat: 40.819621, lng: -96.702347},
      sites: [ofh, wesc, ah, avtl, fic, nema, hub, hcc],
      tests: tests,
      links: links,
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
            fillColor: s.status >= 60 ? green : red,
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
    this.makeMarkers()
    this.makePolylines()
  }
}
</script>

<style lang="scss" scoped>

.status-section {
  padding-top: 100px;
  padding-bottom: 100px;
}

.table-container {
  margin-top: 30px;
  overflow-x: auto;
}

.no-break {
  white-space: nowrap;
}

.background-green {
  background-color: #b6d7a4;
}

.background-red {
  background-color: #f2cdcc;
}

.background-gray {
  background-color: #999999;
}

.clickable {
  cursor: pointer;
}

</style>
