import React from 'react'
import fire from '../config/fire'

function SignUp(props) {
    const db = fire.firestore()

    const signUpHandler = async (event) => {
        event.preventDefault()
        await fire.auth().createUserWithEmailAndPassword(event.target.usernameInput.value, event.target.passwordInput.value)
        await db.collection('usersData').doc(event.target.usernameInput.value).set({
            username: event.target.usernameInput.value,
            posts: 0
        })
       
            .then((u) => {
              console.log('Successfully Signed Up');
              window.location.replace("/UserProfile")
            })
            .catch((err) => {
              alert(err.toString());
              console.log('Error: ' + err.toString());
            })
        }

    return (
        <div>
            <form onSubmit={signUpHandler}>
                <h3>signup</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                {/* <div name="usernameDiv" className="form-group"> */}
                    <label>Email address</label>
                    <input name="usernameInput" type="email" className="form-control" placeholder="Enter email" />
                {/* </div> */}

                {/* <div name="passwordDiv" className="form-group"> */}
                    <label>Password</label>
                    <input name="passwordInput" type="password" className="form-control" placeholder="Enter password"/>
                {/* </div> */}

                <button type="submit" className="btn btn-primary btn-block" >Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/LoginPage">sign in?</a>
                </p>
            </form>
        </div>
    )
}

export default SignUp;