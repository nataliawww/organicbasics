<template>
  <vue-plyr class="player">
    <audio>
      <source src="bully_laugh_1.mp3" type="audio/mp3"/>
    </audio>
  </vue-plyr>
</template>

<script>

export default {
  name: 'AudioPlayer',
}
</script>

<style lang="scss">
.player {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.plyr__controls {
  height: 80px;
}
.plyr__progress__buffer {
  height: 2px;
}
</style>
