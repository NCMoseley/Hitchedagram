import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index';

import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NewPost from './containers/NewPost';
import Profile from './containers/Profile';
import Posts from './containers/Posts';
import NotFound from './containers/NotFound';

import AppliedRoute from './components/AppliedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import async from './middlewares/async.js';

export default ({ childProps }) => {
  const store = createStore(reducers, applyMiddleware(async));

  return (
    <Switch>
      <AppliedRoute
        path="/"
        exact
        store={store}
        component={Home}
        props={childProps}
      />
      <UnauthenticatedRoute
        path="/login"
        exact
        component={Login}
        props={childProps}
      />
      <UnauthenticatedRoute
        path="/signup"
        exact
        component={Signup}
        props={childProps}
      />
      <AuthenticatedRoute
        path="/posts/new"
        exact
        component={NewPost}
        props={childProps}
      />
      <AuthenticatedRoute
        path="/posts/:id"
        exact
        component={Posts}
        props={childProps}
      />
      <AuthenticatedRoute
        path="/profile"
        exact
        component={Profile}
        props={childProps}
      />
      {/* Finally, catch all unmatched routes */}
      <Route component={NotFound} />
    </Switch>
  );
};
