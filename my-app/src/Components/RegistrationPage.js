import React, { Component } from "react";
import fire from "../config/fire"; 

export default class SignUp extends Component {

   constructor(props) {
        super(props);
    this.signUp = this.signUp.bind(this);
    }

    signUp() {
      fire.auth().createUserWithEmailAndPassword(this.username.value, this.password.value)
          .then((u) => {
            console.log('Successfully Signed Up');
          })
          .catch((err) => {
            alert(err.toString());
            console.log('Error: ' + err.toString());
          })
      }

    render() {
        return (
            <form onSubmit={this.signUp()} action="/NewsFeed">
                <h3>signup</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"  ref={(username) => { this.username = username }}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input  type="password" className="form-control" placeholder="Enter password" ref={(password) => { this.password = password }}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block" >Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/LoginPage">sign in?</a>
                </p>
            </form>
        );
    }
}