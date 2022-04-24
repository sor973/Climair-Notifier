import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    //Getting email and password from body
    const { user, email, firstname, lastname, bio } = req.body;
    //Validate
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email" });
      return;
    }
    //Connect with database
    const client = await MongoClient.connect(
      "mongodb://cpre_ubicom:7M72J9M3RFx29s75@192.168.42.201:27017/?authSource=cpreauth&readPreference=primary&appname=MongoDB+Compass&directConnection=true&ssl=false",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    const db = client.db("ubicom");
    //Check existing
    var query = { email: user };
    try {
      var checkExisting = await db.collection("userdatabase").findOne(query);
    } catch (err) {
      return;
    }

    var checkEmail = { email: email };
    try {
      var checkEmailExisting = await db
        .collection("userdatabase")
        .findOne(checkEmail);
    } catch (err) {
      return;
    }
    //Send error response if duplicate user is found
    if (checkEmailExisting && user !== email) {
      res.status(422).json({ message: "User already exists" });
      client.close();
      return;
    }
    //Hash password
    const status = await db.collection("userdatabase").updateOne(
      {
        _id: checkExisting._id,
      },
      {
        $set: {
          email: email,
          firstname: firstname,
          lastname: lastname,
          bio: bio,
        },
      }
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
