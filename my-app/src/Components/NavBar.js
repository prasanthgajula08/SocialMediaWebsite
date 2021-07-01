import React from 'react';
import fire from '../config/fire';

export default function NavBar() {

   const signOutHandler = async () =>{
        await fire.auth().signOut();
        console.log("Signed out")
        window.location.replace("/");
    }

    return (
        <div class="shadow p-3 mb-5 bg-white rounded">
            <nav style={{height:"54px"}} class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/NewsFeed">
                        <img src="/logo192.png" alt="" width="30" height="30" class="d-inline-block align-text-top" />
                        SocialMediaApp
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/NewsFeed">Home</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" href="/Chat">Chat</a>
                            </li>
                            <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Profile
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="/UserProfile">My Profile</a></li>
                                <li><a class="dropdown-item" onClick={signOutHandler} /* href="/LoginPage"*/>Signout</a></li>
                            </ul>
                            </li>
                        </ul>
                        <form action="/UserProfile" class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-primary" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
}