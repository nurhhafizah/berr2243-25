const { MongoClient } = require("mongodb");
async function main() {
// MongoDB connection URL
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db("testDB");
        const collection = db.collection("Users");

        // Insert a document
        await collection.insertOne({ name: "Hafizah", age: 22 });
        console.log("Document inserted!")
        const result = await collection.findOne({name: "Hafizah"});
        console.log("Query result:", result);

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

main();