const path = require( 'path' )
const webpack = require( 'webpack' )
const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
const combineLoaders = require( 'webpack-combine-loaders' )
const ExtractTextPlugin = require( 'mini-css-extract-plugin' )
const Dotenv = require( 'dotenv-webpack' );
const autoprefixer = require( 'autoprefixer' )
const postcssnested = require( 'postcss-nested' )
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' )

module.exports = {
  entry : [ 'babel-polyfill', './src/index.js' ],
  output : { path : `${__dirname}/dist/`, filename : 'bundle.js' },
  resolve : {
    extensions : [ '*', '.js', '.jsx', '.css', '.less' ],
  },

  // Necessary plugins for hot load
  plugins : [ 
    new ExtractTextPlugin( 'style.css', { allChunks : true } ),
    new UglifyJSPlugin( { uglifyOptions : {
      compress : {
        warnings : false,
        conditionals : true,
        unused : true,
        comparisons : false,
        sequences : true,
        dead_code : true,
        evaluate : true,
        if_return : true,
        join_vars : true
      },
      output : {
        comments : false
      }
    } } ),
    new Dotenv( {
      path : './.env', // Path to .env file (this is the default) 
    } ),
    new webpack.LoaderOptionsPlugin( {
      options : {
        context : `${__dirname}/dist/`,
        postcss : [
          autoprefixer,
          postcssnested
        ]
      }
    } ),
    new CopyWebpackPlugin( [
      // {output}/file.txt
      { from : 'public/index.html' },
      { from : 'src/index.js' },
      { from : 'public/favicon.ico' },
      // { from: 'src/style.css' },
      { from : 'src/images', to : 'images' },
      { from : 'src/css', to : 'css' }, // ,
      // { from: 'src/js', to : 'js'}
    ] ),
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
        query : { 
          presets : [ '@babel/preset-env', '@babel/preset-react' ], 
          plugins : [ 
            'transform-class-properties', 
            'transform-object-assign', 
            [
              'babel-plugin-root-import',  
              { rootPathPrefix : '~', rootPathSuffix : 'src' }
            ]  
          ] },
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
        loader : 'url-loader',
        // options : { limit : 8192 }, // limit => file.size =< 8192 bytes ? DataURI : File
      },
      { test : /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader : 'url-loader?mimetype=application/font-woff' },
      { test : /\.(ttf|eot)(\?v=[0-9].[0-9].[0-9])?$/, loader : 'file-loader' }, // ?name=[name].[ext]" } 
    ],
  }
}
