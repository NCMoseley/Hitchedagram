import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NewPost from './containers/NewPost';
import Posts from './containers/Posts';
import NotFound from './containers/NotFound';
import AppliedRoute from './components/AppliedRoute';

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute
      path="/posts/new"
      exact
      component={NewPost}
      props={childProps}
    />
    <AppliedRoute
      path="/posts/:id"
      exact
      component={Posts}
      props={childProps}
    />
    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
