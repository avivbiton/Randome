import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./css/Bootstrap.css";


import { Provider } from "react-redux";
import reduxStore from "./redux/store";
import LandingPage from "./Components/Pages/LandingPage";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Provider store={reduxStore}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/home" component={LandingPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
