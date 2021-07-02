import React, { Component } from 'react'
import fire from '../config/fire';
import NavBar from './NavBar'
import PostCard from './PostCard';
import UserInfo from './UserInfo';
import '../Styles/UserProfile.css'

export class dummyPrasanth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username : "",
            fileURLs : [],
            postCards : []
        }
        fire.auth().onAuthStateChanged(function(user) {
            if (user) {
                fire.firestore().collection("usersData").doc(fire.auth().currentUser.email).collection("posts").onSnapshot(snapshot => {
                    this.setState({
                        username: fire.auth().currentUser.email,
                        fileURLs: snapshot.docs.map(doc => doc.data()),
                        postCards: []
                    })
                })
            } else {
              console.log("user signedout")
            }
        }.bind(this));
        console.log(this.state.username)
        console.log(this.state.fileURLs)
        this.setState({
            username: this.state.username,
            fileURLs: this.state.fileURLs,
            postCards: this.state.fileURLs.map((fileURL) => {
                return (
                    <PostCard fileURL={fileURL} username={this.state.username} postDescription="Hello World!" likes="500"/>
                )
            })
        })
        console.log(this.state)
    }

    componentDidMount() {
        
    }
    
    render() {
        return (
            <div>
                <NavBar />
                <div className="userProfileStyle">
                <br></br>
                    <UserInfo profilePicture="https://picsum.photos/150/150" username="Prasanth Gajula" postsNumber="69" followersNumber="70" followingNumber="71" fullName="Prasanth Chakravarthy Gajula" bio="Hakuna Matata"/>
                    <br></br>
                    {this.state.postCards}
                </div>
            </div>
        )
    }
}

export default dummyPrasanth
