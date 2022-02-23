const path = require('path');
const extraNodeModules = {
  'react-native-hold-menu': path.resolve(__dirname, '../src'),
};

const extraNodeModulesProxy = new Proxy(extraNodeModules, {
  get: function (target, name) {
    if (target[name]) {
      return target[name.toString()];
    } else {
      return path.join(process.cwd(), `node_modules/${name.toString()}`);
    }
  },
});

module.exports = {
  projectRoot: path.resolve(__dirname),
  watchFolders: [path.resolve(__dirname, '../src')],
  resolver: {
    extraNodeModules: extraNodeModulesProxy,
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
  },
};
