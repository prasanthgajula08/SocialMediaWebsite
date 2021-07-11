import React, { useState, useEffect } from 'react';
import NavBar from './NavBar'
import fire from '../config/fire';
import PostCard from './PostCard';
import UserInfo from './UserInfo'
import UserInfo2 from './userinfo2'
import '../Styles/UserProfile.css'

function SearchProfile(props) {
    const db = fire.firestore()

    const [user, setUser] = useState(props.match.params.personId)
    const [posts, setPosts] = useState([])
    const [postCards, setPostCards] = useState([])
    const [userProfile, setUserProfile] = useState(<UserInfo2 profilePicture="" username="" postsNumber="0" followersNumber="0" followingNumber="0" fullName="" bio="" currentuser=""/>)
    const [isFollowing, setFollowing] = useState(false)

    useEffect(() => {
                var docRef = db.collection('usersData').doc(user)
                docRef.get().then((doc) => {
                    if (doc.exists) {
                        setUserProfile(<UserInfo2 profilePicture={doc.data().profilePicture} username={doc.data().username} postsNumber={doc.data().posts} followersNumber={doc.data().followers_count} followingNumber={doc.data().following_count} fullName={doc.data().firstName + " " + doc.data().lastName} bio={doc.data().bio}/>)
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });

                db.collection("usersData").doc(user).collection("posts").onSnapshot(snapshot => {
                    setPosts(snapshot.docs.map(dc => dc.data()))
                })
                console.log(posts)
                docRef.get().then((doc) => {
            
                    if (doc.exists) {
                        console.log(doc.data().followers)
                    }

        })

    }, [user ,db])

    useEffect(() => {
        db.collection("usersData").doc(user).collection("posts").onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    useEffect(() => {
        setPostCards(posts.map((post) => {
            return (
                <PostCard fileURL={post.fileURL} username={user} postDescription={post.postDescription} likes="500"/>
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

export default SearchProfile
