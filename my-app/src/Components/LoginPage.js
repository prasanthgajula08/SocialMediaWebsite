import React, { useState, useEffect } from 'react';
import fire from '../config/fire';

export default function LoginPage() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");


    const handleUserNameChange = (event) => {
        setUserName(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }


  const validateUserInput = async (event) => {
        event.preventDefault();
        await fire.auth().signInWithEmailAndPassword(userName,password)

        .then((u) => {
            console.log('Successfully LoggedIn');
            window.location.replace("/NewsFeed")
          })
          .catch((err) => {
            alert(err.toString());
            console.log('Error: ' + err.toString());
          })

      }

    return (
        <div>
        <form /*action="/NewsFeed"*/>
            <h3>Login</h3>

            <div className="form-group">
                <label>User Name</label>
                <input type="text" className="form-control" placeholder="Enter User Name" onChange={handleUserNameChange}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" onChange={handlePasswordChange}/>
            </div>

           <button onClick={validateUserInput} className="btn btn-primary btn-block">Submit</button>

           <p> New to InstaBook ? <a href="/">SIGNUP</a> </p>

            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
           
           {/* <div>
              <GoogleLogin
               clientId="791659548746-3fejvutdso1a7cvn681ampphavpseqfg.apps.googleusercontent.com"
               buttonText="SignIn with Google"
               onSuccess={this.responseGoogle}
               onFailure={this.responseGoogle}
               cookiePolicy={'single_host_origin'}
               />
            </div> */}
        </form>
        </div>
    );
}