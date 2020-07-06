import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Home from './Components/Home';
import Editor from './Components/Editor';

class App extends React.Component{

  constructor(){
    super();
  }



render(){
  return (
  
    <Router>
        <div>
          <Route path="/home" component={Home} />
          <Route path="/editor" 
          render={props => (
            sessionStorage.getItem("entered") ?
            <Editor/> :
            <Redirect to="/home"/>
          )} 
      />        
      </div>
      </Router>
  );
}
}
export default App;
