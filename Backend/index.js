const express = require('express');
var cors = require('cors');
const app = express();


class Reservation {
    constructor(id, petId, dateTime, durationMins, comment) {
        this.id = id;
        this.petId = petId;
        this.dateTime = dateTime;
        this.durationMins = durationMins;
        this.comment = comment;
    }
}

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!

app.use(cors());
app.use(express.json());

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }



var login = require('./login');
var checkAuthHeader = require('./checkAuth');

var pets = require('./pets');
var getPets = require('./getPets');
var postPets = require('./postPets');
var getPetById = require('./getPetById');
var putPet = require('./putPet');

var visits = require('./visits');
var getVisits = require('./getVisits');
var postVisits = require('./postVisits');


app.post('/login', cors(corsOptions), (req, res) => {
    login(req, res);
});

// GET /pets
app.get('/pets', cors(corsOptions), (req, res) => {
    getPets(req, res, checkAuthHeader, pets);
});

app.get('/pets/:petId', cors(corsOptions), (req, res) => {
    getPetById(req, res, checkAuthHeader, pets);
});

app.post('/pets', cors(corsOptions), (req, res) => {
    postPets(req, res, checkAuthHeader, pets);
});

app.put('/pets/:petId', cors(corsOptions), (req, res) => {
    putPet(req, res, checkAuthHeader, pets);
});


// GET /visits
app.get('/visits', cors(corsOptions), (req, res) => {
    getVisits(req, res, checkAuthHeader, visits, pets);
});

// POST /visits
app.post('/visits', cors(corsOptions), (req, res) => {
    postVisits(req, res, checkAuthHeader, visits, pets);
});


app.listen(4000);