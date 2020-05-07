<template>
  <div>
    <div class="logo">
      <Logo />
    </div>
    <div class="filter">
      <p class="filter-title">Filter by size: </p>
      <div class="filter-row">
        <div
          @click="onTabClick(size.name, 'size', index)"
          v-for="(size, index) in filters.size"
          :key="index"
          :class="{'is-active': size.active}"
          class="filter-tab">
          <p>{{ size.name }}</p>
        </div>
      </div>
    </div>
    <div class="filter">
      <p class="filter-title">Filter by color: </p>
      <div class="filter-row">
        <div v-for="(color, index) in filters.color" :key="'color-' + index"  :class="{'is-active': color.active}"class="filter-tab">
          <p @click="onTabClick(color.name, 'color', index)">{{ color.name }}</p>
        </div>
      </div>
    </div>
    <transition-group name="fade" class="products">
      <div v-for="(item, index) in products" :key="'product' + index" class="products-item">
        <Item :data="item"/>
      </div>
    </transition-group>
  </div>
</template>

<script>
import Item from '~/components/Item';
import Logo from '~/assets/svg/logo.svg';
import * as CONSTANTS from '~/assets/js/constants'

export default {
  components: {
    Item,
    Logo
  },
  data () {
    return {
      toggle: false,
      filters: {
        size: [
          { name: 'XS'},
          { name: 'S'},
          { name: 'M'},
          { name: 'L'},
          { name: 'XL'}
        ],
        color: [
          { name: 'Black'},
          { name: 'Rose Nude'},
          { name: 'Navy'},
          { name: 'White'},
          { name: 'Grey'}
        ]
      },
      query: {
        color: CONSTANTS.color,
        size: CONSTANTS.size,
      },
      activeState: {
        color: false,
        size: false
      }
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    onTabClick(value, key, index) {
      this.toggleTabState(key, index)
      this.setFilterActive(key);
      this.filterProducts(value, key)
      if (this.activeState[key] && this.query[key].length < 1) {
        this.resetQuery(key)
      }
      this.$store.commit('filter', {sizes: this.query.size, colors: this.query.color})
      
    },
    filterProducts (value, key) {
      if (this.query[key].includes(value)) {
        this.query[key] = this.query[key].filter(item => item !== value)
      } else {
        this.query[key].push(value)
      }
    },
    toggleTabState(key, index) {
      let item = this.filters[key][index];
      item.active = !item.active;
    },
    setFilterActive(key) {
      if (!this.activeState[key]) this.query[key] = [];
      this.activeState[key] = true;
    },
    resetQuery(key) {
      console.log('reset')
      this.query[key] = CONSTANTS[key];
      this.activeState[key] = false
    }
  }
}
</script>

<style scoped lang="scss">
.logo {
  margin-bottom: $gutter-width;
  svg {
    width: 150px;
  }
  @include mq($from:md) {
    text-align: center;
    svg {
      width: 250px;
    }
  }
}

.filter {
  
  margin-bottom: 10px;

  @include mq($from:md) {
    display: flex;
  }

  &-row {
    display: flex;
    @include mq($until:md) {
      margin-left: -12px;
    }
  }
  
  &-title {
    @include mq($until:md) {
      font-size: 12px;
    }
  }

  &-tab {
    padding: 0 10px;
    margin: 0 2px;
    cursor: pointer;

    &.is-active {
      background: $off-black;
      color: $off-white;
    }
  }
}

.products { 
  @include grid-row();
  display: block;
  margin-top: 30px;

  &-item {
    @include grid-column(2);
    @include mq($from: md) {
      @include grid-column(3);
    }
  }
}
</style>
