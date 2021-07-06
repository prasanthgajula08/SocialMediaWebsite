import React from 'react'
import './dummy.css'

function dummy() {
    return (
        <div class="card">
        <form onsubmit="event.preventDefault()" class="box">
            <h1>Login</h1>
            <p class="text-muted"> Please enter your email and password!</p>
             <input type="text" name="" placeholder="Email"/>
              <input type="password" name="" placeholder="Password"/> 
              <a class="forgot text-muted" href="#">Forgot password?</a>
              <p class="text-muted"> Don't have an account? <a class="forgot text-muted" href="#">Sign Up</a></p>
               <input type="submit" name="" value="Login" href="#"/>
            
        </form>
    </div>
        
    )
}

export default dummy;
