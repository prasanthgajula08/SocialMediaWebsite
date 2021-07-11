import React, { useEffect, useState } from 'react';
import NavBar from './NavBar'
import fire from '../config/fire'
import firebase from 'firebase';
import Upload from './Upload';
import '../Styles/UserProfile.css'
import PostCard from './PostCard'; 

export default function NewsFeed() {

    const db = fire.firestore()
    const [uploadButton, setUploadButton] = useState((<button className="btn btn-outline-primary" type="submit" id="inputGroupFileAddon04" disabled>Upload</button>))
    const [postDescription, setPostDescription] = useState("")
    const [postURL, setPostURL] = useState("")
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null)
    const [postCards, setPostCards] = useState([])
    let postCard = []
    let postCount = 0
    let postCount2 = 0

    useEffect(() => {
        const clearAuth = fire.auth().onAuthStateChanged(function(authUser) {
            if (authUser) {
                setUser(authUser)
                db.collection("usersData").doc(authUser.displayName).collection("posts").onSnapshot(snapshot => {
                    setPosts(snapshot.docs.map(doc => doc.data()))
                    console.log(fire.auth().currentUser.displayName)
                })
            } else {
              console.log("user signedout")
            }
        });

        return () => {
            clearAuth()
        }
    }, [user ,db])

    useEffect(() => {
        func()
    }, [])

    async function func() {
        await db.collection("usersData").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                db.collection('usersData').doc(doc.data().username).collection('posts').get().then((qrysht) => {
                    qrysht.forEach((dc) => {
                        postCount += 1
                    })
                })
            });
        }); 
 
        await db.collection("usersData").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                db.collection('usersData').doc(doc.data().username).collection('posts').get().then((qrysht) => {
                    qrysht.forEach((dc, index) => {
                        postCount2 += 1
                        if(doc.data().username != fire.auth().currentUser.displayName)
                        {
                        postCard.push(<PostCard key={postCount2} fileURL={dc.data().fileURL} username={doc.data().username} postDescription={dc.data().postDescription} likes={dc.data().likes}/>)
                        }
                        if(postCount==postCount2) {
                            setPostCards(postCard)
                        }
                    })
                })
            });
        });
    }

    var handleFileChange = async (e) => {
        const file = e.target.files[0]
        const storageRef = fire.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        setPostURL(await fileRef.getDownloadURL())
        setUploadButton((<button className="btn btn-outline-primary" type="submit" id="inputGroupFileAddon04">Upload</button>))
    };

    var submitHandler = async (e) => {
        e.preventDefault()
        var docNumber = posts.length + 1
        await db.collection('usersData').doc(fire.auth().currentUser.displayName).collection('posts').doc(docNumber.toString()).set({
            fileURL : postURL,
            postDescription: postDescription,
            likes: 0,
        })
        await db.collection('usersData').doc(fire.auth().currentUser.displayName).update({
            posts: firebase.firestore.FieldValue.increment(1)
        })
        window.location.replace("/NewsFeed");
    }

    var handleTextChange = (e) => {
        setPostDescription(e.target.value)
        console.log("")
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