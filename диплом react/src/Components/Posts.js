import React, {Component} from 'react';
import Post from "./Post";

class Posts extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    const {postsStore, newPosts} = this.props;
    return(
      <div className = 'left'>
        {postsStore.map((post, index)=> {
          return(
              <Post clickPost = {this.props.clickPost} post = {post} key = {post.id}/>
          )
        })}
        <div className="button-update-container">
          <button className="button-update" onClick={(event) => newPosts(event)}>Загрузить еще...</button>
        </div>
      </div>
    )
  }
}


export default Posts;