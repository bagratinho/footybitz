import React from "react";
import Matchdays from "containers/Matchdays";
import Standings from "containers/Standings";
import Results from "containers/Results";
import Profile from "containers/Profile";
import HowToPlay from "containers/HowToPlay";
import { BrowserRouter as Router, Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import 'styles/css/global.css';
import Login from "containers/Login";
import Firebase from "components/Firebase";

const Routes: React.FC = () => {
  const isAuthenticated = Firebase.isAuthenticated();
  console.log(isAuthenticated);
  const renderProtectedPage = (Component: any) => (props: RouteComponentProps) => {
    if (isAuthenticated) {
      return <Component {...props}/>;
    } else {
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
    }
  }
  const renderLoginPage = (Component: any) => (props: RouteComponentProps) => {
    if (isAuthenticated) {
      return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
    } else {
      return <Component {...props}/>;
    }
  }

  return (
    <Router>
      <Switch>
        <Route exact={true} path="/login" render={renderLoginPage(Login)}/>
        <Route exact={true} path="/" render={renderProtectedPage(Matchdays)}/>
        <Route exact={true} path="/results" render={renderProtectedPage(Results)}/>
        <Route exact={true} path="/standings" render={renderProtectedPage(Standings)}/>
        <Route exact={true} path="/how-to-play" render={renderProtectedPage(HowToPlay)}/>
        <Route exact={true} path="/profile" render={renderProtectedPage(Profile)}/>
        {/* <Route path="/:lang/404" exact={true} component={AppService.getComponent("NotFound")} />
        <Route path="/:lang?/:page?" render={({ match, location: { search } }) => <Redirect to={`/${locale}/${match.params.page ? "404" : `home${search}`}`} />} /> */}
      </Switch>
    </Router>
  );
}

export default Routes;