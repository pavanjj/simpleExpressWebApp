const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const connectToDB = require('./database');
const fs = require('fs');
const portNum = 3000;
const app = express();
const htmlFolderRelPath = '/../html/'
app.use(express.static(path.join(__dirname + htmlFolderRelPath + 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
const { checkUserCredentials, addUser } = require('./credentialsService');

app.get(['/', '/:htmlPage'], (req, res) => {
    const defaultPage = 'index.html';
    const htmlPage = req.params.htmlPage || defaultPage;
    const htmlFile = path.join(__dirname, htmlFolderRelPath, htmlPage);
    fs.exists(htmlFile, (fileExists) => {
        console.log(`request received for ${htmlPage}`);
        if (!fileExists) {
            console.log(`Sending  ${defaultPage} as requested file does not exist`);
            const defaultFilePath = path.join(__dirname, htmlFolderRelPath, defaultPage);
            console.log(defaultFilePath);
            res.sendFile(defaultFilePath);
        }
        else {
            console.log('Serving the requested file');
            const curFilePath = path.join(__dirname, htmlFolderRelPath, htmlPage);
            res.sendFile(curFilePath);
        }
    });
});

app.post('/sign-in', (req, res) => {
    console.log(req.body);
    checkUserCredentials(req.body.email, req.body.password)
        .then((response) => {
            res.send('<h1>You have been successfully logged in</h1>');
        })
        .catch((error) => {
            res.status(500).send('<h1>You are not a valid user</h1>')
        })

})
app.post('/sign-up', (req, res) => {
    console.log(req.body);
    addUser(req.body.email, req.body.password)
        .then((response) => {
            res.send('<h1>You are now Signed up !</h1>');
        })
        .catch((error) => {
            res.status(500).json('<h1>There was an error, please try again</h1>')
        })

})
connectToDB()
    .then((response) => {
        app.listen(process.env.PORT || portNum, () => { console.log(`Server is listening on ${portNum}`) });
    })
    .catch(error => {
        console.log('Not starting up the server due to DB Error')
    })
