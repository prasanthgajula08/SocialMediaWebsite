import React, { useState, useEffect } from 'react';
import fire from '../config/fire';
import '../Styles/LoginPage.css'

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
        <div className="bodyClass">
        
        <form onsubmit="event.preventDefault()" class="box">
            <h1>Login</h1>
            <p class="text-muted"> Please enter your email and password!</p>
            <br></br>
            
             <input type="text" name="" placeholder="Email" onChange={handleUserNameChange}/>
              <input type="password" name="" placeholder="Password" onChange={handlePasswordChange}/> 

              <input onClick={validateUserInput} type="submit" name="" value="Login"/>
              <br></br>
              <a class="forgot text-muted" href="#">Forgot password?</a>
              <br></br><br></br>
              <p class="text-muted"> Don't have an account? <a class="forgot text-muted" href="/">Sign Up</a></p>
              
            
        </form>

         {/* <div>
              <GoogleLogin
               clientId="791659548746-3fejvutdso1a7cvn681ampphavpseqfg.apps.googleusercontent.com"
               buttonText="SignIn with Google"
               onSuccess={this.responseGoogle}
               onFailure={this.responseGoogle}
               cookiePolicy={'single_host_origin'}
               />
            </div> */}

        </div>
    );
}