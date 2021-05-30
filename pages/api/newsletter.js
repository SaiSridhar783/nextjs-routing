import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    const client = await MongoClient.connect(
      //"mongodb+srv://sai:VY2kByaWIWw83N7i@cluster0.dipfo.mongodb.net/newsletter?retryWrites=true&w=majority"
      "mongodb://sai:VY2kByaWIWw83N7i@cluster0-shard-00-00.dipfo.mongodb.net:27017,cluster0-shard-00-01.dipfo.mongodb.net:27017,cluster0-shard-00-02.dipfo.mongodb.net:27017/events?ssl=true&replicaSet=atlas-jzsi0n-shard-0&authSource=admin&retryWrites=true&w=majority"
    );
    const db = client.db();

    await db.collection("newsletter").insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
