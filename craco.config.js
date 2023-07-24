const CracoLessPlugin = require("craco-less");

module.exports = {
  
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color":"rgba(12,80,163,255)"
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};