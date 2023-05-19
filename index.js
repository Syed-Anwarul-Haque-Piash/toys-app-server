const express = require('express');
const cors=require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

//toyMarket
//rv2nei2zgDXp2M9Z


const uri = "mongodb+srv://toyMarket:rv2nei2zgDXp2M9Z@cluster0.4doag.mongodb.net/?retryWrites=true&w=majority";

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
    const toyCollection=client.db('toyMarket').collection('toys');

    app.post('/addtoy',async(req,res)=>{
        const toy=req.body;
        const result=await toyCollection.insertOne(toy);
        res.send(result);
        console.log(toy);
    })

    app.get('/alltoys',async(req,res)=>{
        const result=await toyCollection.find().toArray();
        res.send(result);
    })

    app.get('/mytoys/:email',async(req,res)=>{
      console.log(req.params.email);
      // let query={};
      // if(req.query?.postedBy){
      //   query={postedBy:req.query.postedBy}
      // }
      const result=await toyCollection.find({postedBy:req.params.email}).toArray();
      res.send(result);
    });


    app.get('/alltoys/:id',async(req,res)=>{
        const id=req.params.id;
        const result=await toyCollection.findOne({_id:new ObjectId(id)});
        res.send(result);
    });


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('hi......Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})