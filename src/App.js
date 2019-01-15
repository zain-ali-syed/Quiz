import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import NavBar from './components/NavBar';
import Logo from './components/Logo';
import { connect } from 'react-redux';

//component pages
import Home from './components/Home';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Quiz from './components/Quiz/Quiz';
import QuizList from './components/Quiz/QuizList';
import QuizResult from './components/Quiz/QuizResult';
import QuizHistory from './components/Quiz/QuizHistory';
import QuizLeaderBoard from './components/Quiz/QuizLeaderBoard';
import QuizGameDetails from './components/Quiz/QuizGameDetails';


const PrivateRoute = ( { component: Component, loggedIn, ...rest } ) => (
  <Route {...rest} render = { ( props ) => {
    return ( loggedIn ? <Component {...props}/> : <Redirect to="/login/"/> )
  } } />
)


class App extends Component {

  render() {
    return (
      <React.Fragment>
      <NavBar />
      <BrowserRouter>
        <div className="container center">
            <Logo />
                <Switch>
                  <Route path = "/login"  render = { (props) => <Login {...props} loggedIn = { this.props.loggedIn }/>} />
                  <PrivateRoute exact path="/" component = { Home } loggedIn = {this.props.loggedIn}/>
                  <PrivateRoute  path = "/quiz" component = { Quiz } loggedIn = {this.props.loggedIn} />
                  <PrivateRoute  path = "/quiz_list" component = { QuizList } loggedIn = {this.props.loggedIn} />
                  <PrivateRoute  path = "/quiz_result" component = { QuizResult } loggedIn = {this.props.loggedIn} />
                  <PrivateRoute  path = "/quiz_history" component = { QuizHistory } loggedIn = {this.props.loggedIn} />
                  <PrivateRoute  path = "/quiz_leaderboard" component = { QuizLeaderBoard } loggedIn = {this.props.loggedIn} />
                  <PrivateRoute  path = "/game_details/:id" component = { QuizGameDetails } loggedIn = {this.props.loggedIn} />
                  <Route  component = { PageNotFound } />
                </Switch>
        </div>
     </BrowserRouter>
     </React.Fragment>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
     setAuthenticatedUser: (user) => { dispatch({ type:"SET_AUTHENTICATED_USER", user }) },
  }
}


export default connect(null, mapDispatchToProps )(App);
