import React, { useState, useEffect } from 'react'
import {Switch, Route, NavLink} from 'react-router-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios'

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';

import Login from "./Login"
import Dashboard from './Dashboard'
import Home from './Home'

import { getToken, removeUserSession, setUserSession } from './Utils/Common';

export default function App() {

  const [authLoading, setAuthLoading] = useState(true)
  
  useEffect(() => {
    const token = getToken()
    if (!token) {
      return
    }
 
    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch( error => {
    removeUserSession();
    setAuthLoading(false);
    });
}, [])
 
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }
 
  return (
    <div className = 'App'>
      <Router>
        <div>

          <div className = 'header'>

            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>

          </div>

          {/* Navlink simply makes a navbar component which is used by Switch and Route to route to the given path, as done by a href */}

          <div className="content">

            <Switch>

              <Route exact path="/" component={Home} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path='/dashboard' component={Dashboard} />

            </Switch>

          </div>

        </div>
      </Router>
    </div>
  )
}

