<template>
  <div class="container">
    <div v-for="(episode, index) in episodes" class="episode">
      <!-- <div class="episode-row"> -->
      <div class="episode-number">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="#f8f6f2"><circle cx="50" cy="50" r="47" fill="none" stroke="#f8f6f2" stroke-width="6" stroke-miterlimit="10"/><path d="M36 28l36 22-36 21.9z"/></svg> Episode {{ index + 1 }}
      </div>
      <div class="episode-duration">{{ episode.duration }}</div>
      <!-- </div> -->
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
          duration: '31 min'
        },
        {
          duration: '29 min'
        },
        {
          duration: ''
        }
      ]
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
  }

  &-number {
    // @include grid-column(1);
    // @include grid-column-skip(1);
    display: flex;
    align-items: center;
  }

  // &-title {
  //   @include grid-column(4);
  //   display: flex;
  //   align-items: center;
  // }

  &-duration {
    // @include grid-column(1);
  }
}
</style>
