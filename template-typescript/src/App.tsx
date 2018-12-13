import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styles from './test.module.css'
import { HashRouter as Router, Route } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"

import Loadable from 'react-loadable'

const dynamicImport = (loader:any, loading?:any) =>
  Loadable({
    loader,
    loading: loading || (()=><div>loading....</div>)
  })

const Home = dynamicImport(()=> import(/* webpackChunkName: "Home" */ './views/home'))
const User = dynamicImport(()=> import(/* webpackChunkName: "User" */ './views/user'))


class App extends Component {
 
  render(){

  return (
    <Provider store={store}>
      <Router>
           
        <div>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/user" component={User} />
        </div>
      </Router>
    </Provider>
  )
}
}

export default App;
