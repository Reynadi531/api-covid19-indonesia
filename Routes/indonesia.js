const router = require('express').Router();
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const fakeSchema = new mongoose.Schema({}, {strict: false});

const data = new mongoose.model('data', fakeSchema, 'data');

router.get('/indonesia', async(req, res, next) => {
    let db = await data.find().select('-_id');
    // Untuk View
    if(req.query.view == 'all') {
        res.json(db);
    }else if(req.query.view == 'latest') {
        res.json(db[db.length - 1]);
    }else if(!req.query.view) {
        res.json(db[db.length - 1]);
    }
});

module.exports = router;