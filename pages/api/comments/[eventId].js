import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    //"mongodb+srv://sai:VY2kByaWIWw83N7i@cluster0.dipfo.mongodb.net/newsletter?retryWrites=true&w=majority"
    "mongodb://sai:VY2kByaWIWw83N7i@cluster0-shard-00-00.dipfo.mongodb.net:27017,cluster0-shard-00-01.dipfo.mongodb.net:27017,cluster0-shard-00-02.dipfo.mongodb.net:27017/events?ssl=true&replicaSet=atlas-jzsi0n-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      !text ||
      name.trim() === "" ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input!" });
      return;
    }

    const newComment = {
      email,
      text,
      name,
      eventId,
    };

    const db = client.db();

    const result = await db.collection("comments").insertOne(newComment);

    console.log(result);

    newComment.id = result.insertedId;

    res.status(201).json({ message: "New Comment Id", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db();

    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }

  client.close();
}

export default handler;
