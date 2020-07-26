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

function loadData() {
    request('https://covid19.go.id/', async(error, response, body) => {
        const $ = cheerio.load(body);
        const positifID = await $('#case > div > div > div > div > div:nth-child(2) > div:nth-child(3)');
        const sembuhID = await $('#case > div > div > div > div > div:nth-child(2) > div:nth-child(4)');
        const meninggalID = await $('#case > div > div > div > div > div:nth-child(2) > div:nth-child(5)');
        const positifNum = Number(positifID.find('strong').text().split('.').join(''));
        const sembuhNum = Number(sembuhID.find('strong').text().split('.').join(''));
        const meinggalNum = Number(meninggalID.find('strong').text().split('.').join(''));

        let datacovid = {
            positif: positifNum,
            sembuh: sembuhNum,
            meninggal: meinggalNum,
            lastUpdate: new Date()
        };

        console.log(datacovid);

        await data.insert(datacovid).then(console.log('Inserting Data'));
    });
}

loadData();
setInterval(loadData, 1000*60*60*2);
// setInterval(loadData, 1000*60*60*2);
// loadData();

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