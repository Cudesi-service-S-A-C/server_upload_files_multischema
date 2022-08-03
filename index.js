require('dotenv').config()
const express = require('express');

const path = require('path');

// Initializations
const app = express();

// Settings
app.set('port', process.env.SERVER_PORT || 4000);

//Accesses
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        'X-Requested-With, Authorization, Content-Type, Content-Length'
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

// Static routes
app.use('/', require('./src/routes/default.routes'));

// Routes
app.use('/images',require('./src/routes/image.routes'));
app.use('/files',require('./src/routes/file.routes'));

// Static files
app.use("/image", express.static(path.join(__dirname, '/src/public/images')));
app.use("/file", express.static(path.join(__dirname, '/src/public/files')));

// Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});