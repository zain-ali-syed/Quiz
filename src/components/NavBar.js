import React from 'react';
import { connect } from 'react-redux';
import { firebase } from './firebase';
import { Redirect} from 'react-router-dom';


const logout = (props) => {
    firebase.auth().signOut().then(() => { 
        props.loggedOut();
        console.log("redirect to login")
        return <Redirect to="/login" /> });
    }

const NavBar = (props) => {

    console.log("props ", props)
    return (
        <nav>
            <div className="nav-wrapper purple darken-4">
              <a href="b" className="brand-logo right">Brain Power </a>
              { 
                props.authenticated.user !== null && 
                <div style={{fontSize:'20px', paddingLeft:'10px'}}>
                        <button className="waves-effect waves-light btn-small light-blue accent-2" type="submit" onClick={() => logout(props)}>
                            Sign Out
                        </button>
                        <span style={{marginLeft:'10px'}}>Points: {props.points} | User: {props.display_name}</span>
                              
                </div>
              }
            </div>
        </nav>
    );
};


const mapStateToProps = (state) => {
  return { 
           authenticated: state.authenticated,
           points: state.points,
           display_name: state.display_name
         }
}

const mapDispatchToProps = (dispatch) => {
    return {
       loggedOut: () => { dispatch({ type:"LOGGED_OUT" }) }
    }
  }
  


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);