import data from "~/assets/js/products.json"

export const state = () => ({
  products: data,
  cartProducts: [],
})

export const mutations = {
  addToCart (state, product) {
    if (product.id) {
      state.cartProducts.push(product)
    }
  },
  removeFromCart (state, product) {
    if (product.id) {
      state.cartProducts = state.cartProducts.filter(item => item.id !== product.id)
    }
  },
  filter (state, filters) {
    state.products = data.filter(el => (filters.sizes.includes(el.size) && filters.colors.includes(el.color) ) )
  }
}