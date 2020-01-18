import React, { Component,Fragment } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Card from './components/Cart/card';
import Default from './components/Default';
import Modal from './components/Modal';





class App extends Component {

  render(){

    return (
      <Fragment>
        <Navbar />
        <Switch>
          <Route path = "/" exact component = { ProductList}/>
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Card} />
          <Route component={Default} />
        </Switch>
        <Modal/>
    
      </Fragment>
    );

  }
 
}

export default App;
