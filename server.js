// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware - dependencies*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { request, response } = require('express');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));





//GET - METHOD ROUTE
app.get('/weather', (request, response) => {
    console.log("got a weather request"); //for debugging
    response.send(projectData)
});

//POST - METHOD ROUTE
app.post('/weather/saveData', (req, res) => {
    projectData = req.body;
    res.send();
});




// Setup Server
const port = 7700;

//listening function for server
function listening() {
    console.log(`Running on port: ${port}`);
}

const server = app.listen(port, listening);
