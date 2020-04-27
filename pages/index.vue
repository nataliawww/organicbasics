<template>
  <div>
    <div class="u-grid-row">
      <div class="intro">
        <h3>vi·gnette</h3>
        <h6>/vinˈyet/</h6>
        <h6 class="t-italic">noun</h6>
        <h6>a brief evocative description, account, or episode</h6>
      </div>
      <div class="text">
        <p>If everyone has a story to tell, then this borough has about 2.4 million. The following stories are unscripted, true and accompanied by music. They provide a small window into the thoughts and memories of those living in Brooklyn, New York. These are The Brooklyn Vignettes.</p>
      </div>
    </div>
    <div class="u-grid-row">
      <Episodes class="episodes"/>
    </div>
    <h1 class="title">
      NEW SHOWS ADDED MONTHLY NEW SHOWS ADDED MONTHLY
    </h1>
    <div class="u-grid-row">
      <div class="about">
        <p>The Brooklyn Vignettes is a monthly podcast produced by me, Fraser Tye*, for Radio Free Brooklyn. The show provides brief, unscripted moments usually given by strangers who I approach in public. Other times, they are moments provided by friends of mine, or people I've met online. Due to the current COVID-19 virus, these are being recorded over the phone and not in person. As always however, they are told by those living in this weird and wonderful place we call home, Brooklyn, NY.  </p>
        <p>* Production help from Evan Crafford with special thanks to Søren Elbek</p>
      </div>
    </div>
  </div>
</template>

<script>
import { TimelineLite } from 'gsap'
import Episodes from '~/components/Episodes'
import transitions from '~/mixins/transitions'
export default {
  mixins: [transitions],
  components: {
    Episodes
  }
}
</script>

<style scoped lang="scss">

.title {
  position: relative;
  text-transform: uppercase;
  // font-size: 9vw;
  margin-bottom: margin(lg);
  mix-blend-mode: difference;
  color: transparent;
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: $off-white;
  white-space: nowrap;
  left: -10%;
  animation: move 80s linear infinite alternate; 
}

.text {
  @include mq($from: lg) {
    @include grid-column(3.5);
    @include grid-column-skip(0.5);
  }
  position: relative;
  mix-blend-mode: difference;
  margin-top: margin(md);
  margin-bottom: margin(lg);
}

.intro {
  @include mq($from: lg) {
    @include grid-column(3.5);
    @include grid-column-skip(0.5);
  }
  margin-top: margin(lg);
}

.about {
  @include mq($from: lg) {
    @include grid-column(4);
    @include grid-column-skip(1);
  }
  position: relative;
  mix-blend-mode: difference;
  margin-top: margin(md);
  margin-bottom: margin(lg);
  // p {
  //   @include fluid-type(200px, 1300px, 12px, 20px);
  // }
  // text-align: center;
}

.episodes {
  @include mq($from: lg) {
    @include grid-column(4);
    @include grid-column-skip(1);
  }
  margin-bottom: margin(lg);
}

@keyframes move {
  from {transform: translateX(0);}
  to {transform: translateX(-100%);}
}
</style>
