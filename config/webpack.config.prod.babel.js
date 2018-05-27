import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = {
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: [
    'babel-polyfill',
    path.join(__dirname, '../index.jsx'),
  ],
  output: {
    path: path.join(__dirname, '../build'),
    publicPath: '/',
    filename: 'bundle.min.js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'react',
              ['env', {
                targets: {
                  browsers: 'last 2 versions',
                },
              }],
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: 'file-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        CLIENT_ID: JSON.stringify(process.env.CLIENT_ID),
        CLOUD_NAME: JSON.stringify(process.env.CLOUD_NAME),
      },
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};

export default config;
