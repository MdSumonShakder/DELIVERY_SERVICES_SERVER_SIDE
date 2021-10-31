const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

///// MIDDLEWARE ////
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ttyfb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
  try {
    await client.connect();

    const database = client.db('food_Delivery');
    const deliveryCollection = database.collection('Order');



    /// GET API ORDER-SERVICES

    app.get('/Order', async (req, res) => {
      const cursor = deliveryCollection.find({});
      const order = await cursor.toArray();
      res.send(order);
    });

    /// GET SINGLE ORDER-SERVICES

    app.get('/Order/:id', async (req, res) => {
      const id = req.params.id;
      console.log('order res', id);
      const query = { _id: ObjectId(id) };
      const singleService = await deliveryCollection.findOne(query);
      res.json(singleService);
    });

    ///// DELETE SINGLE ORDER-SERVICES
    app.delete('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await deliveryCollection.deleteOne(query);
      res.json(result);

    })

  }
  finally {

    // await client.close();
  }
}

run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Food Delivery!')
})

app.listen(port, () => {
  console.log('Good Food Delivery  Server', port)
});