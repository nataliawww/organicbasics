<template>
  <div class="smooth">
    <div ref="container">
      <slot></slot> 
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'SmoothScroll',
  data () {
    return {
      utils: {
        map: (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c,
        lerp: (a, b, n) => (1 - n) * a + n * b,
      },
      renderedStyles: {
        translationY: {
          previous: 0, 
          current: 0, 
          ease: 0.1,
          setValue: () => this.docScroll
        }
      },
      windowSize: {},
      docScroll: null,
      lastScroll: null,
      scrollingSpeed: 0
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  watch: {
    products () {
      setTimeout(() => {
        this.setSize()
      }, 500)
    }
  },
  mounted () {
    this.addEventListeners()
    this.setSize()
    this.update()
    this.style()
    requestAnimationFrame(() => this.render())
  },
  methods: {
    addEventListeners () {
      window.addEventListener('resize', this.setSize);
      window.addEventListener('scroll', this.getPageYScroll);
    },
    calcWinsize () {
      this.windowSize = {width: window.innerWidth, height: window.innerHeight};
    },
    getPageYScroll () {
      this.docScroll = window.pageYOffset ||  document.documentElement.scrollTop;
    },
    update() {
      // sets the initial value (no interpolation) - translate the scroll value
      for (const key in this.renderedStyles ) {
          this.renderedStyles[key].current = this.renderedStyles[key].previous = this.renderedStyles[key].setValue();   
      }   
      // translate the scrollable element
      this.layout();
    },
    layout() {
      this.$refs.container.style.transform = `translate3d(0,${-1*this.renderedStyles.translationY.previous}px,0)`;
    },
    setSize() {
      document.body.style.height = `${this.$refs.container.scrollHeight}px`;
    },
    style() {
        this.$el.style.position = 'fixed';
        this.$el.style.width = this.$el.style.height = '100%';
        this.$el.style.top = this.$el.style.left = 0;
        this.$el.style.overflow = 'hidden';
    },
    render() {
      // Get scrolling speed
      // Update lastScroll
      this.scrollingSpeed = Math.abs(this.docScroll - this.lastScroll);
      this.lastScroll = this.docScroll;
      
      // update the current and interpolated values
      for (const key in this.renderedStyles ) {
          this.renderedStyles[key].current = this.renderedStyles[key].setValue();
          this.renderedStyles[key].previous = this.utils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);    
      }
      // and translate the scrollable element
      this.layout();
      
      // loop..
      requestAnimationFrame(() => this.render());
    }

  }
}
</script>

