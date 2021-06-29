# mf-app-discovery
POC about implementing MF application with webpack module federation

There is [coming support of the webpack 5 in cra](https://github.com/facebook/create-react-app/issues/9994), which hopefully will replace `craco-plugin-module-federation` requirement for this 

## Tools
- [LernaJS](https://lerna.js.org/) to use monorepo, because otherwise it will be to complex to maintain micro-frontends
- [CRA](https://create-react-app.dev/) to create react app

## What was done

### LernaJS
I have created typical lernaJS structure with the `packages` by `lerna init`

### React apps
```
npx create-react-app container --template typescript --with-npm && npx create-react-app app1 --template typescript --with-npm && npx create-react-app app2 --template typescript --with-npm
```

### Introduced webpack5 from the CRA feature-branch 
Created `npm-shrinkwrap.json` for every package 
```
{
  "dependencies": {
    "react-scripts": {
      "version": "4.0.3",
      "from": "https://gitpkg.now.sh/facebook/create-react-app/packages/react-scripts?wp5",
      "dependencies": {
        "react-dev-utils": {
          "version": "11.0.4",
          "from": "https://gitpkg.now.sh/facebook/create-react-app/packages/react-dev-utils?wp5",
          "dependencies": {
            "react-error-overlay": {
              "version": "6.0.9",
              "from": "https://gitpkg.now.sh/facebook/create-react-app/packages/react-error-overlay?wp5",
              "dependencies": {
                "anser": { "version": "^2.0.1" },
                "cross-env": { "version": "^7.0.3" },
                "fork-ts-checker-webpack-plugin": { "version": "^6.2.10" },
                "raw-loader": { "version": "^4.0.2" },
                "settle-promise": { "version": "^1.0.0" }
              }
            }
          }
        }
      }
    }
  }
}
```
Introduced patch for react-error-overlay for every package
```
"postinstall": "cd node_modules/react-scripts/node_modules/react-dev-utils/node_modules/react-error-overlay && NODE_ENV=production node build.js"
```
and called `npx lerna exec -- npm i`

### Introduced craco + plugin
Called `npx lerna add @craco/craco`
Introduced shared `plugins/craco-plugin-module-federation.js`
Introduced `craco.config.js` for every package

### Setup for app1
To expose the `Button` from app1
```typescript
  federationConfig: {
    name: "app1",
    filename: "remoteEntry.js",
    exposes: {
      './Button': './src/components/Button',
    },
  },
```

### Setup for app2
To expose the `Hello` component from app2
```typescript
  federationConfig: {
    name: "app1",
    filename: "remoteEntry.js",
    exposes: {
      './Hello': './src/Hello',
    },
  },
```

### Setup for container
To use remote components
```typescript
  federationConfig: {
    name: "container",
    remotes: {
      app1: "app1@http://localhost:3031/remoteEntry.js",
      app2: "app2@http://localhost:3032/remoteEntry.js",
    },
  },
```


## Try it
Checkout
Run `npm run install && npm run start`

Open `http://localhost:3030/`

