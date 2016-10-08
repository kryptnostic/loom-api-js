/*
 * @flow
 */

/* eslint-disable no-underscore-dangle, import/no-extraneous-dependencies */

import Webpack from 'webpack';

import PACKAGE from '../package.json';

import LIB_CONFIG from './lib.config.js';
import LIB_PATHS from './lib.paths.js';

import {
  isDev,
  ifDev,
  ifProd,
  ifMin,
  ifNode,
  TARGET_ENV
} from './env.js';

function compact(arr :Array<any>) :Array<any> {
  return arr.filter((element :any) => {
    return !!element;
  });
}

/*
 * loaders
 */

const BABEL_LOADER = {
  loader: 'babel',
  test: /\.js$/,
  include: [
    LIB_PATHS.SOURCE,
    LIB_PATHS.TEST
  ]
};

const JSON_LOADER = {
  loader: 'json',
  test: /\.json$/
};

/*
 * plugins
 */

const BANNER_PLUGIN = new Webpack.BannerPlugin({
  banner: LIB_CONFIG.BANNER,
  entryOnly: true
});

const DEFINE_PLUGIN = new Webpack.DefinePlugin({
  __API_ENDPOINTS__: JSON.stringify(LIB_CONFIG.API_ENDPOINTS),
  __DEV__: JSON.stringify(isDev),
  __VERSION__: JSON.stringify(`v${PACKAGE.version}`)
});

const DEV_PLUGINS = [
  new Webpack.NamedModulesPlugin()
];

const PROD_PLUGINS = [
  new Webpack.optimize.DedupePlugin(),
  new Webpack.optimize.OccurrenceOrderPlugin(),
  new Webpack.LoaderOptionsPlugin({
    minimize: ifMin(true, false),
    debug: false
  }),
  ifMin(
    new Webpack.optimize.UglifyJsPlugin({
      comments: false
    })
  )
];

/*
 * webpack config
 */

export default {
  bail: true,
  entry: LIB_PATHS.ENTRY,
  output: {
    library: LIB_CONFIG.LIB_NAMESPACE,
    libraryTarget: 'umd',
    path: LIB_PATHS.BUILD,
    publicPath: '/',
    filename: ifMin(
      ifNode(`${LIB_CONFIG.LIB_FILE_NAME}.node.min.js`, `${LIB_CONFIG.LIB_FILE_NAME}.min.js`),
      ifNode(`${LIB_CONFIG.LIB_FILE_NAME}.node.js`, `${LIB_CONFIG.LIB_FILE_NAME}.js`)
    )
  },
  module: {
    rules: [
      BABEL_LOADER,
      JSON_LOADER
    ],
    noParse: []
  },
  plugins: compact([
    ...ifDev(DEV_PLUGINS, []),
    ...ifProd(PROD_PLUGINS, []),
    DEFINE_PLUGIN,
    BANNER_PLUGIN
  ]),
  resolve: {
    extensions: ['.js'],
    alias: {},
    modules: [
      LIB_PATHS.SOURCE,
      LIB_PATHS.NODE
    ]
  },
  target: TARGET_ENV
};
