import React from 'react'

function UserInfo(props) {
    return (
        <div>
            <div style={{justifyContent: "center", width: "40rem"}} class="row">
                <div class="col-4">
                    <img style = {{width: "150px", height: "150px", borderRadius: "50%"}} src={props.profilePicture} />
                </div>
                <div class="col-6">
                    <div class= "row">
                        <h2 style={{fontSize: "28px"}}>{props.username}</h2>
                    </div>
                    <div class= "row">
                        <ul style={{listStyleType: "none"}}>
                            <li style={{display: "inline", fontSize: "16px", marginRight: "15px"}}><strong>{props.postsNumber} </strong>posts</li>
                            <li style={{display: "inline", fontSize: "16px", marginRight: "15px"}}><strong>{props.followersNumber} </strong>Followers</li>
                            <li style={{display: "inline", fontSize: "16px", marginRight: "15px"}}><strong>{props.followingNumber} </strong>Following</li>
                        </ul>
                    </div>
                    <div class= "row">
                        <h1 style={{fontSize: "16px"}}><strong>{props.fullName}</strong></h1>
                        <span style={{fontSize: "16px"}}>{props.bio}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo
