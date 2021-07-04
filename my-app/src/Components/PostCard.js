import React from 'react'

function PostCard(props) {
    return (
        <div>
            <br></br>
            <div className="card" style={{width: '40rem'}}>
                <img src={props.fileURL} className="card-img-top" />
                <div className="card-body">
                    <p className="card-title"><strong>{props.username}</strong></p>
                    <p className="card-text">{props.postDescription}</p>
                    <button type="button" className="btn btn-primary">Likes({props.likes})</button>
                </div>
            </div>
        </div>
    )
}

export default PostCard
