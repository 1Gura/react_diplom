import {ADD_POSTS, TEST, ADD_POSTS_ASYNC, CLICK_LIKE} from "../constants";
const posts = (state = [], action) => {
    switch (action.type) {
        case ADD_POSTS:
            return[ ...state,...action.posts];
        case CLICK_LIKE:
             const newPosts = [...state].map((post)=> {
                if(action.id === post.id) {
                    post.liked_by_user = !post.liked_by_user
                    if(post.liked_by_user === true) {
                        post.likes = post.likes + 1;
                    }
                    else {
                        post.likes = post.likes - 1;
                    }
                }
                return post;
            })
            return newPosts;
        default:
            return state;
    }
}
export default posts;