import React, { useState, useEffect } from 'react';
import NavBar from './NavBar'
import fire from '../config/fire';
import PostCard from './PostCard';
import UserInfo from './UserInfo';
import '../Styles/UserProfile.css'

function SearchProfile(props) {
    const db = fire.firestore()

    const [user, setUser] = useState(props.match.params.personId)
    const [posts, setPosts] = useState([])
    const [postCards, setPostCards] = useState([])

    useEffect(() => {
        db.collection("usersData").doc(user).collection("posts").onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    useEffect(() => {
        setPostCards(posts.map((post) => {
            return (
                <PostCard fileURL={post.fileURL} username="Prasanth Gajula" postDescription={post.postDescription} likes="500"/>
            )
        }))
    }, [posts ,db])

    return (
        <div>
            <NavBar />
            <div className="userProfileStyle">
            <br></br>
                <UserInfo profilePicture="https://picsum.photos/150/150" username="Prasanth Gajula" postsNumber="69" followersNumber="70" followingNumber="71" fullName="Prasanth Chakravarthy Gajula" bio="Hakuna Matata"/>
                <br></br>
                {postCards}
            </div>
        </div>
    );
}

export default SearchProfile
