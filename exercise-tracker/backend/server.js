const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//MIDDLE-WARE
app.use(cors());
app.use(express.json());

//CONNECTING TO MONGODB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
).catch(function (reason) {
    console.log('Unable to connect to the mongodb instance. Error: ', reason);
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connected successfully!");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is starting on ${port}`);
});