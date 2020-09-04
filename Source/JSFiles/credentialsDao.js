const Credentials = require('./credentials');


function checkUserCredentialsDao(pEmail, pPassword) {
    return new Promise((resolve, reject) => {
        const query = {
            $and: [
                { email: pEmail },
                { password: pPassword }
            ]
        };
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
                console.log(response);
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    })
}

module.exports = {
    addUserDao,
    checkUserCredentialsDao
}