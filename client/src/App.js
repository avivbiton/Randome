import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./css/Bootstrap.css";
import "./css/App.css";

import firebase from "firebase/app";
import { initializeAuth, loginUser } from "./Authentication/auth";
import { Provider } from "react-redux";
import reduxStore from "./redux/store";
import LandingPage from "./Components/Pages/LandingPage";
import LoginPage from "./Components/Pages/LoginPage";
import Navbar from "./Components/Navbar";
import RandomizerPage from "./Components/Pages/RandomizerPage/RandomizerPage";
import { useAuth } from "./Hooks/useAuth";
import NotFound from "./Components/Pages/NotFound";
import Browse from "./Components/Pages/browseRandomizerPage/Browse";
import RegisterPage from "./Components/Pages/RegisterPage";
import LoadingSpinner from "./Components/LoadingSpinner";

const config = {
  apiKey: "AIzaSyCFSriU_52e_TB-SK-8Z2FMuYzTCoAOeag",
  authDomain: "randome-1564044096001.firebaseapp.com",
};
firebase.initializeApp(config);
initializeAuth();


function App() {

  const { initializing } = useAuth();

  if (initializing) return (
    <div className="container">
      <div className="row text-center mt-4">
        <div className="col">
          <LoadingSpinner size="lg" animation="grow" />
        </div>
      </div>
    </div>
  );

  return (
    <Provider store={reduxStore}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/randomizer/:id" component={RandomizerPage} />
          <Route exact path="/login" render={props => <LoginPage onLogin={loginUser} {...props} />} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/browse" component={Browse} />
          <Route path="*" render={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
