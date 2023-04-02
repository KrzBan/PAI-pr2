const express = require('express')

const {Db} = require('./db');

// Config
const config = {
    back: {
        port: 3000,
        public_dir: "public"
    },
    db: {
        filename: "db.sqlite"
    }
}

// Prepare DB
const db = new Db(config.db.filename);

const app = express()

// Middleware
app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'accept, authorization, content-type, x-requested-with');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', req.header('origin'));

    next();
});

// Methods
app.get('/', (req, res) => {
	// Send a list of all cities
	const cities = db.GetCities();
	res.json(cities);
})
app.get('/:cityId', (req, res) => {
	const city = db.GetCity(req.params.cityId);
	res.json(city);
})

// Run
app.listen(config.back.port, () => {
  	console.log(`Example app listening on port ${config.back.port}`)
})