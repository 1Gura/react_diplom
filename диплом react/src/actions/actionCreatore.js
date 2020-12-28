import {ADD_POSTS, ADD_POSTS_ASYNC, CLICK_LIKE, TEST} from "../constants";

export const postsFetchDataSuccess = (posts) => {
    return {
        type:ADD_POSTS,
        posts: [ ...posts]
    }
}
export const  postsFetchData = (url) => {
    return async (dispatch) => {
        await fetch(url)
            .then(response => {
                if(!response.ok) {
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(posts => dispatch(postsFetchDataSuccess(posts)))
    }
};

export const clickLike = (id) => {
    return {
        type:CLICK_LIKE,
        id: id
    }
}