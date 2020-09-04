const mongoose = require('mongoose');
function connectToDB() {
    const dbName = 'userdb';
    const userName = 'pavanjj';
    const password = 'firstPass';
    const connectionURI = `mongodb+srv://${encodeURIComponent(userName)}:${encodeURIComponent(password)}@cluster0.wncgy.mongodb.net/${encodeURIComponent(dbName)}?retryWrites=true&w=majority`;
    return new Promise((resolve, reject) => {
        mongoose.connect(connectionURI, { useUnifiedTopology: true, useNewUrlParser: true })
            .then(response => {
                console.log('DB connection established ');
                resolve(response);
            })
            .catch(error => {
                console.log('Error in connecting to DB');
                console.log(error);
                reject(error);
            });
    });
}


module.exports = connectToDB;