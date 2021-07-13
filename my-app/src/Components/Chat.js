import React, { useState, useEffect } from 'react';
import NavBar from './NavBar'
import fire from '../config/fire'

export default function UserChat() {
    const db = fire.firestore()

    const [following, setFollowing] = useState([])
    let chatList = []
    const [chutList, setChutList] = useState(null)
    let proPics = []

    useEffect(() => {
        fire.auth().onAuthStateChanged((authUser) => {
            if(following.length==0){
                var docRef = db.collection('usersData').doc(authUser.displayName)
                docRef.get().then((dc) => {
                    setFollowing(dc.data().following)
                })
            }
            else{
                chatList = following.map((friend, index) => {
                    var dcRef = db.collection('usersData').doc(friend)

                    dcRef.get().then((doc) => {
                        proPics.push(doc.data().profilePicture)
                    })
                    console.log(proPics)
                    return (
                        <div key={index}>
                            <a style={{textDecoration: "none"}} href="/UserChat">
                                <hr></hr>
                                <div style={{justifyContent: "space-around", width: "400px", height:"72px"}} class="row">
                                    <div class="col-1">
                                        <img style = {{width: "56px", height: "56px", borderRadius: "50%"}} src={proPics[proPics.length-1]} />
                                    </div>
                                    <div style = {{width: "224px", height: "60px"}} class="col-9">
                                        <div style={{marginTop: "10px"}} class= "row">
                                            <h2 style={{fontSize: "14px"}}>{friend}</h2>
                                        </div>
                                        <div class= "row">
                                            <h2 style={{color: "#B3B3B3", fontSize: "14px"}}>Message Status</h2>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    )
                });
            }
            setChutList(chatList)
        })
        //func()
    }, [following])

    function func(){
        fire.auth().onAuthStateChanged((authUser) => {
            if(following.length==0){
                var docRef = db.collection('usersData').doc(authUser.displayName)
    
                docRef.get().then((dc) => {
                    setFollowing(dc.data().following)
                })
            }
    
            else{
                chatList = following.map((friend) => {
                    var dcRef = db.collection('usersData').doc(friend)
                    let dcProPic = ""
                    dcRef.get().then((doc) => {
                        dcProPic = doc.data().profilePicture
                    })
                    return (
                    <div>
                        <a style={{textDecoration: "none"}} href="/UserChat">
                            <hr></hr>
                            <div style={{justifyContent: "space-around", width: "400px", height:"72px"}} class="row">
                                <div class="col-1">
                                    <img style = {{width: "56px", height: "56px", borderRadius: "50%"}} src={dcProPic} />
                                </div>
                                <div style = {{width: "224px", height: "60px"}} class="col-9">
                                    <div style={{marginTop: "10px"}} class= "row">
                                        <h2 style={{fontSize: "14px"}}>{friend}</h2>
                                    </div>
                                    <div class= "row">
                                        <h2 style={{color: "#B3B3B3", fontSize: "14px"}}>Message Status</h2>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    )
                });
            }
        })
    }

    return (
        <div>
            <NavBar />
            <div class="container">
                <div style={{justifyContent:"center"}} class="row">
                    <div class="col-4">
                        <div style={{height:"40px", border:"1px solid rgba(39,41,43,0.1)", justifyContent:"center", alignContent:"center"}} class="row">UserName</div>
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