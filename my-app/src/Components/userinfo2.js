import React, { useState, useEffect } from 'react'
import fire from '../config/fire'
import firebase from 'firebase';

function UserInfo2(props) {
    const db = fire.firestore()

    const [buttonText, setButtonText] = useState("Follow");
    const [buttonColor, setButtonColor] = useState("blue");

    useEffect(() => {
        console.log(props.followstatus)
       initiate()
    },[])

    async function follow()
    {
        var docRef = await db.collection('usersData').doc(props.username)
     
        docRef.update({
            followers : firebase.firestore.FieldValue.arrayUnion(fire.auth().currentUser.displayName),
            followers_count : firebase.firestore.FieldValue.increment(1)
        })


        var docRef2 = await db.collection('usersData').doc(fire.auth().currentUser.displayName)
    
        docRef2.update({
            following : firebase.firestore.FieldValue.arrayUnion(props.username),
            following_count : firebase.firestore.FieldValue.increment(1)
        })

    }

    async function unfollow()
    {
        var docRef = await db.collection('usersData').doc(props.username)
     
        docRef.update({
            followers : firebase.firestore.FieldValue.arrayRemove(fire.auth().currentUser.displayName),
            followers_count : firebase.firestore.FieldValue.decrement(1)
        })


        var docRef2 = await db.collection('usersData').doc(fire.auth().currentUser.displayName)
    
        docRef2.update({
            following : firebase.firestore.FieldValue.arrayRemove(props.username),
            following_count : firebase.firestore.FieldValue.decrement(1)
        })

    }

    const changeText = (text) => {
        initiate()
        if(buttonText=="following"){
            unfollow()
            setButtonText("follow")
        }
        else
         {
             follow()
             setButtonText("following")
        }
        setButtonColor("white")
    }

    async function initiate()
    {
        let arr=[]
        var docRef = await db.collection('usersData').doc(props.username)
       await docRef.get().then((doc) => {
            
            if (doc.exists) {
                console.log(doc.data().followers)
                arr = doc.data().followers
                console.log(arr)
            }
        })
    for (const i of arr)
    {
        if(i==fire.auth().currentUser.displayName)
        {
         setButtonText("following")
        }
        else
        {
            setButtonText("follow")
        }

    }

    } 

    return (
        <div>
            <div style={{justifyContent: "center", width: "40rem"}} className="row">
                <div className="col-4">
                    <center><img style = {{width: "150px", height: "150px", borderRadius: "50%"}} src={props.profilePicture} />
                    </center>
                </div>
                <div className="col-6">
                    <div className= "row">
                        <h2 style={{fontSize: "28px"}}>{props.username}</h2>
                    </div>
                    <div className= "row">
                        <ul style={{listStyleType: "none"}}>
                            <li style={{display: "inline", fontSize: "16px", marginRight: "15px"}}><strong>{props.postsNumber} </strong>posts</li>
                            <li style={{display: "inline", fontSize: "16px", marginRight: "15px"}}><strong>{props.followersNumber} </strong>Followers</li>
                            <li style={{display: "inline", fontSize: "16px", marginRight: "15px"}}><strong>{props.followingNumber} </strong>Following</li>
                        </ul>
                    </div>
                    <div className= "row">
                        <h1 style={{fontSize: "16px"}}><strong>{props.fullName}</strong></h1>
                        <span style={{fontSize: "16px"}}>{props.bio}</span>
                        <button style={{width: "100px", color:buttonColor}} type="button" className="btn btn-primary" onClick={() => changeText("Following")}>{buttonText}</button>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo2
