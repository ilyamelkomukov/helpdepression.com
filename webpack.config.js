let UglifyJSPlugin = require('uglifyjs-webpack-plugin'),

  plugins = [
    new UglifyJSPlugin({
      uglifyOptions: {
        ecma: 7,
        mangle: true,
        compress: true,
        warnings: false
      }
    })
  ],
  isDev = process.env.NODE_ENV == 'development',
  bundleName = isDev ? '[name].js' : `[name]-${(Date.now() + '').slice(-8)}.js`
  config = {
    devtool: isDev ? 'cheap-eval-source-map' : false,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              ["env", {
                "targets": {
                  "browsers": ['>1%', "last 10 versions", "IE 9"]
                }
              }]
            ]
          }
        }
      ]
    },
    output: {
      filename: bundleName
    },
    plugins: isDev ? [] : plugins
  };

module.exports = config;
