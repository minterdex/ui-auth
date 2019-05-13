const pkg = require("./package")

const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin")

module.exports = {
  mode: "spa",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  router: {
    middleware: ["auth"]
  },

  /*
   ** Global CSS
   */
  css: ["~/assets/style/app.styl"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/persistedState.js", ssr: false },
    { src: "~/plugins/vee-validate.js", ssr: false },
    { src: "~/plugins/vue-cookies.js", ssr: false },
    "@/plugins/vuetify"
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    //'@nuxtjs/pwa',
  ],

  /*
   ** Build configuration
   */
  build: {
    watch: ["./api/"],
    transpile: ["vuetify/lib"],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
