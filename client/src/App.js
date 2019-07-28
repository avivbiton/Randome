import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./css/Bootstrap.css";
import "./css/App.css";

import firebase from "firebase";
import { initializeAuth } from "./Authentication/auth";
import { Provider } from "react-redux";
import reduxStore from "./redux/store";
import LandingPage from "./Components/Pages/LandingPage";
import LoginPage from "./Components/Pages/LoginPage";
import Navbar from "./Components/Navbar";
import RandomizerPage from "./Components/Pages/RandomizerPage/RandomizerPage";

const config = {
  apiKey: "AIzaSyCFSriU_52e_TB-SK-8Z2FMuYzTCoAOeag",
  authDomain: "randome-1564044096001.firebaseapp.com",
};
firebase.initializeApp(config);
initializeAuth();


function App() {
  return (
    <Provider store={reduxStore}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/randomizer/:id" component={RandomizerPage} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
