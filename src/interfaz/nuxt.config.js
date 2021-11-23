import colors from "vuetify/es5/util/colors";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - Mis Gastos",
    title: "Inicio",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/auth", "@nuxtjs/toast", "@nuxtjs/dotenv"],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.purple.darken3,
          secondary: colors.teal.darken3,
        },
      },
    },
  },

  axios: {
    baseURL: process.env.API_URL || "http://localhost:5000/api/",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  toast: {
    position: "bottom-center",
  },
  router: {
    middleware: ["auth"],
  },
  auth: {
    redirect: {
      login: "/iniciar-sesion",
      logout: "/iniciar-sesion",
    },
    strategies: {
      local: {
        token: {
          property: "token",
          global: true,
        },
        endpoints: {
          login: { url: "users/signin", method: "post" },
          logout: false,
          user: false,
        },
      },
    },
  },
};
