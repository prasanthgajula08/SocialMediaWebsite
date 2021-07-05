import React from 'react'
import fire from '../config/fire'

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
            <form onSubmit={signUpHandler}>
                <h3>signup</h3>

                    <label>FirstName</label>
                    <input name="firstNameInput" type="text" className="form-control" placeholder="Enter FirstName" />

                    <label>LastName</label>
                    <input name="lastNameInput" type="text" className="form-control" placeholder="Enter LastName" />

                    <label>UserName</label>
                    <input name="userNameInput" type="text" className="form-control" placeholder="Enter UserName" />

                    <label>Email address</label>
                    <input name="emailInput" type="email" className="form-control" placeholder="Enter email" />
                
                    <label>Password</label>
                    <input name="passwordInput" type="password" className="form-control" placeholder="Enter password"/>

                <button type="submit" className="btn btn-primary btn-block" >Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/LoginPage">sign in?</a>
                </p>
            </form>
        </div>
    )
}

export default SignUp;