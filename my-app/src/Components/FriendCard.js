import React from 'react'

function FriendCard(props) {
    return (
        <div>
            <a style={{textDecoration: "none"}} href="/UserChat">
                <hr></hr>
                <div style={{justifyContent: "space-around", width: "400px", height:"72px"}} class="row">
                    <div class="col-1">
                        <img style = {{width: "56px", height: "56px", borderRadius: "50%"}} src={props.proPic} />
                    </div>
                    <div style = {{width: "224px", height: "60px"}} class="col-9">
                        <div style={{marginTop: "10px"}} class= "row">
                            <h2 style={{fontSize: "14px"}}>{props.friendName}</h2>
                        </div>
                        <div class= "row">
                            <h2 style={{color: "#B3B3B3", fontSize: "14px"}}>Message Status</h2>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default FriendCard
