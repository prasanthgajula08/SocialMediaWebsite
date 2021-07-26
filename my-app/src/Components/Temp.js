import { useEffect, useState } from 'react';
import fire from '../config/fire';
import firebase from 'firebase';
import "../Styles/Temp.css";
import NavBar from './NavBar';


export default function Temp() {
    
    let db = fire.firestore();
    const [data, setData] = useState([])
    const [user, setUser] = useState("")
    const [currUser, setCurrUser] = useState("")
    const [txtMessage, setmessage] = useState("")
    const [chatMessages, setChatMessages] = useState([])
    let arr=[]
    let frnd=""

    useEffect(() => {      
        const clearAuth = fire.auth().onAuthStateChanged(function(authUser) {
            if (authUser) {
                setCurrUser(authUser.displayName)
                initiate()
            }
        })
        
        
    }, [])


    async function initiate()
{
    var docRef = await db.collection('usersData').doc(fire.auth().currentUser.displayName)
                
   await docRef.get().then((doc) => {
        
        if (doc.exists) {
            const followers =doc.data().followers
            const following =doc.data().following
            const temp = [...followers, ...following]
            setData(temp)
        }
    })
}


  async  function updateMessages()
    {
        await db.collection('usersData').doc(currUser).collection("messages").doc(frnd).collection("messages").orderBy("createdAt").get().then((qrysht) => {
            qrysht.forEach((dc) => {
                arr.push(dc.data().user+": "+dc.data().message)
            })
            })
            console.log(arr) 
            setChatMessages(arr)
    }


function clickHandler(text)
{
    setUser(text)
    frnd = text
    updateMessages()
}

async function sendMessage()
{
    let Message = document.getElementById("inputMessage").value
    console.log(Message)
     await db.collection('usersData').doc(user).collection("messages").doc(fire.auth().currentUser.displayName).collection("messages").add({
        message: Message,
        user: fire.auth().currentUser.displayName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
})
await db.collection('usersData').doc(fire.auth().currentUser.displayName).collection("messages").doc(user).collection("messages").add({
    message: Message,
    user: fire.auth().currentUser.displayName,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
})
//window.location.replace("/Temp");
clearInputBox()

}

function clearInputBox()
{
    document.getElementById("inputMessage").value=""
}

    return (
      <div>
          <NavBar/>
          {data.map(txt => <p onClick={()=>clickHandler(txt)} >{txt}</p>)}
          <div style={{border:"1px solid rgba(39,41,43,0.1)", justifyContent:"center"}} class="col-6">
        <div style={{height:"60px", border:"1px solid rgba(39,41,43,0.1)", justifyContent: "center", alignContent:"center"}} class="row">
            <div class="col-2">
                <img style = {{marginLeft: "50px", width: "25px", height: "25px", borderRadius: "50%"}} src="https://picsum.photos/25/25" />
            </div>
            <div class="col-8">
                {user}
            </div>
        </div>
        <div class="scroll"> {chatMessages.map(txt => <p>{txt}</p>)}</div>
        <div style={{height:"50px", justifyContent:"center", alignContent:"center"}} class="row">
            <div class="input-group mb-3">
                <input id="inputMessage" type="text" class="form-control" placeholder="Type your message..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button class="btn btn-outline-primary" type="button" id="button-addon2" onClick={()=>sendMessage()}>Send</button>
            </div>
        </div>
    </div>
      </div>
    )
}


