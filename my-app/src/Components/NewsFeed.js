import React, { useEffect, useState } from 'react';
import NavBar from './NavBar'
import fire from '../config/fire'
import firebase from 'firebase';
import Upload from './Upload';
import '../Styles/UserProfile.css'
import PostCard from './PostCard';

export default function NewsFeed() {

    const db = fire.firestore()
    const [uploadButton, setUploadButton] = useState((<button class="btn btn-outline-primary" type="submit" id="inputGroupFileAddon04" disabled>Upload</button>))
    const [postDescription, setPostDescription] = useState("")
    const [postURL, setPostURL] = useState("")
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [newsFeedPosts, setNewsFeedPosts] = useState([])
    const [postCards, setPostCards] = useState([])

    useEffect(() => {
        const clearAuth =fire.auth().onAuthStateChanged(function(authUser) {
            if (authUser) {
                setUser(authUser)
                console.log(authUser)
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
        const clearUsersOp = db.collection('usersData').onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => doc.data().username))
        })

        return () => {
            clearUsersOp()
        }
    }, [])

    useEffect(() => {
        setNewsFeedPosts(users.map((usr)=>{
            db.collection('usersData').doc(usr).collection('posts').onSnapshot(snpsht => {
                snpsht.docs.map(dc => dc.data())
            })
        }))
        console.log(newsFeedPosts)
    }, [users])

    useEffect(() => {
        setPostCards(newsFeedPosts.map((post) => {
            return (
                <PostCard fileURL={post.fileURL} username="Prasanth Gajula" postDescription={post.postDescription} likes="500"/>
            )
        }))
    }, [newsFeedPosts ,db])

    var handleFileChange = async (e) => {
        const file = e.target.files[0]
        const storageRef = fire.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        setPostURL(await fileRef.getDownloadURL())
        setUploadButton((<button class="btn btn-outline-primary" type="submit" id="inputGroupFileAddon04">Upload</button>))
    };

    var submitHandler = async (e) => {
        e.preventDefault()
        console.log(posts.length)
        var docNumber = posts.length + 1
        await db.collection('usersData').doc(fire.auth().currentUser.email).collection('posts').doc(docNumber.toString()).set({
            fileURL : postURL,
            postDescription: postDescription,
            likes: 0,
        })
        await db.collection('usersData').doc(fire.auth().currentUser.email).update({
            posts: firebase.firestore.FieldValue.increment(1)
        })
        window.location.replace("/NewsFeed");
    }

    var handleTextChange = (e) => {
        setPostDescription(e.target.value)
    }

    return (
        <div>
            <NavBar />
            <div className="userProfileStyle">
            <br></br>
                <Upload submitHandler = {submitHandler} handleTextChange = {handleTextChange} handleFileChange = {handleFileChange} button={uploadButton}/>
                {postCards}
            </div>
        </div>
    );
}