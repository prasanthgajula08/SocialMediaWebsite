import React from 'react'
import NewsFeed from './NewsFeed'
import PostCard from './PostCard'

function dummy() {
    return (
        <div>
            { Data.map( data => <PostCard fileURL={data.fileURL} username="Prasanth Gajula" postDescription={data.postDescription} likes="500"/>}
        </div>
    )
}

export default dummy
