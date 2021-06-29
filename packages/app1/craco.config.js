module.exports = {
  plugins: [
    { 
      plugin: require("../../plugins/craco-plugin-module-federation"),
      options: {
        webpack: require("webpack"),
        federationConfig: {
          name: "app1",
          filename: "remoteEntry.js",
          exposes: {
            './Button': './src/components/Button',
          },
        },
        namedModuleIdsOnProduction: true,
        namedChunkIdsOnProduction: true,
      }
    }
  ]
}
