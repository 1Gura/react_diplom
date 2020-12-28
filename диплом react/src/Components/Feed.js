import React from 'react';
import Posts from './Posts';
import Users from './Users';


const Feed = (props) => {
  let propsItem;
  if(props.posts === undefined || props.posts === null) {
    propsItem = []
  }
  else {
    propsItem = props.posts;
  }
  return(
    <div className = "container feed">
      <Posts postsStore = {propsItem} newPosts = {props.newPosts} clickPost = {props.clickPost}/>
      <Users/>
    </div>
  )
}

export default Feed;