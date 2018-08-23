import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NewPost from './containers/NewPost';
import Profile from './containers/Profile';
import countProfile from './containers/ProfileContainer';
import Posts from './containers/Posts';
import NotFound from './containers/NotFound';

import AppliedRoute from './components/AppliedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

// if required in applied route
// import store from './store';

export default ({ childProps }) => {
  return (
    <Switch>
      <AppliedRoute
        path="/"
        exact
        // store={store}
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
      <AuthenticatedRoute
        path="/countprofile"
        exact
        component={countProfile}
        props={childProps}
      />
      {/* Finally, catch all unmatched routes */}
      <Route component={NotFound} />
    </Switch>
  );
};
