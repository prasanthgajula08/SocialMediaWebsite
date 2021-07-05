import React, { useState, useEffect } from 'react';
import NavBar from './NavBar'
import fire from '../config/fire';
import PostCard from './PostCard';
import UserInfo from './UserInfo';
import '../Styles/UserProfile.css'

export default function NewsFeed() {
    const db = fire.firestore()

    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])
    const [postCards, setPostCards] = useState([])
    const [userProfile, setUserProfile] = useState(<UserInfo profilePicture="https://picsum.photos/150/150" username="" postsNumber="69" followersNumber="70" followingNumber="71" fullName="Prasanth Chakravarthy Gajula" bio="Hakuna Matata"/>)

    useEffect(() => {
        const clearAuth =fire.auth().onAuthStateChanged(function(authUser) {
            if (authUser) {
                setUser(authUser)
                console.log(authUser)
                setUserProfile(<UserInfo profilePicture="https://picsum.photos/150/150" username={authUser.email} postsNumber="69" followersNumber="70" followingNumber="71" fullName="Prasanth Chakravarthy Gajula" bio="Hakuna Matata"/>)
                db.collection("usersData").doc(authUser.email).collection("posts").onSnapshot(snapshot => {
                    setPosts(snapshot.docs.map(doc => doc.data()))
                })
                console.log(posts)
            } else {
              console.log("user signedout")
            }
        });

        return () => {
            clearAuth()
        }
    }, [user ,db])

    useEffect(() => {
        setPostCards(posts.map((post) => {
            return (
                <PostCard fileURL={post.fileURL} username={user.email} postDescription={post.postDescription} likes={post.likes}/>
            )
        }))
    }, [posts ,db])

    return (
        <div>
            <NavBar />
            <div className="userProfileStyle">
            <br></br>
                {userProfile}
                <br></br>
                {postCards}
            </div>
        </div>
    );
}