<template>
  <div class="js-item">
    <img ref="image" :src="imgUrl" />
  </div>
</template>

<script>
// import * as Utils from '~/assets/js/MathUtils'

export default {
  name: 'SmoothItem',
  data () {
    return {
      utils: {
        map: (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c,
        // linear interpolation
        lerp: (a, b, n) => (1 - n) * a + n * b,
        // Random float
        getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2)
      },
      windowSize: {},
      renderedStyles: {
        titleTranslationY: {
          previous: 0, 
          current: 0, 
          ease: 0.1,
          fromValue: Number(this.getRandomFloat(30,100)),
          setValue: () => {
              const fromValue = this.renderedStyles.titleTranslationY.fromValue;
              const toValue = -1*fromValue;
              const val = this.utils.map(this.options.top - this.docScroll, this.windowSize.height, -1 * this.options.height, fromValue, toValue);
              return fromValue < 0 ? Math.min(Math.max(val, fromValue), toValue) : Math.max(Math.min(val, fromValue), toValue);
          }
        },
        titleTranslation: {
          previous: 0, 
          current: 0, 
          ease: 0.1,
          fromValue: Number(this.getRandomFloat(30,100)),
          setValue: () => {
              const fromValue = this.renderedStyles.titleTranslationY.fromValue;
              const toValue = -1*fromValue;
              const val = this.utils.map(this.options.top - this.docScroll, this.windowSize.height, -1 * this.options.height, fromValue, toValue);
              return fromValue < 0 ? Math.min(Math.max(val, fromValue), toValue) : Math.max(Math.min(val, fromValue), toValue);
          }
        },
        titleScale: {
          previous: 0, 
          current: 0, 
          ease: 0.1,
          setValue: () => {
              const fromValue = 1;
              const toValue = 0.6;
              const val = this.utils.map(this.options.top - this.docScroll, this.windowSize.height/2, -1 * this.options.height, fromValue, toValue);
              return fromValue < 0 ? Math.min(Math.max(val, fromValue), toValue) : Math.max(Math.min(val, fromValue), toValue);
          }
        }
      },
      isVisible: false,
      options: {
        top: 0,
        height: 0
      },
      docScroll: null
    }
  },
  props: {
    imgUrl: String
  },
  mounted () {
    this.$nextTick(() => {
      this.calcWinsize();
      this.getSize();
      // set the initial values
      this.update();
      this.initEvents();
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.intersectionRatio > 0;
        })
      }, { 
          threshold: [0,0.1]
      });
      this.observer.observe(this.$el);
    })
  },
  methods: {
    getRandomFloat (min, max) {
      return (Math.random() * (max - min) + min).toFixed(2)
    },
    getSize () {
      const rect = this.$refs.image.getBoundingClientRect();
      this.options = {
          // item's height
          height: rect.height,
          // offset top relative to the document
          top: this.docScroll + rect.top
      }
    },
    update () {
      // sets the initial value (no interpolation)
      for (const key in this.renderedStyles ) {
          this.renderedStyles[key].current = this.renderedStyles[key].previous = this.renderedStyles[key].setValue();
      }
      // apply changes/styles
      this.layout();
    },
    initEvents () {
      window.addEventListener('resize', this.resize);
      window.addEventListener('scroll', this.getPageYScroll);
    },
    getPageYScroll () {
      this.docScroll = window.pageYOffset ||  document.documentElement.scrollTop;
    },
    resize () {
      // gets the item's height and top (relative to the document)
      this.getSize();
      // on resize reset sizes and update styles
      this.update();
    },
    render () {
      
      for (const key in this.renderedStyles ) {
        this.renderedStyles[key].current = this.renderedStyles[key].setValue();
        this.renderedStyles[key].previous = this.utils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
      }
      // and apply changes
      this.layout();
    },
    layout () {
      
      // `scale3d(${this.renderedStyles.titleScale.previous},${this.renderedStyles.titleScale.previous},1) translate3d(0,${this.renderedStyles.titleTranslationY.previous}px,0) rotate3d(0,0,1)`;
      this.$el.style.transform = `translate3d(0,${this.renderedStyles.titleTranslationY.previous}px,0)`;
    },
    calcWinsize () {
      this.windowSize = {width: window.innerWidth, height: window.innerHeight};
    },
  }
}
</script>

<style>
</style>
