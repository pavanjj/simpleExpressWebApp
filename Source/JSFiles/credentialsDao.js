const Credentials = require('./credentials');


function fetchUserCredentials(pEmail) {
    return new Promise((resolve, reject) => {
        const query = { email: pEmail };
        Credentials.findOne(query)
            .then(response => {
                if (!response)
                    reject(response);
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    })
}

function addUserDao(userObj) {
    return new Promise((resolve, reject) => {
        const newUserCreds = Credentials(userObj);
        newUserCreds.save()
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    })
}

module.exports = {
    addUserDao,
    fetchUserCredentials
}