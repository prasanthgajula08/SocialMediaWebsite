import React, { useState, useEffect } from 'react';
import NavBar from './NavBar'
import fire from '../config/fire'
import FriendCard from './FriendCard';

export default function UserChat() {
    const db = fire.firestore()

    const [user, setUser] = useState(null)
    const [following, setFollowing] = useState([])
    let chatList = []
    const [chutList, setChutList] = useState([])

    useEffect(() => {
        fire.auth().onAuthStateChanged((authUser) => {
            setUser(authUser.displayName)
            if(following.length==0){
                var docRef = db.collection('usersData').doc(authUser.displayName)
                docRef.get().then((dc) => {
                    setFollowing(dc.data().following)
                })
            }
            else{
                following.map((friend, index) => {
                    var dcRef = db.collection('usersData').doc(friend)

                    dcRef.get().then((doc) => {
                        chatList.push(<FriendCard key={index} proPic={doc.data().profilePicture} friendName={friend}/>)
                        if(following.length==chatList.length){
                            setChutList(chatList)
                        }
                    })
                });
            }
        })
    }, [following])

    return (
        <div>
            <NavBar />
            <div class="container">
                <div style={{justifyContent:"center"}} class="row">
                    <div class="col-4">
                        <div style={{height:"40px", border:"1px solid rgba(39,41,43,0.1)", justifyContent:"center", alignContent:"center"}} class="row">{user}</div>
                        <div style={{overflowY: "auto", height:"780px", border:"1px solid rgba(39,41,43,0.1)", alignContent:"flex-start"}} class="row">
                            {chutList}
                        </div>
                    </div>
                    <div style={{border:"1px solid rgba(39,41,43,0.1)", justifyContent:"center", alignContent: "center"}} class="col-6">
                        <div style={{height: "100%", justifyContent:"center", alignContent: "center"}} class="row">
                            Your Meassages
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}