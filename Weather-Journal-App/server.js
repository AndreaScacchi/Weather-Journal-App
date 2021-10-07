// Setup empty JS object to act as endpoint for all routes
projectData = {};

const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
app.listen(port, () => console.log(`Server running on localhost ${port}!`));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static('website'));

// GET route
app.get('/all', sendData);

function sendData(request, response) {
    response.send(projectData)
};


// POST route
app.post('/add', addData);

function addData(req, res) {
    let data = req.body;

    projectData["temperature"] = data.temperature;
    projectData["city"] = data.city;
    projectData["description"] = data.description;
    projectData["country"] = data.country;
    projectData["date"] = data.date;

    res.send(projectData);
};
