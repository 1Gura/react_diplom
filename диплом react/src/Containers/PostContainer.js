import React, {Component} from 'react'
import Header from "../Components/Header";
import Feed from "../Components/Feed";
import Footer from "../Components/Footer";
import InstaService from '../services/InstaService'
import {connect} from 'react-redux'
import Unsplash, {toJson}  from 'unsplash-js';

import {clickLike, postsFetchData, test} from "../actions/actionCreatore";

const unsplash = new Unsplash(
    {
        accessKey: "AjdqGNN2J3YljxoQKuDTucL8mCkxqv-hLhRMpMO3PSg",
        secret: "XhyISIZuair3TxDrjB8WBGaVf6uLgpkgxaDCuf39rZc",
        callbackUrl: "http://localhost:3000/",
        //callbackUrl: "urn:ietf:wg:oauth:2.0:oob",
    });
const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    'public',
    'write_likes',
    'read_user',
    'write_user',
    'read_photos',
    'write_photos',
    'write_followers',
    'read_collections',
    'write_collections',
]);

class PostContainer extends Component{
    state = {
        clientId:"AjdqGNN2J3YljxoQKuDTucL8mCkxqv-hLhRMpMO3PSg",
        error:false,
        numberOfPhotos:10,
        page:1,
        unsplashBody: {}
    }

    componentDidMount() {
        const code = window.location.search.split('code=')[1];
        if(code) {
            unsplash.auth.userAuthentication(code)
                .then(toJson)
                .then(json => {
                    unsplash.auth.setBearerToken(json.access_token);
                    this.setState({
                        unsplashBody: unsplash
                    })
                });
            unsplash.photos.listPhotos(1, 10, "latest")
                .then(toJson)
                .then(json => {
                    console.log(json)
                    this.setState({
                        posts:json
                    })
                });
        }
        else {
            //alert('redirect');
            window.location.assign(authenticationUrl);
        }

        // this.props.fetchData(`https://api.unsplash.com/photos?page=${this.state.page}&query/?count=${this.state.numberOfPhotos}&client_id=${this.state.clientId}`)
    }

    updatePosts = (id, newPhoto) => {
        const newPosts = [...this.state.posts].map((photo)=> {
            let copyPhoto = {...photo};
            if(copyPhoto.id === id) {
                copyPhoto = newPhoto;
            }
            return copyPhoto;
        })
        this.setState({
            posts:newPosts
        })
    }


    like = (id) => {
        let photo = this.state.posts.find(photo => photo.id === id);
        if(photo.liked_by_user === false) {
            console.log('like')
            this.state.unsplashBody.photos.likePhoto(id)
                .then(toJson)
                .then(json => {
                    this.updatePosts(id, json);
                })

        }
        else {
            console.log('unlike');
            this.state.unsplashBody.photos.unlikePhoto(id)
                .then(toJson)
                .then(json => {
                    this.updatePosts(id,json)
                })
        }
    }

    newPosts =(event)=> {
        let {clientId, posts,numberOfPhotos,page, unsplashBody} = this.state;
        this.setState({
            page: ++page
        })
        unsplashBody.photos.listPhotos(page, 10, "latest")
                .then(toJson)
                .then(json => {
                    this.setState({
                        posts:[...this.state.posts, ...json]
                    })
                });

        //const url = `https://api.unsplash.com/photos?page=${page}&query/?count=${numberOfPhotos}&client_id=${clientId}`
        //this.props.fetchData(url);
    }

        render() {
        const {posts} = this.props;
        console.log('Посты',this.state.posts);
        return (
            <div className="post__container">
                <Header/>
                <Feed posts = {this.state.posts} newPosts = {this.newPosts}  clickPost = {this.like}/>
                <Footer/>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return{
        posts:state.posts
    };
}

const mapDispatchToProps = dispatch => {
    return{
        fetchData: url => dispatch(postsFetchData(url)),
        clickPost: id => dispatch(clickLike(id))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(PostContainer);