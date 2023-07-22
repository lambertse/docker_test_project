// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
// app.js
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // Replace with your MongoDB connection URL
const dbName = 'test'; // Replace with your database name
app.use(cors());
async function getListUser ()   {
  try {
    // Connect to the MongoDB server
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });

    // Access the database
    const db = client.db(dbName);
    const collection = db.collection('user'); // Replace with your collection name
    const result =  await collection.find({}).project({_id: 0, name: 1}).toArray()
    console.log(result)
    // Perform your MongoDB operations here

    // Close the MongoDB connection
    client.close();
    return result
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
async function addNewData(name){
  try {
    // Connect to the MongoDB server
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });

    // Access the database
    const db = client.db(dbName);

    // Extract data from the request body

    // Insert the new data into the collection
    const collection = db.collection('user'); // Replace with your collection name
    const result = await collection.insertOne({ name });

    // Close the MongoDB connection
    client.close();

    // Send a success response with the inserted data
    return result
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
// Route for the home page
app.get('/get-services', (req, res) => {
  getListUser().then(listUser => {
    res.json(listUser);
  })
});

app.get('/new', (req, res)=>{
  addNewData(req.query.name).then( r => {
    res.json(r)
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
