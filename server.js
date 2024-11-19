const express = require('express');
const bodyParser = require('body-parser'); // Correct
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3001;

// CORS headers configuration
app.use((req, res, next) => {
    const allowedOrigin = process.env.ALLOWED_ORIGIN || '*'; 

    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
    next();
});

app.use(bodyParser.json());

app.use('/', require('./routes'));  // This assumes you have routes configured

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is Listening and node running on port ${port}`);
        });
    }
});
