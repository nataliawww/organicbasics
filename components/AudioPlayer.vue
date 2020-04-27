<template>
  <div ref="plyr" :class="{'is-active': active}" class="player">
    <audio>
      <source :src="url" type="audio/mp3"/>
    </audio>
  </div>
</template>

<script>
import Plyr from 'plyr'

export default {
  name: 'AudioPlayer',
  data () {
    return {
      active: false,
      options: {
        fullscreen: { enabled: false },
        controls: ['play', 'progress', 'current-time', 'mute']
      },
      player: {}
    }
  },
  computed: {
    url () {
      return this.$store.state.episodeUrl
    }
  },
  watch: {
    url (val) {
      this.active = true;
      this.player.source = {
        type: 'audio',
        sources: [
            {
                src: val,
                type: 'audio/mp3',
            }
        ],
      }
      this.player.play();
    }
  },
  mounted () {
    this.player = new Plyr(this.$el.firstChild, this.options)
  }
}
</script>

<style lang="scss">
.player {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transform: translateY(100%);
  transition: 1000ms transform cubic-bezier(0.65, 0, 0.35, 1);

  &.is-active {
    transform: translateY(0);
  }
}

.plyr__controls {
  height: 80px;
}
.plyr__progress__buffer {
  height: 2px;
}
</style>
