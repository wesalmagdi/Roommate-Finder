const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const routes = require('./routes');
const { logger } = require('./middlewares');

app.use(express.json());
app.use(logger);
app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Roommate Finder Backend is running!');
});