import { MongoClient } from "mongodb";
import { hash } from "bcryptjs";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    //Getting email and password from body
    const { email, password } = req.body;
    //Validate
    if (!email || !email.includes("@") || !password) {
      res.status(422).json({ message: "Invalid Data" });
      return;
    }
    //Connect with database
    const client = await MongoClient.connect(
      "mongodb://cpre_ubicom:7M72J9M3RFx29s75@192.168.42.201:27017/?authSource=cpreauth&readPreference=primary&appname=MongoDB+Compass&directConnection=true&ssl=false",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    const db = client.db("ubicom");
    //Check existing
    var query = { email: email };
    try {
      var checkExisting = await db.collection("userdatabase").findOne(query);
    } catch (err) {
      return;
    }
    //Send error response if duplicate user is found
    if (checkExisting) {
      res.status(422).json({ message: "User already exists" });
      client.close();
      return;
    }
    //Hash password
    const status = await db.collection("userdatabase").insertOne({
      email,
      token: await hash(email, 12),
      password: await hash(password, 12),
      firstname: 'Firstname',
      lastname: 'Lastname',
      bio:'Bio'
    });
    //Send success response
    res.status(201).json({ message: "", ...status });
    //Close DB connection
    client.close();
  } else if (req.method === "PUT") {
    //Getting email and password from body
    const { email, password } = req.body;
    //Validate
    if (!email || !email.includes("@") || !password) {
      res.status(422).json({ message: "Invalid Data" });
      return;
    }
    //Connect with database
    const client = await MongoClient.connect(
      "mongodb://cpre_ubicom:7M72J9M3RFx29s75@192.168.42.201:27017/?authSource=cpreauth&readPreference=primary&appname=MongoDB+Compass&directConnection=true&ssl=false",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    const db = client.db("ubicom");
    //Check existing
    var query = { email: email };
    try {
      var checkExisting = await db.collection("userdatabase").findOne(query);
    } catch (err) {
      return;
    }
    //Send error response if duplicate user is found
    if (!checkExisting) {
      res.status(422).json({ message: "User does not exists" });
      client.close();
      return;
    }
    //Hash password
    const status = await db.collection("userdatabase").updateOne(
      {
        _id: checkExisting._id,
      },
      { $set: { password: await hash(password, 12) } }
    );
    //Send success response
    res.status(201).json({ message: "", ...status });
    //Close DB connection
    client.close();
  } else if (req.method === "GET") {
    res.status(500).json({ message: "This is protected content." });
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route invalid" });
  }
}

export default handler;
