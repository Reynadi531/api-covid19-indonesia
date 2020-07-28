const cheerio = require('cheerio');
const monk = require('monk');
const request = require('request');

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
            console.log(docs[docs.length - 1]);
            if(docs[docs.length - 1].positif !== positifNum || docs[docs.length - 1].sembuh !== sembuhNum || docs[docs.length - 1].meninggal !== meninggalNum){
                if(meninggalNum !== 0 && sembuhNum !== 0 && meninggalNum !== 0){
                    data.insert(datacovid).then(console.log('Data added'));
                }else{
                    console.log('Web erorr');
                }
            }else{
                console.log('Data not valid')
            }
        });
    });
}

loadData();
setInterval(loadData, 1000*60*5);