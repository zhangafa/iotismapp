import Vue from 'vue'
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';
const HOST_NAME = "https://iot.proudsmart.com";
const PORT = "";
const ROUTE = "/api/rest/post";
const REQUEST_API = HOST_NAME + PORT + ROUTE;

const getUsers = function () {
    let ret = '';
    ret = uni.getStorageSync(USERS_KEY);
    if (!ret) {
        ret = '[]';
    }
    return JSON.parse(ret);
}

const addUser = function (userInfo) {
    let users = getUsers();
    users.push({
        account: userInfo.account,
        password: userInfo.password
    });
    uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

export default {
    getUsers,
    addUser
}
