import React, { Component, lazy, Suspense } from 'react';
import './App.css';
import { HashRouter as Router, Route, NavLink } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"



const Home =  lazy(()=> import(/* webpackChunkName: "Home" */ './views/home'))
const User =  lazy(()=> import(/* webpackChunkName: "User" */ './views/user'))


class App extends Component {
 
  render(){

  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div>loading</div>}>
          <div>
            <ul>
              <li><NavLink to={{pathname: '/'}}>to home</NavLink></li>
              <li><NavLink  to={{pathname: '/user'}}>to user</NavLink></li>
            </ul>
            
            <Route exact={true} path="/" component={()=><Home />} />
            <Route exact={true} path="/user" component={()=><User />} />
          </div>
          </Suspense>
        </Router>
    </Provider>
  )
}
}

export default App;
