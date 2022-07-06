import React from "react";
import Matchdays from "containers/Matchdays";
import Standings from "containers/Standings";
import Results from "containers/Results";
import Profile from "containers/Profile";
import HowToPlay from "containers/HowToPlay";
import { BrowserRouter as Router, Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import "styles/css/global.css";
import { useAuth } from "context/AuthContext";
import PasswordReset from "containers/PasswordReset";
import Signin from "containers/Signin";
import Signup from "containers/Signup";
import Teams from "containers/Teams";
import Competitions from "containers/Competitions";
import AdminMatchdays from "containers/AdminMatchdays";

const Routes = () => {
  const { user } = useAuth();
  const renderProtectedRoute = (Component: any, user: boolean) => (props: RouteComponentProps) => {
    if (user) {
      return <Component {...props}/>;
    } else {
      return <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />;
    }
  }
  const renderUnprotectedRoute = (Component: any, user: boolean) => (props: RouteComponentProps) => {
    if (user) {
      return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
    } else {
      return <Component {...props}/>;
    }
  }

  return (
    <Router>
      <Switch>
        <Route exact={true} path="/signin" render={renderUnprotectedRoute(Signin, user)}/>
        <Route exact={true} path="/signup" render={renderUnprotectedRoute(Signup, user)}/>
        <Route exact={true} path="/password-reset" render={renderUnprotectedRoute(PasswordReset, user)}/>
        <Route exact={true} path="/" render={renderProtectedRoute(Matchdays, user)}/>
        <Route exact={true} path="/teams" render={renderProtectedRoute(Teams, user)}/>
        <Route exact={true} path="/competitions" render={renderProtectedRoute(Competitions, user)}/>
        <Route exact={true} path="/admin-matchdays" render={renderProtectedRoute(AdminMatchdays, user)}/>
        <Route exact={true} path="/results" render={renderProtectedRoute(Results, user)}/>
        <Route exact={true} path="/standings" render={renderProtectedRoute(Standings, user)}/>
        <Route exact={true} path="/how-to-play" render={renderProtectedRoute(HowToPlay, user)}/>
        <Route exact={true} path="/profile" render={renderProtectedRoute(Profile, user)}/>
        {/* <Route path="/:lang/404" exact={true} component={AppService.getComponent("NotFound")} />
        <Route path="/:lang?/:page?" render={({ match, location: { search } }) => <Redirect to={`/${locale}/${match.params.page ? "404" : `home${search}`}`} />} /> */}
      </Switch>
    </Router>
  );
}

export default Routes;