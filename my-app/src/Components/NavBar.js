import React, { useState } from 'react';
import fire from '../config/fire';

export default function NavBar() {

    const [searchValue, setSearchValue] = useState("")

   const signOutHandler = async () =>{
        await fire.auth().signOut();
        console.log("Signed out")
        window.location.replace("/");
    }

    const searchChangeHandler = (event) => {
        setSearchValue(event.target.value)
    }

    const searchClickHandler = () => {
        window.location.replace("/search/"+searchValue);
    }

    return (
        <div className="shadow p-3 mb-5 bg-white rounded">
            <nav style={{height:"54px"}} className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/NewsFeed">
                        <img src="/logo192.png" alt="" width="30" height="30" className="d-inline-block align-text-top" />
                        SocialMediaApp
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/NewsFeed">Home</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" href="/Temp">Chat</a>
                            </li>
                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Profile
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="/UserProfile">My Profile</a></li>
                                <li><a className="dropdown-item" onClick={signOutHandler} /* href="/LoginPage"*/>Signout</a></li>
                            </ul>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <input onChange={searchChangeHandler} className="form-control me-2" placeholder="Search" aria-label="Search" />
                            <button onClick={searchClickHandler} className="btn btn-outline-primary">Search</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}