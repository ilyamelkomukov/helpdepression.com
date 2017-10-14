var isDev = process.env.NODE_ENV == 'development',
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
      filename: isDev ? '[name].js' : '[name]-[hash].js'
    }
  };

module.exports = config;
