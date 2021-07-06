import React, { useState } from 'react'
import fire from '../config/fire'

function UserInfo(props) {
    const db = fire.firestore()
    const [isModal, setIsModal] = useState(false)
    const [isFileModal, setIsFileModal] = useState(false)
    const [newBio, setNewBio] = useState("")
    let newPic = ""
    const [isSaved, setIsSaved] = useState(false)
    const [fileSaveButton, setFileSaveButton] = useState(<button type="button" className="btn btn-primary" disabled>Save</button>)

    const editBioHandler = () => {
        setIsFileModal(false)
        setIsModal(true)
    }

    const editPicHandler = () => {
        setIsModal(false)
        setIsFileModal(true)
        setFileSaveButton(<button type="button" onClick={savePicHandler} className="btn btn-primary" disabled>Save</button>)
    }

    const saveBioHandler = async () => {
        await db.collection('usersData').doc(fire.auth().currentUser.email).update({
            bio: newBio
        })
        setIsSaved(true)
    }

    const savePicHandler = async () => {
        console.log(newPic)
        await db.collection('usersData').doc(fire.auth().currentUser.email).update({
            profilePicture: newPic
        })
        setFileSaveButton(<button type="button" className="btn btn-primary" disabled>Saved</button>)
    }

    const newBioHandler = (event) => {
        setNewBio(event.target.value)
    }

    const newPicHandler = async (event) => {
        const file = event.target.files[0]
        const storageRef = fire.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        newPic = await fileRef.getDownloadURL()
        setFileSaveButton(<button type="button" onClick={savePicHandler} className="btn btn-primary">Save</button>)
    }

    const setSaveAndReload = () => {
        setIsSaved(false)
        window.location.replace("/UserProfile")
    }

    const reload = () => {
        window.location.replace("/UserProfile")
    }

    return (
        <div>
            <div style={{justifyContent: "center", width: "40rem"}} className="row">
                <div className="col-4">
                    <center><img style = {{width: "150px", height: "150px", borderRadius: "50%"}} src={props.profilePicture} />
                    <button style={{width: "100px"}} type="button" onClick={editPicHandler} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Pic</button></center>
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
                        <button style={{width: "100px"}} type="button" onClick={editBioHandler} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Bio</button>
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
                        {
                            isFileModal ?
                                (
                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Edit Pic</h5>
                                                <button type="button" onClick={reload} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                <div className="mb-3">
                                                    <label htmlFor="recipient-name" className="col-form-label">New Pic:</label>
                                                    <input type="file" onChange={newPicHandler} className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
                                                </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" onClick={reload} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                {fileSaveButton}
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : console.log("File Modal Inactive")
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo
