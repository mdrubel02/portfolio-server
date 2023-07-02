const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion ,ObjectId} = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000

//user03
//password:whxN4IvmgSmeyDtq
app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://user03:whxN4IvmgSmeyDtq@cluster0.iucmgfs.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const projectsCollection = client.db('Portfolio').collection('projects')

        app.get('/projects', async (req,res)=>{
            const result = await projectsCollection.find({}).toArray()
            res.send(result)
        })

        app.get('/projects/:id', async (req, res)=>{
            const id = req.params.id
            const query = {_id: new ObjectId(id) }
            const result = await projectsCollection.findOne(query)
            res.send(result);
        })

  } finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`server runing on ${port}`)
})