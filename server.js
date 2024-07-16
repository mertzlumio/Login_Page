const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(express.json());

const static_path = path.join(__dirname, 'public');
app.use(express.static(static_path));

app.post('/', async (req, res) => {
  const { username, password } = req.body;
  const passkey = 'joshua10';
  const user = 'joshua';

  if (passkey === password && user === username) {
    res.status(200).send('Login Successful');

    try {
      await client.connect();
      console.log('Connected successfully to MongoDB');
      
      const db = client.db('user_data');
      const collection = db.collection('user_credentials');

      const dataToInsert = { name: username, pass: password };
      const result = await collection.insertOne(dataToInsert);
      console.log(`Inserted ${result.insertedCount} document into the collection`);

    } catch (err) {
      console.error('Error connecting to MongoDB or inserting document:', err);
      res.status(500).send('Internal Server Error');
    } finally {
      await client.close();
    }

  } else {
    res.sendStatus(401); // Unauthorized
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
