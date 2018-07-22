import { authHeader } from '../_helpers';
import axios from 'axios';
import { history } from '../_helpers/history';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(email, password) {
    return axios.post(`http://localhost:8000/users/authenticate`, { email, password })
    .then(handleResponse)
        .then(user => {
            //console.log(user);
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', user.token);
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(`http://localhost:8000/users/getinfo`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(`http://localhost:8000/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {

    return axios.post(`http://localhost:8000/users/register`, user).then(handleResponse);
}

function update(user) {
    const userId = user.id;
    return axios.put(`http://localhost:8000/users/${userId}`, user).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {

    return axios.delete(`http://localhost:8000/users/${id}`).then(handleResponse);
}

function handleResponse(response) {
    const data = response.data;

    if (response.status !== 200) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            history.push('/');
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    console.log("handleResponse(response)")
    console.log(data)
    return data;
};
