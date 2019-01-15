import React, { Component } from 'react';
import { firebase } from './firebase';
import {addDocumentToCollection} from './utils';
import { Redirect } from 'react-router-dom';



class Register extends Component {

    state = {
        display_name:"",
        email:'',
        password:''
    }

    handleChange = (e) => {
        this.setState({ [e.target.id] : e.target.value });
    }

    handleSubmit = (e) => {
       e.preventDefault();
       firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
               .then(() => { console.log("push to dashboard")
                const {email, uid } =  firebase.auth().currentUser;
               //now add this new user to the users collection in the db
               addDocumentToCollection("users", {email, uid, display_name: this.state.display_name, points:0});

            })
               .catch(err => console.log(err.message))
    }

    render() {

        if(this.props.loggedIn) return <Redirect to="/" />

        return (
            <div className="container" style={{width:"40%"}}>
            <p>Register</p>
            
                <div>
                    <form onSubmit = { this.handleSubmit }>
                        <input  id="display_name" type="text" placeholder="Choose a display name" onChange={this.handleChange} />
                        <input  id="email" type="text" placeholder="email" onChange={this.handleChange} />
                        <input  id="password" type="password" placeholder="password" onChange={this.handleChange}/>
                        <button className="waves-effect waves-light btn-small light-blue accent-2" type="submit">
                            Register
                        </button>
                    </form>
                   
                </div>
            </div>
        );
    }
}

export default Register;