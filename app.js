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
        const meninggalNum = Number(meninggalID.find('strong').text().split('.').join(''));

        let datacovid = {
            positif: positifNum,
            sembuh: sembuhNum,
            meninggal: meninggalNum,
            lastUpdate: new Date()
        };
        
        await data.find({}, '-_id').then((docs) => {
            console.log(docs[docs.length - 1].positif);
            if(docs[docs.length - 1].positif !== positifNum || docs[docs.length - 1].sembuh !== sembuhNum || docs[docs.length - 1].meninggal !== meninggalNum){
                if(meninggalNum !== 0 && sembuhNum !== 0 && meninggalNum !== 0){
                    data.insert(datacovid).then(console.log('Data added'));
                }
            }
        });
    });
}

loadData();
setInterval(loadData, 1000*60*5);

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
