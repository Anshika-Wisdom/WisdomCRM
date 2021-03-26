import React, { Component } from "react";
import logo from "./logo.svg";
import PostLogin from "./components/postLogin";
import Leadfollowupmain from "./components/leadfollowupmain";
import "./App.css";
import {Route,Switch,Redirect} from "react-router-dom";
import "./components/stylesheet.css";

class App extends Component {
  render() {
    return (
      < div className="container-fluid stageColor"> 
        <PostLogin />
        <Switch>
        {/* <Route path="/login" component={Login} /> */}
        <Route path="/postLogin" component={PostLogin} />
        <Route path="/leadfollowupmain" component={Leadfollowupmain} />
        </Switch>
      </div>
    );
  }
}

export default App;