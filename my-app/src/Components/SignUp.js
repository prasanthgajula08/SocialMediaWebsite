import React from 'react'
import fire from '../config/fire'
import './SignUp.css'

function SignUp(props) {
    const db = fire.firestore()

    const signUpHandler = async (event) => {
        event.preventDefault()
        await fire.auth().createUserWithEmailAndPassword(event.target.emailInput.value, event.target.passwordInput.value)
        await db.collection('usersData').doc(event.target.emailInput.value).set({
            username: event.target.userNameInput.value,
            email: event.target.emailInput.value,
            posts: 0,
            firstName: event.target.firstNameInput.value,
            lastName: event.target.lastNameInput.value,
            followers: 0,
            following: 0,
            bio: "",
            profilePicture: "https://picsum.photos/150/150"
        })
        
            .then((u) => {
              console.log('Successfully Signed Up');
              window.location.replace("/NewsFeed")
            })
            .catch((err) => {
              alert(err.toString());
              console.log('Error: ' + err.toString());
            })
        }

    return (
        <div>
            <form onSubmit={signUpHandler} class="box">
                <h1>Register Now</h1>

                <p class="text-muted"> Please enter your details to signup!</p>

                    
                    <input name="firstNameInput" type="text" className="form-control" placeholder="Enter FirstName" />

                    <input name="lastNameInput" type="text" className="form-control" placeholder="Enter LastName" />

                    <input name="userNameInput" type="text" className="form-control" placeholder="Enter UserName" />

                    <input name="emailInput" type="text" className="form-control" placeholder="Enter email" />

                    <input name="passwordInput" type="password" className="form-control" placeholder="Enter password"/>

                <input type="submit" name="" value="Sign Up"/>
                <p class="text-muted"> Already Registered? <a className="forgot text-muted" href="/LoginPage">Sign In</a></p>
            </form>
        </div>
    )
}

export default SignUp;