import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Home from '../containers/home'
import Question1 from '../containers/question1'
import Question2 from '../containers/question2'

import PublicRoute from '../utils/publicRoute'

export default () => (
  <Router>
    <Route>
      <Switch>
        <PublicRoute path="/question1" component={Question1} />
        <PublicRoute path="/question2" component={Question2} />
        <PublicRoute exact path="/" component={Home} />
      </Switch>
    </Route>
  </Router>
)