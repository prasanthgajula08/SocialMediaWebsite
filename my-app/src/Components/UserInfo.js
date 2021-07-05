import React, { useState } from 'react'
import fire from '../config/fire'

function UserInfo(props) {
    const db = fire.firestore()
    const [isModal, setIsModal] = useState(true)
    const [newBio, setNewBio] = useState("")
    const [isSaved, setIsSaved] = useState(false)

    const editBioHandler = () => {
        setIsModal(true)
    }

    const saveBioHandler = async () => {
        await db.collection('usersData').doc(fire.auth().currentUser.email).update({
            bio: newBio
        })
        setIsSaved(true)
    }

    const newBioHandler = (event) => {
        setNewBio(event.target.value)
    }

    const setSaveAndReload = () => {
        setIsSaved(false)
        window.location.replace("/UserProfile")
    }

    return (
        <div>
            <div style={{justifyContent: "center", width: "40rem"}} className="row">
                <div className="col-4">
                    <img style = {{width: "150px", height: "150px", borderRadius: "50%"}} src={props.profilePicture} />
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
                        <button type="button" onClick={editBioHandler} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Bio</button>
                        {
                            isModal ?
                                (
                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Edit Bio</h5>
                                                <button type="button" onClick={setSaveAndReload} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                <div className="mb-3">
                                                    <label htmlFor="recipient-name" className="col-form-label">New Bio:</label>
                                                    <input type="text" onChange={newBioHandler} className="form-control" id="recipient-name" />
                                                </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" onClick={setSaveAndReload} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                {isSaved ? (<button type="button" onClick={saveBioHandler} className="btn btn-primary" disabled>Saved</button>): (<button type="button" onClick={saveBioHandler} className="btn btn-primary">Save</button>)}
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : console.log("Modal Inactive")
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo
