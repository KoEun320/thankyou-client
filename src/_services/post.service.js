import { authHeader } from '../_helpers';
import axios from 'axios';
import { history } from '../_helpers/history';

export const postService = {
    register,
    getAll,
    getById,
    getRandom,
    update,
    like,
    dislike,
    delete: _delete
};

function register(post) {

    return axios.post(`http://localhost:8000/post/register`, post).then(handleResponse);
}

function getAll(page) {

    return axios.get(`http://localhost:8000/post/getAll/${page}`).then(handleResponse);
}

function getById(userId, page) {

    return axios.get(`http://localhost:8000/post/${userId}/${page}`).then(handleResponse);
}

function getRandom(userId) {
    return axios.get(`http://localhost:8000/post/${userId}`).then(handleResponse);
}

function update(post) {
    //debugger
    console.log('update post')
    console.log(post)
    let post_id = post.postId;
    return axios.put(`http://localhost:8000/post/${post_id}`, post).then(handleResponse);;
}

function like(postId, userId) {
    return axios.put(`http://localhost:8000/post/${postId}/like/${userId}`).then(handleResponse);;
}

function dislike(postId, userId) {
    return axios.put(`http://localhost:8000/post/${postId}/dislike/${userId}`).then(handleResponse);;
}


// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {

    return axios.delete(`http://localhost:8000/post/${id}`).then(handleResponse);
}

function handleResponse(response) {
    const data = response.data;

    if (response.status !== 200) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            history.push('/main');
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    console.log("handleResponse(response)")
    console.log(data)
    return data;
};
