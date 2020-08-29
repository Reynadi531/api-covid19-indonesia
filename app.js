const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const monk = require('monk');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

const middlewares = require('./middlewares');

require('dotenv').config();

let port = process.env.PORT || 3000;

const IndonesiaRoutes = require('./Routes/indonesia');

app.use('/api', IndonesiaRoutes);

app.get('/api', (req, res) => {
    res.json({
        Endpoints: [
            `${req.hostname}/api/indonesia`
        ]
    })
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.get('/', (req, res) => {
    res.json({
        Messages: 'API Covid-19 Indonesia',
        Endpoints: `${req.hostname}/api/indonesia`
    });
});


app.listen(port, () => {
    console.log(`Listening at ${port}`);
});
