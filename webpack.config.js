const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: '/client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      // {
      //   test: /\.css$/i,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader'],
      // },
      // {
      //   test: /.(css|scss)$/,
      //   exclude: [/node_modules/, /client\/stylesheets\/modules/],
      //   use: ['style-loader', 'css-loader', 'sass-loader'],
      // },
      // {
      //   test: /.(css|scss)$/,
      //   include: [/client\/stylesheets\/modules/],
      //   use: [
      //     'style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true,
      //         localIdentName: '[name]__[local]___[hash:base64:5]',
      //       },
      //     },
      //     'sass-loader',
      //   ],
      // },
    ],
  },
  devServer: {
    publicPath: '/build/',
    proxy: {
      '/recipes': 'http://localhost:3000',
      '/auth/google': 'http://localhost:3000',
      '/auth/google/callback': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/': 'http://localhost:3000',
    },
  },
};
