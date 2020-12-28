import React, {Component} from 'react'
import {connect} from 'react-redux'
import Unsplash  from 'unsplash-js';
import {Redirect, useHistory} from "react-router-dom"

let code;
let flag = false;
class Auth extends Component{
    state = {
        history:useHistory
    }
    auth() {
        const unsplash = new Unsplash({
            accessKey: "AjdqGNN2J3YljxoQKuDTucL8mCkxqv-hLhRMpMO3PSg",
            secret: "XhyISIZuair3TxDrjB8WBGaVf6uLgpkgxaDCuf39rZc",
            callbackUrl: "http://localhost:3000/auth",
        })
        code = window.location.search.split('code=')[1];
        if (code) {
            unsplash.auth.userAuthentication(code)
                .then(res=> res.json())
                .then(json => {
                    if(json.access_token)
                        flag = true;
                    unsplash.auth.setBearerToken(json.access_token);
                    localStorage.setItem('token', json.access_token);
                    localStorage.setItem('bodyToken', JSON.stringify(json));
                    localStorage.setItem('unsplashBody', JSON.stringify(unsplash));
                    //unsplash.photos.likePhoto("eUSzWU9ztsQ");
                })
        }
    }

    handleClick = () => {
        this.state.history.push('/')
    }

    componentDidMount() {
        this.auth()
    }

    render() {
        const token = localStorage.getItem('token');
        if (token) {
            return (
                // <button onClick={this.handleClick}>Вернуться на главную...</button>
                <Redirect to = {"/"}/>
            )
        }
        else {
            return(
                <div className="autorize__container">
                    <h2>THIS is autorize </h2>
                    <button onClick={this.handleClick}>Вернуться на главную...</button>
                </div>
            )
        }
    }
}

export default Auth;