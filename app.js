const express = require('express');
const bodyParser = require('body-parser');
const subscriptionRoutes = require('./src/api/routes/subscription');
const weatherRoutes = require('./src/api/routes/weather');
const migrateRoute = require('./src/api/routes/migrate');
const {join} = require("node:path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', subscriptionRoutes);
app.use('/api', weatherRoutes);
app.use('/api', migrateRoute);

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'src', 'public', 'subscribe.html'));
});

module.exports = app;
