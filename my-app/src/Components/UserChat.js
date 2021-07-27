import React, { useEffect, useState } from 'react';
import NavBar from './NavBar'
import fire from '../config/fire'
import FriendCard from './FriendCard';
import firebase from 'firebase';

export default function UserChat(props) {
    const [frnd, setFrnd] = useState(props.match.params.friendId)

    const db = fire.firestore()
    const [proPic, setProPic] = useState(null)
    const [user, setUser] = useState(null)
    const [following, setFollowing] = useState([])
    const [chatMessages, setChatMessages] = useState([])
    let arr=[]
    let chatList = []
    const [chutList, setChutList] = useState([])

    useEffect(() => {
        setProfilePicture()
        
        fire.auth().onAuthStateChanged((authUser) => {
            setUser(authUser.displayName)
            if(following.length==0){
                var docRef = db.collection('usersData').doc(authUser.displayName)
                docRef.get().then((dc) => {
                    const followers =dc.data().followers
                    const following =dc.data().following
                    const temp = [...followers, ...following]
                    setFollowing(temp)
                })
            }
            else{
                following.map((friend, index) => {
                    var dcRef = db.collection('usersData').doc(friend)

                    dcRef.get().then((doc) => {
                        chatList.push(<FriendCard key={index} name={friend} proPic={doc.data().profilePicture} friendName={friend}/>)
                        if(following.length==chatList.length){
                            setChutList(chatList)
                        }
                    })
                });
            }
            updateMessages()
        })
    }, [following])

    async function setProfilePicture() {
        var dRef = db.collection('usersData').doc(frnd)

        await dRef.get().then((d) => {
            setProPic(d.data().profilePicture)
        })
    }

    async function updateMessages()
    {
        await db.collection('usersData').doc(fire.auth().currentUser.displayName).collection("messages").doc(frnd).collection("messages").orderBy("createdAt").get().then((qrysht) => {
            qrysht.forEach((dc) => {
                arr.push(dc.data().user+": "+dc.data().message)
            })
            })
            setChatMessages(arr)
    }

    async function sendMessage()
    {
        let Message = document.getElementById("inputMessage").value
        console.log(Message)
        await db.collection('usersData').doc(frnd).collection("messages").doc(fire.auth().currentUser.displayName).collection("messages").add({
            message: Message,
            user: fire.auth().currentUser.displayName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        await db.collection('usersData').doc(fire.auth().currentUser.displayName).collection("messages").doc(frnd).collection("messages").add({
            message: Message,
            user: fire.auth().currentUser.displayName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        document.getElementById("inputMessage").value=""
        window.location.reload()
    }

    return (
        <div>
            <NavBar />
            <div className="container">
                <div style={{justifyContent:"center"}} className="row">
                    <div className="col-4">
                        <div style={{height:"40px", border:"1px solid rgba(39,41,43,0.1)", justifyContent:"center", alignContent:"center"}} className="row">{user}</div>
                        <div style={{overflowY: "auto", height:"780px", border:"1px solid rgba(39,41,43,0.1)", alignContent:"flex-start"}} className="row">
                            {chutList}
                        </div>
                    </div>
                    <div style={{border:"1px solid rgba(39,41,43,0.1)", justifyContent:"center"}} className="col-6">
                        <div style={{height:"60px", border:"1px solid rgba(39,41,43,0.1)", justifyContent: "center", alignContent:"center"}} className="row">
                            <div className="col-2">
                                <img style = {{marginLeft: "50px", width: "25px", height: "25px", borderRadius: "50%"}} src={proPic} />
                            </div>
                            <div className="col-8">
                                {frnd}
                            </div>
                        </div>
                        <div style={{overflowY: "auto", height:"700px", justifyContent:"center", alignContent:"center"}} className="row">{chatMessages.map((txt, index) => <p key={index}>{txt}</p>)}</div>
                        <div style={{height:"50px", justifyContent:"center", alignContent:"center"}} className="row">
                            <div className="input-group mb-3">
                                <input id="inputMessage" type="text" className="form-control" placeholder="Type your message..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={()=>sendMessage()}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}