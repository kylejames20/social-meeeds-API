const db = require('./config/connection');
const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`App is currently running on http://localhost:${PORT}`);
    });
});