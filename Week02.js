const { MongoClient } = require("mongodb");
const drivers=[
    {  
        name: "John Doe",
        vehicleType: "Sedan",
        isAvailable: true,
        rating: 4.8
    },
    {  
        
        name: "Alice Smith",
        vehicleType: "SUV",
        isAvailable: false,
        rating: 4.8
    }
]


drivers.push(
    {name: "Sarah",
    vehicleType: "Honda",
    isAvailable: false,
    rating: 4.5})

console.log(drivers);
console.log("Driver Names:");
drivers.forEach(driver => console.log(driver.name));
async function main() {
// MongoDB connection URL
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db("testDB");
        const collection = db.collection("drivers");

        // Insert a document
        await collection.insertMany(drivers);

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

main();
