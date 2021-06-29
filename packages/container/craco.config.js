// refer to https://www.npmjs.com/package/@craco/craco for more customizations on top of CRA
module.exports = {
  plugins: [
    { 
      plugin: require("../../plugins/craco-plugin-module-federation"),
      options: {
        webpack: require("webpack"),
        federationConfig: {
          name: "container",
          remotes: {
            app1: "app1@http://localhost:3031/remoteEntry.js",
            app2: "app2@http://localhost:3032/remoteEntry.js",
          },
        },
        namedModuleIdsOnProduction: true,
        namedChunkIdsOnProduction: true,
      }
    }
  ]
}
