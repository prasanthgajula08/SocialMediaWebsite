import React, { useEffect, useState } from 'react'
import fire from '../config/fire'
import firebase from 'firebase'

function PostCard(props) {
    const db = fire.firestore()

    const [likeButtonClicked, setLikeButtonClicked] = useState(false)
    const [likes, setLikes] = useState(0)

    useEffect(() => {
        func()
    }, [])

    function func() {
        var docRef = db.collection('usersData').doc(props.username).collection('posts').doc(props.docName)
        
        docRef.get().then((dc) => {
            setLikes(dc.data().likes)
            var likedUsers = dc.data().likedBy

            if(likedUsers.includes(props.curUser)){
                setLikeButtonClicked(true)
            }
        })
    }

    const likeClickHandler = async () => {
        console.log("liked")
        await db.collection('usersData').doc(props.username).collection('posts').doc(props.docName).update({
            likes: firebase.firestore.FieldValue.increment(1),
            likedBy: firebase.firestore.FieldValue.arrayUnion(props.curUser)
        })
        var docRef = db.collection('usersData').doc(props.username).collection('posts').doc(props.docName)
        
        docRef.get().then((dc) => {
            setLikes(dc.data().likes)
        })
        setLikeButtonClicked(true)
    }

    const unlikeClickHandler = async () => {
        console.log("unliked")
        await db.collection('usersData').doc(props.username).collection('posts').doc(props.docName).update({
            likes: firebase.firestore.FieldValue.increment(-1),
            likedBy: firebase.firestore.FieldValue.arrayRemove(props.curUser)
        })
        var docRef = db.collection('usersData').doc(props.username).collection('posts').doc(props.docName)
        
        docRef.get().then((dc) => {
            setLikes(dc.data().likes)
        })
        setLikeButtonClicked(false)
    }

    return (
        <div>
            <br></br>
            <div className="card" style={{width: '40rem'}}>
                <input type="image" src={props.fileURL}></input>
                <div className="card-body">
                    <p className="card-title"><strong>{props.username}</strong></p>
                    <p className="card-text">{props.postDescription}</p>
                    {likeButtonClicked ? (<button  type="button" onClick={unlikeClickHandler} className="btn btn-primary">Unlike({likes})</button>) : (<button  type="button" onClick={likeClickHandler} className="btn btn-primary">Likes({likes})</button>)}
                </div>
            </div>
        </div>
    )
}

export default PostCard
