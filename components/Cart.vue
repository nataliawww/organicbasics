<template>
  <div class="cart">
    <div @click="onCartClick" class="cart-icon">
      <CartIcon />
      <span class="cart-quantity">{{ cartQuantity }}</span>
    </div>
    <transition name="slide">
      <div v-show="isActive" class="cart-drawer">
        <div class="cart-container">
          <div @click="onCartClick" class="cart-close"></div>
          <h3 class="cart-title">Shopping cart</h3>
          <p v-if="isEmpty">Your cart is empty</p>
          <div 
            v-if="!isEmpty" 
            v-for="(item, index) in products" 
            :key="index"
            class="cart-product">
              <div @click="onRemoveClick(item)" class="cart-remove">
                <TrashIcon />
              </div>
              <div class="cart-productImage">
                <img :src="item.image_link" />
              </div>
              <div class="cart-productText">
                <p class="cart-productTitle">{{ item.title }}</p>
                <div class="cart-productDetails">
                  <p>{{ item.color }} | {{ item.size }}</p>
                  <p>{{ item.price }}</p>
                </div>
              </div>
          </div>
          <h3 v-if="!isEmpty" class="cart-total">Total: {{totalPrice}} EUR</h3>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import CartIcon from '~/assets/svg/cart.svg'
import TrashIcon from '~/assets/svg/trash.svg'

export default {
  name: 'Cart',
  data () {
    return {
      isActive: false
    }
  },
  components: {
    CartIcon,
    TrashIcon
  },
  computed: {
    products () {
      return this.$store.state.cartProducts
    },
    isEmpty () {
      return this.$store.state.cartProducts.length === 0
    },
    cartQuantity () {
      return this.$store.state.cartProducts.length
    },
    totalPrice () {
      let price = 0
      for (let item of this.$store.state.cartProducts) {
        let number = item.price.substring(0, item.price.indexOf('.'))
        price += parseInt(number)
      }
      return price
    }
  },
  watch: {
    products (oldVal, newVal) {
      if (newVal.length > 0) this.isActive = true
    }
  },
  methods: {
    onCartClick() {
      this.isActive = !this.isActive
    },
    onRemoveClick(item) {
      this.$store.commit('removeFromCart', item)
    }
  }
}
</script>

<style scoped lang="scss">
.cart {

  &-container {
    padding: $gutter-width-sm;
    @include mq($from: md) {
      padding: $gutter-width 30px;
    }
  }

  &-title {
    margin-bottom: 30px;
  }

  &-icon {
    cursor: pointer;
    position: fixed;
    top: 0;
    right: 0;
    width: 25px;
    padding: $gutter-width;
  }

  &-quantity {
    position: absolute;
    top: 52%;
    left: 50%;
    font-size: 12px;
    transform: translate(-50%, -50%);
  }

  &-drawer {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    background: $off-white;
    overflow: scroll;
    @include mq($from: md) {
      width: 400px;
    }
  }

  &-close {
    cursor: pointer;
    &:before {
      content: "\00d7";
      position: absolute;
      padding: $gutter-width 30px;
      top: 0;
      right: 0;
      font-size: 20px;
    }
  }

  &-total {
    margin-top: 40px;
  }

  &-remove {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
  }

  &-product {
    position: relative;
    display: flex;
    margin-bottom: 20px;
  }

  &-productTitle {
    margin-bottom: 8px;
  }

  &-productText {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-left: 10px;
    width: 80%;
  }

  &-productDetails {
    display: flex;
    justify-content: space-between;
    * {
      font-size: 12px;
    } 
  }

  &-productImage {
    @include aspect-ratio(5, 6);
    width: 20%;
  }
}

</style>