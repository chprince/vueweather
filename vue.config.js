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
    ? '/vueweather/' // note the trailing slash
    : '/',
  pwa: {
    name: "My App",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
  },
};
