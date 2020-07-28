const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const request = require('request');
const cheerio = require('cheerio');
const yup = require('yup');
const monk = require('monk');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

require('dotenv').config();

const db = monk(process.env.MONGO_URI);
const data = db.get('data');

let port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        "Messages": "API Covid-19 Indonesia",
        "Endpoints": "/api/indonesia"
    });
});

app.get('/api/indonesia', (req, res) => {
    data.find({}, '-_id').then((docs) => {
        res.json(docs[docs.length - 1]);
    });
})

app.listen(port, () => {
    console.log(`Listening at ${port}`);
});
