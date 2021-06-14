// module.exports = {
//   css: {
//     loaderOptions: {
//       sass: {
//         prependData: `@import "@/styles/styles.scss";`,
//       },
//     },
//   },
// };
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vueweather/' // fix for github pages root urls for assets
    : '/',
  pwa: {
    name: "Klimaat",
    themeColor: "#23324F",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
  },
};
