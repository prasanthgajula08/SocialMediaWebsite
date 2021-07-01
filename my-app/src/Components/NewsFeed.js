import React, { useEffect, useState } from 'react';
import NavBar from './NavBar'
import firebaseApp from './firebase'

export default function NewsFeed() {
    const articleStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const db = firebaseApp.firestore()
    const [button, setButton] = useState((<button class="btn btn-outline-primary" type="submit" id="inputGroupFileAddon04" disabled>Upload</button>))
    const [text, setText] = useState("")
    const [postImg, setPostImg] = useState("")
    const [users, setUsers] = useState([])
    const [likes, setLikes] = useState()

    useEffect(() => {
        db.collection('usersData').onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    var jsxFiles = users.map((user) => {
        return (
        <div>
            <br></br>
            <div class="card" style={{width: '40rem'}}>
                <img src={user.fileUrl} class="card-img-top" />
                <div class="card-body">
                    <p class="card-title"><strong>{user.name}</strong></p>
                    <p class="card-text">{user.postText}</p>
                    <button onClick={() => {db.collection('usersData').doc("7sVvE8jwbu6NgKJsudWU").update({likes: user.likes+1})}} type="button" class="btn btn-primary">Like ({user.likes})</button>
                </div>
            </div>
        </div>
        )
    });

    var onChangeHandler = async (e) => {
        const file = e.target.files[0]
        const storageRef = firebaseApp.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        setPostImg(await fileRef.getDownloadURL())
        setButton((<button class="btn btn-outline-primary" type="submit" id="inputGroupFileAddon04">Upload</button>))
    };

    var submitHandler = async (e) => {
        e.preventDefault()
        await db.collection('usersData').doc("7sVvE8jwbu6NgKJsudWU").set({
            name: "currentUser",
            fileUrl: postImg,
            postText: text,
            likes: likes
        })
        window.location.replace("/NewsFeed");
    }

    var handleTextChange = (e) => {
        setText(e.target.value)
    }

    var handleLike = () => {
        alert("liked")
        setLikes(likes+1)
        db.collection('usersData').doc("7sVvE8jwbu6NgKJsudWU").update({likes: likes})
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