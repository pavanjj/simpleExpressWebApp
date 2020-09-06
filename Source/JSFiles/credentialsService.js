const bcryptjs = require('bcryptjs');
const { addUserDao, fetchUserCredentials } = require('./credentialsDao');

function checkUserCredentials(email, password) {
    console.log(`Checking user credentials`);
    return new Promise((resolve, reject) => {
        fetchUserCredentials(email)
            .then(response => {
                if (bcryptjs.compareSync(password, response.password)) {
                    console.log(`Authentication Successful`);
                    resolve(response);
                }
                else
                    reject(`Wrong Password`);
            })
            .catch(error => {
                console.log(`Error in checking credentials : ${error}`);
                reject(error)
            });
    })
}

function addUser(userData) {
    console.log(`Adding a new user with name : ${userData.firstName}`);
    userData.password = bcryptjs.hashSync(userData.password, 10);
    return new Promise((resolve, reject) => {
        addUserDao(userData)
            .then(response => resolve(response))
            .catch(error => reject(error));
    })
}

module.exports = {
    checkUserCredentials,
    addUser
}