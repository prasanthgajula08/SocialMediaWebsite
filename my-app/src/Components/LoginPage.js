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
        console.log('Successfully Logged In');
        window.location.replace('/newsFeed');
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
           
           

            {/* <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div> */}

           <button onClick={validateUserInput} className="btn btn-primary btn-block">Submit</button>
           <p className="forgot-password text-right">
                    Already registered <a href="/SignUp">SIGN UP?</a>
                </p>
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