const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());

const static_path = path.join(__dirname, "public");
app.use(express.static(static_path));

let db;
let collection;

async function initialize() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    db = client.db("user_data");
    collection = db.collection("user_credentials");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    res.status(500).send("Internal Server Error");
  } finally {
    //await client.close();
  }
}

initialize();

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //console.log({ username, password });
  try {
    const user = await collection.findOne({ name: username });
    //console.log(user);
    if (user && password == user.pass) {
      res.status(200).send("Login Successful");
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/signup", async (req, res) => {
  const { n_username, n_password } = req.body;
  //console.log(n_username);
  try {
    const existingUser = await collection.findOne({ name: n_username });

    if (existingUser) {
      console.log(existingUser);
      res.status(400).send("Username already taken");
    } else {
      await collection.insertOne({
        name: n_username,
        pass: n_password,
      });

      res.status(201).send("User created successfully");
    }
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
