import React, { useEffect, useState } from 'react';
import NavBar from './NavBar'
import fire from '../config/fire'
import firebase from 'firebase';
import Upload from './Upload';

export default function NewsFeed() {
    const articleStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }

    //var docRef;
    const db = fire.firestore()
    const [button, setButton] = useState((<button class="btn btn-outline-primary" type="submit" id="inputGroupFileAddon04" disabled>Upload</button>))
    const [text, setText] = useState("")
    const [postImg, setPostImg] = useState("")
    const [posts, setPosts] = useState([])
    //const [users, setUsers] = useState([])
    //const [jsxFiles, setJsxFiles] = useState()
    //const [username, setUserName] = useState("")

    // useEffect(() => {
    //     // db.collection('usersData').doc(username)
    //     fire.auth().onAuthStateChanged(function(user) {
    //         if (user) {
    //             setUserName(fire.auth().currentUser.email)
    //             console.log(username)
    //         } else {
    //           console.log("user signedout")
    //         }
    //       });
    //     db.collection('usersData').doc(fire.auth().currentUser.email).collection("posts").onSnapshot(snapshot => {
    //         setUsers(snapshot.docs.map(doc => doc.data()))
    //     })
    //     docRef = db.collection("usersData").doc(fire.auth().currentUser.email);
        
    //     docRef.get().then((doc) => {
    //         if (doc.exists) {
    //             console.log(doc.data().posts)
    //             setJsxFiles(users.map((user) => {
    //             if (doc.data().posts>0) {
    //                 return (
    //                     <div>
    //                         <br></br>
    //                         <div class="card" style={{width: '40rem'}}>
    //                             <img src={user.fileURL} class="card-img-top" />
    //                             <div class="card-body">
    //                                 <p class="card-title"><strong>{fire.auth().currentUser.email}</strong></p>
    //                                 <p class="card-text">{user.postDescription}</p>
    //                                 <button onClick={() => {user.update({likes: user.likes+1})}} type="button" class="btn btn-primary">Like ({user.likes})</button>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     )
    //             }
    //             else{
    //                 return (<div></div>)
    //             }
    //         }))
    //         } else {
    //             // doc.data() will be undefined in this case
    //             console.log("No such document!");
    //         }
    //     }).catch((error) => {
    //         console.log("Error getting document:", error);
    //     });
    // }, [])

    var handleFileChange = async (e) => {
        const file = e.target.files[0]
        const storageRef = fire.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        setPostImg(await fileRef.getDownloadURL())
        setButton((<button class="btn btn-outline-primary" type="submit" id="inputGroupFileAddon04">Upload</button>))
    };

    var submitHandler = async (e) => {
        e.preventDefault()
        await db.collection('usersData').doc(fire.auth().currentUser.email).collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => doc.data()))
        })
        console.log(posts.length)
        var docNumber = posts.length + 1
        await db.collection('usersData').doc(fire.auth().currentUser.email).collection('posts').doc(docNumber.toString()).set({
            fileURL : postImg,
            postDescription: text,
            likes: 0,
        })
        await db.collection('usersData').doc(fire.auth().currentUser.email).update({
            posts: firebase.firestore.FieldValue.increment(1)
        })
        //window.location.replace("/NewsFeed");
    }

    var handleTextChange = (e) => {
        setText(e.target.value)
    }

    return (
        <div>
            <NavBar />
            <div style={articleStyle}>
            <br></br>
                <Upload submitHandler = {submitHandler} handleTextChange = {handleTextChange} handleFileChange = {handleFileChange} button={button}/>
                {/* {jsxFiles} */}
            </div>
        </div>
    );
}