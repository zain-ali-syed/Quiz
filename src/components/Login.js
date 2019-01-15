import React, { Component } from 'react';
import { firebase } from './firebase';
import { Redirect, Link } from 'react-router-dom';


class Login extends Component {

    state = {
        email:'',
        password:''
    }

    handleChange = (e) => {
        this.setState({ [e.target.id] : e.target.value });
    }

    handleSubmit = (e) => {
       e.preventDefault();
       firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
               .then(() => { return <Redirect to="/quiz" /> })
               .catch(err => console.log(err.message))
    }

    render() {

        if(this.props.loggedIn) return <Redirect to="/" />

        return (
            <div className="container" style={{width:"40%"}}>
                <p>Sign In</p>
                
                    <div>
                        <form onSubmit = { this.handleSubmit }>
                            <input  id="email" type="text" placeholder="email" onChange={this.handleChange} />
                            <input  id="password" type="password" placeholder="password" onChange={this.handleChange}/>
                            <button className="waves-effect waves-light btn-small light-blue accent-2" type="submit">
                                Login
                            </button>
                        </form>
                        <p style={{fontSize:'10px'}}>Or <Link to="/register">register</Link> for a new account</p>
                       
                    </div>
                </div>
        );
    }
}

export default Login;