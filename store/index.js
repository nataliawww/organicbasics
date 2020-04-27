export const state = () => ({
  episodeUrl: ''
})

export const mutations = {
  update (state, url) {
    state.episodeUrl = url
  }
}