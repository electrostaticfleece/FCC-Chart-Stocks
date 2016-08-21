import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import ChartDisplay from 'containers/ChartDisplay';
import TestRoute from 'containers/TestRoute';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */

export default (store, directory) => {

  function connectSocket() {
    if(directory && store) {
      const { dispatch } = store;
      directory.connect();
      directory.syncEmit(dispatch, 'main');
    }
  }

  function disconnectSockets() {
    if (directory && store) {
      console.log('exiting');
      directory.disconnectAll();
    }
  }

  return (
    <Route path="/" component = { App } >
      <IndexRoute component = { ChartDisplay } onEnter = { connectSocket } onLeave = { disconnectSockets } />
      <Route path="test" component = { TestRoute } />
    </Route>
  );
};