import React, { Component } from "react";
import GoogleLogin from "react-google-login";

export default class Login extends Component {
    
    responseGoogle=(response)=>{
        console.log(response);
        
    }
    
    render() {
        return (
            <div>
            <form action="/NewsFeed">
                <h3>Login</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

               <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
               
               <div>
                  <a href="/NewsFeed"> <GoogleLogin
                   clientId="791659548746-3fejvutdso1a7cvn681ampphavpseqfg.apps.googleusercontent.com"
                   buttonText="SignIn with Google"
                   onSuccess={this.responseGoogle}
                   onFailure={this.responseGoogle}
                   cookiePolicy={'single_host_origin'}
                   /> </a>
                </div>
            </form>
            </div>
        );
    }
}