import React from 'react'

function Upload(props) {
    return (
        <div className="card" style={{width: '40rem'}}>
            <form onSubmit={props.submitHandler}>
                <div className="input-group">
                    <span className="input-group-text">Write Something...</span><br></br><br></br>
                    <textarea className="form-control" aria-label="With textarea" onChange={props.handleTextChange}></textarea>
                </div>
                <div className="input-group">
                    <input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={props.handleFileChange}/>
                    {props.button}
                </div>
            </form>
        </div>
    )
}

export default Upload
