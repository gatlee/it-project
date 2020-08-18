const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(process.cwd(), '../frontend/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
    const count = 5;

    // Generate some passwords
    const passwords = Array.from(Array(count).keys()).map(i =>
        generatePassword(12, false)
    )

    // Return them as json
    res.json(passwords);

    console.log(`Sent ${count} passwords`);
});

app.get('/api/healthcheck', (req, res) => {
    res.send({
        "body": "OK"
    });
});

//Finally if nothing resolves send index.html
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(process.cwd(), '../frontend/build')});
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Password generator listening on ${port}`);

