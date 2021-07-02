import React, { useEffect, useState } from 'react';
import NavBar from './NavBar'
import fire from '../config/fire'

export default function NewsFeed() {
    const articleStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }

    var postNumber = 0
    const db = fire.firestore()
    const [userFields, setuserFields] = useState({})
    const [button, setButton] = useState((<button class="btn btn-outline-primary" type="submit" id="inputGroupFileAddon04" disabled>Upload</button>))
    const [text, setText] = useState("")
    const [postImg, setPostImg] = useState("")
    const [users, setUsers] = useState([])

    const [username, setUserName] = useState("prasanth080898@gmail.com")

    useEffect(() => {
        fire.auth().onAuthStateChanged(function(user) {
            if (user) {
                setUserName(fire.auth().currentUser.email)
            } else {
              console.log("user signedout")
            }
          });
          db.collection('usersData').doc(username).collection("posts").onSnapshot(snapshot => {
             setUsers(snapshot.docs.map(doc => doc.data()))
         })
    }, [])

    var jsxFiles = users.map((user) => {
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
    });

    var onChangeHandler = async (e) => {
        const file = e.target.files[0]
        const storageRef = fire.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        setPostImg(await fileRef.getDownloadURL())
        setButton((<button class="btn btn-outline-primary" type="submit" id="inputGroupFileAddon04">Upload</button>))
    };

    var submitHandler = async (e) => {
        e.preventDefault()
        // db.collection('usersData').onSnapshot(snapshot => {
        //     setuserFields(snapshot.doc(username).data())
        // })
        // postNumber = userFields.posts
        await db.collection('usersData').doc(username).collection('posts').doc("0").set({
            fileURL : postImg,
            postDescription: text,
            likes: 0,
            comments: {}
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