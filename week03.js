const express= require('express');
const {MongoClient} =require ('mongodb');
const port = 3000

const app = express();
app.use(express.json());

let db;

async function connectToMongoDB() {
        const uri = "mongodb://localhost:27017";
        const client =new MongoClient(uri);

        try{
            await client.connect();
            console.log("Connected to MongoDB!");

            db = client.db("testDB");
        
        }catch (err){
            console.error("Error:", err);
        }
}
connectToMongoDB();

app.listen(port, () =>{
    console.log('Server running on port ${port}');
});

//GET/rides-FETCH all rides
app.get('/rides', async (req, res)=>{
    try{
        const rides =await db.collection ('rides').find().toArray();
        res.status(200).json(rides);
    } catch{err}{
        res.status(500).json({error: "Failed to fetch rides"});
    }
});

// POST/rides - Create a new ride
app.post ('/rides', async(req, res) => {
    try {
        const result = await db.collection('rides').insertOne(req.body);
        res.status(200).json({ id: result.insertedId });
    } catch(err) {
        res.status(400).json({ error: "Invalid ride data" });
    }
});

// PATCH/rides/id - Update ride status
app.patch('/rides/:id', async(req, res) => {
    try {
        const result = await db.collection('rides').updateOne(
            { _id: newRejectId(req.params.id) },
            { $set: { status: req.body.status } }
        );
        if (result.modification == 0) {
            return res.status(400).json({ error: "Ride not found" });
        }
        res.status(200).json({ updated: result.modifiedCount });

    } catch(err) {
        res.status(400).json({ error: "Invalid ride ID order" });
    }
});
// DELETE/rides/id - Cancel a ride
app.delete('/rides/:id', async(req, res) => {
    try {
        const result = await db.collection('rides').deleteOne(
            { _id: newRejectId(req.params.id) }
        );
        if (result.deleteCount == 0) {
            return res.status(400).json({ error: "Ridenotfound" });
        }
        res.status(200).json({ delete: result.deleteCount });
    } catch(err) {
        res.status(400).json({ error: "Invalid ride ID" });
    }
});