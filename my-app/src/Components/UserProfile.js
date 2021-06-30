import React, { useState } from 'react';
import NavBar from './NavBar'

export default function NewsFeed() {
    const articleStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }

    var files = ["https://picsum.photos/614/614","https://picsum.photos/614/650","https://picsum.photos/614/655","https://picsum.photos/614/660","https://picsum.photos/614/665"]
    var jsxFiles = files.map((file) => {
        return (
        <div>
            <br></br>
            <div class="card" style={{width: '40rem'}}>
                <img src={file} class="card-img-top" />
                <div class="card-body">
                    <p class="card-title"><strong>UserName</strong></p>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <button type="button" class="btn btn-primary">Like</button>
                </div>
            </div>
        </div>
        )
    });

    return (
        <div>
            <NavBar />
            <div style={articleStyle}>
            <br></br>
                <div>
                    <div style={{justifyContent: "center", width: "40rem"}} class="row">
                        <div class="col-4">
                            <img style = {{width: "150px", height: "150px", borderRadius: "50%"}} src="https://picsum.photos/150/150" />
                        </div>
                        <div class="col-6">
                            <div class= "row">
                                <h2 style={{fontSize: "28px"}}>userName</h2>
                            </div>
                            <div class= "row">
                                <ul style={{listStyleType: "none"}}>
                                    <li style={{display: "inline", fontSize: "16px", marginRight: "15px"}}><strong>0 </strong>posts</li>
                                    <li style={{display: "inline", fontSize: "16px", marginRight: "15px"}}><strong>115 </strong>Followers</li>
                                    <li style={{display: "inline", fontSize: "16px", marginRight: "15px"}}><strong>266 </strong>Following</li>
                                </ul>
                            </div>
                            <div class= "row">
                                <h1 style={{fontSize: "16px"}}><strong>FullName</strong></h1>
                                <span style={{fontSize: "16px"}}>Bio</span>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                {jsxFiles}
            </div>
        </div>
    );
}