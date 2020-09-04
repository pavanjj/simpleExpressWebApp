const { addUserDao, checkUserCredentialsDao } = require('./credentialsDao');

function checkUserCredentials(email, password) {
    console.log(`Checking user credentials`);
    return new Promise((resolve, reject) => {
        checkUserCredentialsDao(email, password)
            .then(response => resolve(response))
            .catch(error => {
                console.log(`Error in checking credentials : ${error}`);
                reject(error)
            });
    })
}

function addUser(email, password) {
    console.log(`Adding a new user with email ${email}`);
    const userObj = { email, password };
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