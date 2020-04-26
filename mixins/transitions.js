import { TimelineLite, Power4 } from 'gsap'

export default {
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  transition: {
    mode: 'out-in',
    // beforeEnter(el, done) {console.log('beforeEnter')},
    enter(el, done) {
      let tl = new TimelineLite();
      tl.from(el, 1, {xPercent:20, skewX: -10, opacity: 0, ease: Power4.easeOut, onComplete: done});
    },
    // beforeLeave(el, done) {console.log('beforeLeave')},
    leave(el, done) {
      let tl = new TimelineLite();
      tl.to(el, 1, {xPercent:-20, skewX: -10, opacity: 0, ease: Power4.easeIn, onComplete: done});
    },
  },
}
