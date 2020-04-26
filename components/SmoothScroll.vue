<template>
  <div class="smooth">
    <div ref="container">
      <slot></slot> 
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import SmoothItem from '~/components/SmoothItem'

export default {
  name: 'SmoothScroll',
  components: {
    SmoothItem
  },
  data () {
    return {
      items: [],
      utils: {
        map: (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c,
        // linear interpolation
        lerp: (a, b, n) => (1 - n) * a + n * b,
        // Random float
        getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2)
      },
      renderedStyles: {
        translationY: {
          // interpolated value
          previous: 0, 
          // current value
          current: 0, 
          // amount to interpolate
          ease: 0.1,
          // current value setter
          // in this case the value of the translation will be the same like the document scroll
          setValue: () => this.docScroll
        },
        skew: {
          previous: 0, 
          current: 0, 
          ease: 0.1,
          setValue: () => {
            const toValue = 10;
            const fromValue = 0;
            const val = Math.max(Math.min(this.utils.map(this.scrollingSpeed, 20, 100, fromValue, toValue), toValue), fromValue)
            return this.renderedStyles.translationY.previous < this.docScroll ? val : -1*val;
          }
        }
      },
      windowSize: {},
      docScroll: null,
      lastScroll: null,
      scrollingSpeed: 0
    }
  },
  props: {
    isLoaded: Boolean
  },
  watch: {
    isLoaded () {
      if (this.isLoaded) {
        console.log('hey')
        this.initItems()
        this.addEventListeners()
        this.setSize()
        // set the initial values
        this.update()
        // the <main> element's style needs to be modified
        this.style()
        // init/bind events
        // this.initEvents();
        // start the render loop
        requestAnimationFrame(() => this.render())
      }
    },
    $route (to, from) {
      this.$nextTick(() => {
        // this.initItems()
      })
    }
  },
  methods: {
    initItems () {
      var ComponentClass = Vue.extend(SmoothItem)
      let items = this.$el.querySelectorAll('.js-item')
      console.log('init items', items);
      for (let item of items) {
          var instance = new ComponentClass({
              propsData: { 
                imgUrl: item.getAttribute('data-url')
              }
          })
          // instance.$slots.default = ['Click me!']
          instance.$mount() // pass nothing         console.log(this.$refs)
          item.appendChild(instance.$el)
          this.items.push(instance);
      }
    },
    addEventListeners () {
      window.addEventListener('resize', this.setSize);
      window.addEventListener('scroll', this.getPageYScroll);
    },
    calcWinsize () {
      this.windowSize = {width: window.innerWidth, height: window.innerHeight};
    },
    getPageYScroll () {
      this.docScroll = window.pageYOffset ||  document.documentElement.scrollTop;
      // console.log(this.docScroll)
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
      this.$refs.container.style.transform = `translate3d(0,${-1*this.renderedStyles.translationY.previous}px,0) skewY(${this.renderedStyles.skew.previous}deg)`;
    },
    setSize() {
      // set the heigh of the body in order to keep the scrollbar on the page
      document.body.style.height = `${this.$refs.container.scrollHeight}px`;
    },
    style() {
        // the <main> needs to "stick" to the screen and not scroll
        // for that we set it to position fixed and overflow hidden 
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
      
      // for every item
      for (const item of this.items) {
          // if the item is inside the viewport call it's render function
          // this will update item's styles, based on the document scroll value and the item's position on the viewport
          if ( item.isVisible ) {
              if ( item.insideViewport ) {
                  item.render();
              }
              else {
                  item.insideViewport = true;
                  item.update();
              }
          }
          else {
            console.log('not in viewport')
            item.insideViewport = false;
          }
      }
      
      // loop..
      requestAnimationFrame(() => this.render());
    }

  }
}
</script>

<style>
.smooth {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
}

</style>
