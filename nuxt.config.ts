// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false ,
  modules: [
    'nuxt-mongoose',
  ],
  app: {
    head: {
      title: 'doodle jump', /*it can be replaced in pages */
      htmlAttrs: {
        lang: "en"
      },
      meta: [
        { charset: 'utf-8' },
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'doodle jump game in vue' },
        { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
        { hid: 'referrer', name: 'referrer', content: 'origin' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' },
      ],
      // script: [
      //   {
      //     innerHTML: " (function (w, d, s, l, i) {var timer; w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f); j.addEventListener('load', () => { clearTimeout(timer); }); j.onerror = function () { clearTimeout(timer); }; timer = setTimeout(function () {  j.parentNode.removeChild(j); }, 5000);})(window, document, 'script', 'dataLayer', 'GTM-5K36M37');"
      //   },
      // ],
    },
  },

runtimeConfig:{
  public: {
    uri: process.env.MONGODB_URI
  }
}, 
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: 'models',
    devtools: true,
  },
})
