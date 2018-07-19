const path = require( 'path' );
const webpack = require( 'webpack' );
const combineLoaders = require( 'webpack-combine-loaders' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const Dotenv = require( 'dotenv-webpack' );
const autoprefixer = require( 'autoprefixer' )
const postcssnested = require( 'postcss-nested' )

module.exports = {
  devtool : 'cheap-module-source-map',
  entry : [ 'babel-polyfill', './src/index.js' ],
  output : { path : `${__dirname}/dist/`, filename : 'bundle.js' },
  resolve : {
    extensions : [ '*', '.js', '.jsx', '.css' ],
  },

  // Necessary plugins for hot load
  plugins : [
    new webpack.DefinePlugin( {
      'process.env' : {
        NODE_ENV : JSON.stringify( 'production' ),
      },
    } ),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin( 'style.css', { allChunks : true } ),
    new Dotenv( {
      path : './.env', // Path to .env file (this is the default) 
    } ),
    new CopyWebpackPlugin( [
      // {output}/file.txt
      { from : 'public/index.html' },
      { from : 'public/favicon.ico' },
      { from : 'src/index.js'},
      // { from: 'src/style.css' },
      { from : 'src/images', to : 'images' },
      { from : 'src/css', to : 'css' }, // ,
      // { from: 'src/js', to : 'js'}
    ] ),
    new webpack.LoaderOptionsPlugin( {
      options : {
        context : __dirname,
        postcss : [
          autoprefixer,
          postcssnested
        ]
      }
    } )
  ],

  node : {
    fs : 'empty',
  },


  module : {
    rules : [
      {
        test : /.jsx?$/,
        loader : 'babel-loader',
        exclude : /node_modules/,
        query : { presets : [ 'es2015', 'react' ], plugins : [ 'transform-class-properties', 'transform-object-assign' ] },
      },
      /* This will put all css, less, styles through CSS Modules' localization except global-style.less */
      {
        test : /\.(less|css)$/,
        exclude : /global-style\.less$/,
        use : [
          'style-loader',
          'css-loader',
          'less-loader', // if you want .less support
        ]
      },
      {
        test : /global-style\.less$/,
        use : [ 'style-loader', 'css-loader', 'less-loader' ]
      },
      { test : /\.gif$/, loader : 'url-loader?mimetype=image/png' },
      {
        test : /\.(png|jpeg|svg)$/,
        loader : 'url-loader' 
      },
      { test : /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader : 'url-loader?mimetype=application/font-woff' },
      { test : /\.(ttf|eot)(\?v=[0-9].[0-9].[0-9])?$/, loader : 'file-loader' }, // ?name=[name].[ext]" } 
    ],
  }

};
