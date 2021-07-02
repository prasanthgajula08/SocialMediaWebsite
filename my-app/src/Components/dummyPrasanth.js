import React, { useEffect, useState } from 'react';
import NavBar from './NavBar'
import fire from '../config/fire'
import firebase from 'firebase';

export default function NewsFeed() {
    const articleStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }

    var docRef;
    const db = fire.firestore()
    const [button, setButton] = useState((<button class="btn btn-outline-primary" type="submit" id="inputGroupFileAddon04" disabled>Upload</button>))
    const [text, setText] = useState("")
    const [postImg, setPostImg] = useState("")
    const [users, setUsers] = useState([])
    const [jsxFiles, setJsxFiles] = useState()
    const [username, setUserName] = useState("")

    useEffect(() => {
        // db.collection('usersData').doc(username)
        fire.auth().onAuthStateChanged(async function(user) {
            if (user) {
                await setUserName(fire.auth().currentUser.email)
                console.log(username)
                db.collection('usersData').doc(username).collection("posts").onSnapshot(async snapshot => {
                    await setUsers(snapshot.docs.map(doc => doc.data()))
                })
                  docRef = db.collection("usersData").doc(username);
        
                  docRef.get().then(async (doc) => {
                      if (doc.exists) {
                          console.log(doc.data().posts)
                          await setJsxFiles(users.map((user) => {
                            if (doc.data().posts>0) {
                                return (
                                    <div>
                                        <br></br>
                                        <div class="card" style={{width: '40rem'}}>
                                            <img src={user.fileURL} class="card-img-top" />
                                            <div class="card-body">
                                                <p class="card-title"><strong>{username}</strong></p>
                                                <p class="card-text">{user.postDescription}</p>
                                                <button onClick={() => {user.update({likes: user.likes+1})}} type="button" class="btn btn-primary">Like ({user.likes})</button>
                                            </div>
                                        </div>
                                    </div>
                                    )
                            }
                            else{
                                return (<div></div>)
                            }
                        }))
                      } else {
                          // doc.data() will be undefined in this case
                          console.log("No such document!");
                      }
                  }).catch((error) => {
                      console.log("Error getting document:", error);
                  });
            } else {
              console.log("user signedout")
            }
          });
    }, [])

    var onChangeHandler = async (e) => {
        const file = e.target.files[0]
        const storageRef = fire.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        setPostImg(await fileRef.getDownloadURL())
        setButton((<button class="btn btn-outline-primary" type="submit" id="inputGroupFileAddon04">Upload</button>))
    };

    var submitHandler = async (e) => {
        console.log(username, jsxFiles)
        e.preventDefault()
        db.collection('usersData').doc(username).collection('posts').doc("0").set({
            fileURL : postImg,
            postDescription: text,
            likes: 0,
        })
        await db.collection('usersData').doc(username).update({
            posts: firebase.firestore.FieldValue.increment(1)
        })
        window.location.replace("/NewsFeed");
    }

    var handleTextChange = (e) => {
        setText(e.target.value)
    }

    return (
        <div>
            <NavBar />
            <div style={articleStyle}>
            <br></br>
                <div class="card" style={{width: '40rem'}}>
                    <form onSubmit={submitHandler}>
                        <div class="input-group">
                            <span class="input-group-text">Write Something...</span><br></br><br></br>
                            <textarea class="form-control" aria-label="With textarea" onChange={handleTextChange}></textarea>
                        </div>
                        <div class="input-group">
                            <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={onChangeHandler}/>
                            {button}
                        </div>
                    </form>
                </div>
                {jsxFiles}
            </div>
        </div>
    );
}