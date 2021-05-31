import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    //"mongodb+srv://sai:VY2kByaWIWw83N7i@cluster0.dipfo.mongodb.net/newsletter?retryWrites=true&w=majority"
    "mongodb://sai:VY2kByaWIWw83N7i@cluster0-shard-00-00.dipfo.mongodb.net:27017,cluster0-shard-00-01.dipfo.mongodb.net:27017,cluster0-shard-00-02.dipfo.mongodb.net:27017/events?ssl=true&replicaSet=atlas-jzsi0n-shard-0&authSource=admin&retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find()
    .sort({ _id: sort })
    .toArray();

  return documents;
}
