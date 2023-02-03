const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');
const connectDB = require('./Config/connection');

// connecting database
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// routes
app.use('/', require('./routes/index'));

app.listen(PORT, () => {
    console.log("\n\n|--------------- server started ---------------|");
});