const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()


// MIDDLEWARE
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.EH_USER}:${process.env.EH_PASS}@cluster0.jgocbuo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db("electroHouse").collection("services");
        const inventoryCollection = client.db("electroHouse").collection("inventory");

        // Load All Services
        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        // Load All Inventory/Items
        app.get('/inventory', async (req, res) => {
            const query = {};
            const cursor = inventoryCollection.find(query);
            const inventories = await cursor.toArray();
            res.send(inventories);
        });

        app.get('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const inventory = await inventoryCollection.findOne(query);
            res.send(inventory);
        });

        // Add New Inventory/Item
        app.post('/inventory', async (req, res) => {
            const newInventory = req.body;
            const result = await inventoryCollection.insertOne(newInventory);
            res.send(result);
        });

        // Delete Inventory/Item
        app.delete('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = inventoryCollection.deleteOne(query);
            res.send(result);
        });

        // Update
        app.put('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const delivered = req.body;
            const query = { _id: new ObjectId(id) };
            const option = { upset: true }
            const updateDoc = {
                $set: {
                    quantity: delivered.update
                },
            }
            const result = await inventoryCollection.updateOne(query, updateDoc, option);
            res.send(result)
        })
    }
    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running my ElectroHouse server');
});

app.listen(port, () => {
    console.log('ElectroHouse server is running')
})