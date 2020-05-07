<template>
  <div>
    <SmoothScroll>
      <div class="main">
        <nuxt />
        <GridTester v-if="showGrid"/>
      </div>
    </SmoothScroll>
    <Cart />
  </div>
</template>

<script>
import GridTester from '~/components/GridTester'
import Cart from '~/components/Cart'
import SmoothScroll from '~/components/SmoothScroll.vue'

export default {
  components: {
    GridTester,
    Cart,
    SmoothScroll
  },
  data () {
    return {
      showGrid: false,
    }
  },
  mounted () {
    this.showGrid = (window.location.hash === '#grid')
  }
}  
</script>

<style lang="scss">
.main {
  position: relative;
  padding: $gutter-width-sm;
  @include mq($from: md) {
    padding: $gutter-width;
  }
}
.slide-enter-active, .slide-leave-active {
  transition: transform 800ms cubic-bezier(0.65, 0, 0.35, 1);
}
.slide-enter, .slide-leave-to {
  transform: translateX(100%);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 400ms cubic-bezier(0.65, 0, 0.35, 1);
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.lazy-image {
  opacity: 0;
  transition: 500ms opacity cubic-bezier(0.65, 0, 0.35, 1);
  &[lazy=loaded] {
    opacity: 1;
  }
}
</style>
