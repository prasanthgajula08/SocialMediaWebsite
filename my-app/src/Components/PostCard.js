import React from 'react'

function PostCard(props) {
    return (
        <div>
            <br></br>
            <div class="card" style={{width: '40rem'}}>
                <img src={props.fileURL} class="card-img-top" />
                <div class="card-body">
                    <p class="card-title"><strong>{props.username}</strong></p>
                    <p class="card-text">{props.postDescription}</p>
                    <button type="button" class="btn btn-primary">Likes({props.likes})</button>
                </div>
            </div>
        </div>
    )
}

export default PostCard
