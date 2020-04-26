<template>
  <div v-images-loaded.on.done="onImagesLoaded">
    <SmoothScroll :is-loaded="imagesLoaded">
      <div class="main">
        <Navigation />
        <nuxt />
        <GridTester v-if="showGrid"/>
      </div>
    </SmoothScroll>
    <AudioPlayer />  
  </div>
</template>

<script>
import AudioPlayer from '~/components/AudioPlayer'
import GridTester from '~/components/GridTester'
import Navigation from '~/components/Navigation'
import SmoothScroll from '~/components/SmoothScroll.vue'

export default {
  components: {
    AudioPlayer,
    GridTester,
    Navigation,
    SmoothScroll
  },
  data () {
    return {
      showGrid: false,
      imagesLoaded: false
    }
  },
  transition: 'page',
  mounted () {
    this.showGrid = (window.location.hash === '#grid')
    this.imagesLoaded = true
  },
  methods: {
    onImagesLoaded (img) {
      this.imagesLoaded = true
    }
  }
}  
</script>

<style lang="scss">

html, body {
  background: $off-black;
  color: $off-white;
}
.main {
  position: relative;
  padding: $gutter-width-sm;
  @include mq($from: md) {
    padding: $gutter-width;
  }
}
</style>
