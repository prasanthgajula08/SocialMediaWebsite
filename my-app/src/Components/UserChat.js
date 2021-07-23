import React from 'react';
import NavBar from './NavBar'

export default function UserChat() {
    const styles = {
        width: 500,
        height: 400
    }
    const articleStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }

    var images = ["https://picsum.photos/56/56","https://picsum.photos/56/57","https://picsum.photos/56/58","https://picsum.photos/56/59","https://picsum.photos/56/60","https://picsum.photos/56/61","https://picsum.photos/56/62","https://picsum.photos/56/63","https://picsum.photos/56/64","https://picsum.photos/56/65"]
    var chatList = images.map((image) => {
        return (
        <div>
            <a style={{textDecoration: "none"}} href="/UserChat">
                <hr></hr>
                <div style={{justifyContent: "space-around", width: "400px", height:"72px"}} class="row">
                    <div class="col-1">
                        <img style = {{width: "56px", height: "56px", borderRadius: "50%"}} src={image} />
                    </div>
                    <div style = {{width: "224px", height: "60px"}} class="col-9">
                        <div style={{marginTop: "10px"}} class= "row">
                            <h2 style={{fontSize: "14px"}}>UserName</h2>
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

    return (
        <div>
            <NavBar />
            <div class="container">
                <div style={{justifyContent:"center"}} class="row">
                    <div class="col-4">
                        <div style={{height:"60px", border:"1px solid rgba(39,41,43,0.1)", justifyContent:"center", alignContent:"center"}} class="row">UserName</div>
                        <div style={{overflowY: "auto", height:"750px", border:"1px solid rgba(39,41,43,0.1)", alignContent:"flex-start"}} class="row">
                            <div>
                                <br></br>
                                <a style={{textDecoration: "none"}} href="/chatting">
                                    <div style={{justifyContent: "space-around", width: "400px", height:"72px"}} class="row">
                                        <div class="col-1">
                                            <img style = {{width: "56px", height: "56px", borderRadius: "50%"}} src="https://picsum.photos/55/56" />
                                        </div>
                                        <div style = {{width: "224px", height: "60px"}} class="col-9">
                                            <div style={{marginTop: "10px"}} class= "row">
                                                <h2 style={{fontSize: "14px"}}>UserName</h2>
                                            </div>
                                            <div class= "row">
                                                <h2 style={{color: "#B3B3B3", fontSize: "14px"}}>Message Status</h2>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            {chatList}
                        </div>
                    </div>
                    <div style={{border:"1px solid rgba(39,41,43,0.1)", justifyContent:"center"}} class="col-6">
                        <div style={{height:"60px", border:"1px solid rgba(39,41,43,0.1)", justifyContent: "center", alignContent:"center"}} class="row">
                            <div class="col-2">
                                <img style = {{marginLeft: "50px", width: "25px", height: "25px", borderRadius: "50%"}} src="https://picsum.photos/25/25" />
                            </div>
                            <div class="col-8">
                                FriendName
                            </div>
                        </div>
                        <div style={{height:"700px", justifyContent:"center", alignContent:"center"}} class="row">ChatDisplay</div>
                        <div style={{height:"50px", justifyContent:"center", alignContent:"center"}} class="row">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Type your message..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <button class="btn btn-outline-primary" type="button" id="button-addon2">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}