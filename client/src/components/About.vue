<template>
  <div id="about" class="my-section about-section">
    <div class="container">
      <div class="text-container">
        <div class="title-container">
          <p class="title is-1">NEXTT</p>
          <p class="subtitle is-3">Subtitle 3</p>
        </div>
        <div class="sponsors">
          <img src="static/logo/un.png" class="logo">
          <img src="static/logo/nsf.png" class="logo">
          <img src="static/logo/ohio.png" class="ohio-logo">
          <img src="static/logo/lincoln.png" class="long-logo">
          <img src="static/logo/usignite.png" class="long-logo">
        </div>
        <div class="content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quid attinet de rebus tam apertis plura requirere? An, partus ancillae sitne in fructu habendus, disseretur inter principes civitatis, P. Mene ergo et Triarium dignos existimas, apud quos turpiter loquare? Sed tamen enitar et, si minus multa mihi occurrent, non fugiam ista popularia. Sed quia studebat laudi et dignitati, multum in virtute processerat. Qui igitur convenit ab alia voluptate dicere naturam proficisci, in alia summum bonum ponere? Sed ad bona praeterita redeamus. Haeret in salebra. Duo Reges: constructio interrete. Sint modo partes vitae beatae. Primum quid tu dicis breve? Quod autem satis est, eo quicquid accessit, nimium est;</p>
          
          <p>Non risu potius quam oratione eiciendum? Legimus tamen Diogenem, Antipatrum, Mnesarchum, Panaetium, multos alios in primisque familiarem nostrum Posidonium. Sed fac ista esse non inportuna; De vacuitate doloris eadem sententia erit. Quamquam haec quidem praeposita recte et reiecta dicere licebit. Scrupulum, inquam, abeunti; Quo tandem modo? Videmus in quodam volucrium genere non nulla indicia pietatis, cognitionem, memoriam, in multis etiam desideria videmus.</p>
        </div>
      </div>
      <div class="image-container has-text-centered">
        <img src="static/concept.png" class="concept-image">
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'about',
  data () {
    return {
      data: '',
    }
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
  width: 310px;
  float: right;
  text-align: right;
}

.logo {
  width: 100px;
}

.ohio-logo {
  width: 90px;
  margin-left: 7px;
}

.long-logo {
  width: 150px;
}
</style>
