const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()

// electroHouseAdmin
// 506Azc22YIjj7AI1

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://electroHouseAdmin:506Azc22YIjj7AI1@cluster0.jgocbuo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});


// MIDDLEWARE
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Running my ElectroHouse server');
});

app.listen(port, () => {
    console.log('ElectroHouse server is running')
})