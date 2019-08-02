const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader?-autoprefixer&sourceMap=true&importLoaders=1', 'postcss-loader']
        })
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg|ico)$/, loader: 'url-loader?limit=100000' },
      {
        test: /\.(jp(e*)g)$/,
        use: [{
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]'
            }
        }]
      },{
        test: /\.png$/,
        use: [{
          loader: 'url-loader?mimetype=image/png',
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]',
          },
        }],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.template.ejs',
      inject: 'body', 
    }),
    new ExtractTextPlugin("[hash]-styles.css"),
  ],
};
