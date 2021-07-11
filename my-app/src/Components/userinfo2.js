import React, { useState, useEffect } from 'react'
import fire from '../config/fire'
import firebase from 'firebase';

function UserInfo2(props) {
    const db = fire.firestore()

    const [buttonText, setButtonText] = useState("Follow");
    const [buttonColor, setButtonColor] = useState("blue");

    useEffect(() => {
        console.log(props.following)
        if(props.following)
        {
            setButtonText("Following")
        }
        else
        {
            setButtonText("Follow")
        }
    },[])

    async function update_Firebase()
    {
        var docRef = await db.collection('usersData').doc(props.username)
     
        docRef.update({
            followers : firebase.firestore.FieldValue.arrayUnion(fire.auth().currentUser.displayName)
        })


        var docRef2 = await db.collection('usersData').doc(fire.auth().currentUser.displayName)
    
        docRef2.update({
            following : firebase.firestore.FieldValue.arrayUnion(props.username)
        })
        
    }

    const changeText = (text) => {
        setButtonText(text);
        setButtonColor("white")
        update_Firebase();
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
