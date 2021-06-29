module.exports = {
  plugins: [
    { 
      plugin: require("../../plugins/craco-plugin-module-federation"),
      options: {
        webpack: require("webpack"),
        federationConfig: {
          name: "app2",
          filename: "remoteEntry.js",
          exposes: {
            './Hello': './src/Hello',
          },
        },
        namedModuleIdsOnProduction: true,
        namedChunkIdsOnProduction: true,
      }
    }
  ]
}
