const webpack = require( 'webpack' );
const WebpackBar = require( 'webpackbar' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const Dotenv = require( 'dotenv-webpack' );
const autoprefixer = require( 'autoprefixer' )
const postcssnested = require( 'postcss-nested' )

module.exports = {
  entry : [ 
    '@babel/polyfill',
    './src/index.jsx' 
  ],

  node : {
    fs : 'empty'
  },

  resolve : {
    extensions : [ '*', '.js', '.jsx', '.css' ]
  },

  module : {
    rules : [
      {
        test : /.jsx?$/,
        loader : 'babel-loader',
        exclude : /node_modules/,
        query : {
          presets : [ '@babel/preset-env', '@babel/preset-react' ]
        }
      },
      /* This will put all css, less, styles through CSS Modules' localization except global-style.less */
      {
        test : /\.(less|css)$/,
        exclude : [ /global-style\.css$/ ],
        use : [
          'style-loader',
          {
            loader : 'css-loader',
            options : {
              importLoaders : 1
            }
          },
          'less-loader', // if you want .less support
        ]
      },
      {
        test : [ /global-style\.css$/ ],
        use : [ 'style-loader', 'css-loader', 'less-loader' ]
      },
      { test : /\.gif$/, loader : 'url-loader?mimetype=image/png' },
      {
        test : /\.(png|jpeg)$/,
        loader : 'url-loader',
        options : { limit : 8192 }, // limit => file.size =< 8192 bytes ? DataURI : File

      },
      { test : /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader : 'url-loader?mimetype=application/font-woff' },
      { test : /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader : 'file-loader' }, // ?name=[name].[ext]" } 
    ],
  }
};
