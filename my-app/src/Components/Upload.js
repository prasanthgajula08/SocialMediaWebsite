import React from 'react'

function Upload(props) {
    return (
        <div class="card" style={{width: '40rem'}}>
            <form onSubmit={props.submitHandler}>
                <div class="input-group">
                    <span class="input-group-text">Write Something...</span><br></br><br></br>
                    <textarea class="form-control" aria-label="With textarea" onChange={props.handleTextChange}></textarea>
                </div>
                <div class="input-group">
                    <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={props.handleFileChange}/>
                    {props.button}
                </div>
            </form>
        </div>
    )
}

export default Upload
