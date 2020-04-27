<template>
  <div class="container">
    <div v-for="(episode, index) in episodes" class="episode">
      <div class="episode-number">
        <svg @click="onClick(episode.url)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="#f8f6f2"><circle cx="50" cy="50" r="47" fill="none" stroke="#f8f6f2" stroke-width="6" stroke-miterlimit="10"/><path d="M36 28l36 22-36 21.9z"/></svg> {{ episode.title }}
      </div>
      <div class="episode-duration">{{ episode.duration }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Episodes',
  data () {
    return {
      episodes: [
        {
          title: 'Episode 1',
          duration: '31 min',
          url: 'https://dcs.megaphone.fm/RADIO9882354531.mp3?key=4bef6a5df24401945621db2542d4c453'
        },
        {
          title: 'Episode 2',
          duration: '29 min',
          url: 'https://dcs.megaphone.fm/RADIO7756191106.mp3?key=9ddb1af00a0ff1353f6cdbacc1282e41'
        },
        {
          title: 'Music Interlude',
          duration: '39 min',
          url: 'https://dcs.megaphone.fm/RADIO8067345280.mp3?key=c9e960b74a5fa48251c96f13c1dd7b51'
        }
      ]
    }
  },
  methods: {
    onClick (url) {
      this.$store.commit('update', url);
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  @include fluid-type(200px, 1300px, 16px, 20px);
  mix-blend-mode: difference;
}

.episode {
  // @include grid-row();
  margin: margin(md) 0;
  padding-bottom: margin(md);
  border-bottom: 2px solid $off-white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    width: 30px;
    height: 30px;
    margin-right: 20px;
    cursor: pointer;
  }

  &-number {
    display: flex;
    align-items: center;
  }

}
</style>
