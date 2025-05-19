const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { MongoClient } = require("mongodb");
const bodyparser = require("body-parser");
// Connection URL
const app = express();
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
app.use(express.json());
app.use(bodyparser.json());
app.use(cors());
const dbName = "passop";
const PORT = process.env.PORT;

client.connect();
//get all the passwords
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});
//save a password
app.post("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result: findResult });
});

//delete a password
app.delete("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password);
  res.send({ success: true, result: findResult });
});

app.listen(PORT, (req, res) => {
  console.log(`app is listening at port no http://localhost:${PORT}`);
});
