import React, { useState } from 'react'

function PostCard(props) {
    let isImgModal = false

    const imgClickHandler = () => {
        console.log("clicked")
        isImgModal = true
        console.log(isImgModal)
    }

    const usernameClickHandler = () =>{
        window.location.replace("/search/"+props.username);
    }

    return (
        <div>
            <br></br>
            <div className="card" style={{width: '40rem'}}>
                {/* <a onClick={imgClickHandler}><img src={props.fileURL} className="card-img-top" /></a> */}
                <input type="image" src={props.fileURL}></input>
                <div className="card-body">
                    <p onClick={usernameClickHandler} className="card-title"><strong>{props.username}</strong></p>
                    <p className="card-text">{props.postDescription}</p>
                    <button  type="button" className="btn btn-primary">Likes({props.likes})</button>
                </div>
            </div>
            {
                isImgModal ? (
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Post</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                        <img src={props.fileURL} className="card-img-top" />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : console.log("ImgModal Inactive")
                }
        </div>
    )
}

export default PostCard
