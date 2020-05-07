<template>
  <div @click="addToCart" class="item">
    <div class="item-image">
      <img v-lazy="data.image_link" :alt="data.title" class="lazy-image">
      <div v-if="soldout" class="item-overlay" />
      <div class="item-info">
        <p v-if="soldout" class="item-soldout">Out of stock</p>
        <p @click="addToCart(data)" class="item-price">{{ data.price }}</p>
      </div>
      <p v-if="!soldout" @click="addToCart(data)" class="item-button">Add to cart</p>
    </div>
    <div class="item-details">
      <p>{{ data.title }}</p>
      <div>
        <p>{{ data.color }} | {{ data.size }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    soldout () {
      return (this.data.availability === 'out of stock')
    }
  },
  methods: {
    addToCart (data) {
      this.$store.commit('addToCart', data)
    },
  }
}
</script>

<style scoped lang="scss">
.item {
  margin-bottom: $gutter-width;
  @include mq($until: md) {
    p {
      font-size: 12px;
    }  
  }

  &-details {
    margin-top: 5px;
    @include mq($from:md) {
      display: flex;
      justify-content: space-between;
    }
  }

  &-image {
    @include aspect-ratio(1, 1);
    position: relative;
    &:hover {
      .item-button {
        opacity: 1;
      }
    }
  }

  &-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
  }

  &-button {
    @include mq($until: md) {
      display: none;
    }
    cursor: pointer;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: 500ms opacity ease-out, 300ms background ease-out;
    background: rgba(255, 255, 255, 0.8);
    padding: 15px 30px;

    &:hover {
      background: rgba(255, 255, 255, 1);
    }
  }

  &-info {
    position: absolute;
    bottom: 10px;
    right: 10px;
    text-align: right;
  }

  &-soldout {
    color: red;
    margin-bottom: 0;
  }
}
</style>
