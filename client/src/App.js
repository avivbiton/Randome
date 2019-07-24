import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./css/Bootstrap.css";
import "./css/App.css";

import { Provider } from "react-redux";
import reduxStore from "./redux/store";
import LandingPage from "./Components/Pages/LandingPage";
import Navbar from "./Components/Navbar";
import RandomizerPage from "./Components/Pages/RandomizerPage/RandomizerPage";

function App() {
  return (
    <Provider store={reduxStore}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/randomizer/:id" component={RandomizerPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
