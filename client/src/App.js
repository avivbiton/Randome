import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// CSS
import "./css/Bootstrap.css";
import "./css/App.css";
import "../node_modules/toastr/build/toastr.min.css";

// authentication imports
import { loginUser } from "./Authentication/auth";
import { useAuth } from "./Hooks/useAuth";


// Redux
import { Provider } from "react-redux";
import reduxStore from "./redux/store";

// Components
import LandingPage from "./Components/Pages/LandingPage";
import LoginPage from "./Components/Pages/LoginPage";
import Navbar from "./Components/Navbar";
import RandomizerPage from "./Components/Pages/RandomizerPage/RandomizerPage";
import NotFound from "./Components/Pages/NotFound";
import Browse from "./Components/Pages/browseRandomizerPage/Browse";
import RegisterPage from "./Components/Pages/RegisterPage";
import LoadingSpinner from "./Components/LoadingSpinner";
import PrivateRoute from "./Components/PrivateRoute";
import CreatePage from "./Components/Pages/CreatePage";
import ProfilePage from "./Components/Pages/ProfilePage/ProfilePage";

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
          <PrivateRoute exact path="/create" component={CreatePage} requireLogin />
          <PrivateRoute exact path="/profile" component={ProfilePage} requireLogin />
          <Route path="*" render={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
