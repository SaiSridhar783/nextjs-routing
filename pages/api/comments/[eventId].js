import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to Database Failed" });
    return;
  }

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
      client.close();

      return;
    }

    const newComment = {
      email,
      text,
      name,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;

      res.status(201).json({ message: "New Comment Id", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting Comment Failed" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", -1);
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting Comments Failed" });
    }
  }

  client.close();
}

export default handler;
