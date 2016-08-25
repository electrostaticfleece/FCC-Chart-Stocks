import express from 'express';
import webpack from 'webpack';
import http from 'http';
import path from 'path';

import socketServer from './socket-server';
import { connect } from './db';

const App = require('../public/assets/server');
const app = express();
const server = http.Server(app);
app.set('socketPort', (process.env.PORT || 5000));

//Connect to Postgres and register Schema
connect();

//All socket requests are passed to the socket server
socketServer(server);

//Webpack configuration for development and allows for HMR
if(process.env.NODE_ENV === 'development') {
  const webpackDevConfig = require('../webpack/webpack.config.dev-client');
  const compiler = webpack(webpackDevConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

//All requests are passed down to be rendered on the server before 
//being rendered on the client. 
app.get('*', App.default);


server.listen(app.get('socketPort'), () => {
  console.log('Now listening on ' + app.get('socketPort'))
});