import React, { useState, useEffect } from 'react';
import NavBar from './NavBar'
import fire from '../config/fire';
import PostCard from './PostCard';
import Upload from './Upload';
import '../Styles/UserProfile.css'

export default function Dummy() {
    const db = fire.firestore()

    const [uploadButton, setUploadButton] = useState((<button class="btn btn-outline-primary" type="submit" id="inputGroupFileAddon04" disabled>Upload</button>))
    const [postDescription, setPostDescription] = useState("")
    const [postURL, setPostURL] = useState("")
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [postCards, setPostCards] = useState([])
    const [postCards2, setPostCards2] = useState([])
    const [newsFeedPosts, setNewsFeedPosts] = useState([])
    var usersData = []

    useEffect(() => {
        const clearAuth =fire.auth().onAuthStateChanged(function(authUser) {
            if (authUser) {
                setUser(authUser)
                console.log(authUser)



                db.collection("usersData").doc("prasanth@gmail.com").collection("posts").onSnapshot(snapshot => {
                    setNewsFeedPosts(snapshot.docs.map(doc => doc.data()))
                })

                db.collection("usersData").doc("praveen@gmail.com").collection("posts").onSnapshot(snapshot => {
                    setPosts(snapshot.docs.map(doc => doc.data()))
                })
                

                // users.map((usr)=>{
                //     db.collection('usersData').doc(usr).collection('posts').onSnapshot(snpsht => {
                //         snpsht.docs.map(dc => usersData.push(dc.data()))
                //     })
                // })
                // setPostCards(usersData.map((newsFeedPost) => {
                //     console.log("tada")
                //     return (
                //         <PostCard fileURL={newsFeedPost.fileURL} username="Prasanth Gajula" postDescription={newsFeedPost.postDescription} likes="500"/>
                //     )
                // }))
                // console.log(posts)
            } else {
              console.log("user signedout")
            }
        });

        return () => {
            clearAuth()
        }
    }, [user])

    useEffect(() => {

        console.log(newsFeedPosts)
        setPostCards2(newsFeedPosts.map((p) => {
            return (
                <PostCard fileURL={p.fileURL} username="Prasanth Gajula" postDescription={p.postDescription} likes="500"/>
            )
        }))

        console.log(posts)
        setPostCards(posts.map((post) => {
            return (
                <PostCard fileURL={post.fileURL} username="Prasanth Gajula" postDescription={post.postDescription} likes="500"/>
            )
        }))
      
    }, [posts])


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
            posts: fire.firestore.FieldValue.increment(1)
        })
        window.location.replace("/NewsFeed");
    }

    var handleTextChange = (e) => {
        setPostDescription(e.target.value)
    }


    return (
        <div>
            <NavBar />
            <div>
            <br></br>
                <Upload submitHandler = {submitHandler} handleTextChange = {handleTextChange} handleFileChange = {handleFileChange} button={uploadButton}/>
                {postCards}
                {postCards2}
            </div>
        </div>
    );
}