const login = function(name, pass) {
    return new Promise(function(resolve, reject) {
        if(utils.users.find(user => user.name == name && user.pass == pass)){
            resolve(utils.token);
        } else {
            reject('Usuario o contraseña inválidos!');
        }
    })
}

import utils from '@/assets/utils'
export default {
    login: login
}