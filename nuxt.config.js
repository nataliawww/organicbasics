import { TimelineLite } from "gsap";

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [ '~/assets/scss/main.scss' ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/imagesLoaded', ssr: false },
    { src: '~/plugins/vue-plyr'}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Add path to resolve the @import declarations
      config.module.rules.push({
        test: /\.(scss)$/,
        loader: 'sass-loader',
        // exclude: /(node_modules)/,
        options: {
          sassOptions: {
            includePaths: ['~/assets/scss/'],
          },
          prependData: `@import "~/assets/scss/variables.scss";
                        @import "~sass-mq/mq";
                        @import "~/assets/scss/mixins.scss";`
        }
      })
    }
  }
}
