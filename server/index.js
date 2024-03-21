const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const authRoute = require('./routes/jwtAuth');
const showData = require('./routes/showData');
const insertData = require('./routes/insertData');
const updateData = require('./routes/updateData');

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PORT, PORTS } = process.env;


const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
const corsOptions = {
    origin: ['http://localhost:3000', 'http://192.168.1.7:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}

// MIDDLEWARE
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('client'));
app.use(express.static('admin'));

//  ROUTERS
app.use('/authRoute', authRoute);
app.use('/showData', showData);
app.use('/insertData', insertData);
app.use('/updateData', updateData);


// Catch-all route handler for client
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});
// Catch-all route handler for admin
app.get('/admin', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'admin', 'index.html'));
});

// Catch-all route handler for unknown routes
app.get('*', (req, res) => {
    res.status(404).send('Page not found');
});


const port = PORTS || 5001;
// Start the Express server
app.listen(port, () => {
    console.log(`Server is up and running on http://localhost:${port}`);
});