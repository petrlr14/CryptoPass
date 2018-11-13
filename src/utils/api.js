const utilities = require('../utilities.js');
const axios = require('axios');

export function registerUser(body){
    console.log(body.name+","+body.lastName+","+body.nickname+", "+body.email+","+body.password+","+body.phone)
    return axios({
        method:'post',
        url: `${utilities.endPoint}/api/signUp`,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data:{
            name : body.name,
            lastName : body.lastName,
            nickname : body.nickname,
            email: body.email,
            password: body.password,
            phone: body.    phone
        }
    })
}