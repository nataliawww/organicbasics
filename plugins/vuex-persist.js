import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      reducer: state => ({
        cartProducts: state.cartProducts,
      })
    }).plugin(store)
  })
}