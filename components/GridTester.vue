<template>
  <div class="container">
    <div class="row">
      <div 
        v-for="col in colCount" 
        :key="col"
        class="column">
        oi
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GridTester',
  data () {
    return {
      colCount: 12
    }
  },
}
</script>

<style scoped lang="scss">
.container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}
.row {
  @include grid-row();
  height: 100%;
  padding: 0 $gutter-width-sm;
  @include mq($from: md) {
    padding: 0 $gutter-width;
  }
}

.column {
  @include grid-column(1);
  background-color: grey;
  opacity: 0.2;
  height: 100%;
}

</style>