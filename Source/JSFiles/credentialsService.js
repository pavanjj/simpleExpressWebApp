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

function addUser(email, password) {
    console.log(`Adding a new user with email ${email}`);
    const userObj = { email, password: bcryptjs.hashSync(password, 10) };
    return new Promise((resolve, reject) => {
        addUserDao(userObj)
            .then(response => resolve(response))
            .catch(error => reject(error));
    })
}

module.exports = {
    checkUserCredentials,
    addUser
}