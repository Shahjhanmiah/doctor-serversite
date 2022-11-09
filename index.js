const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId,  } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT||5000;
 
//  middleweare
 
app.use(cors())
app.use(express.json())




const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ga6ydds.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const servicesCollection=client.db('doctormongodb').collection('services')
const orderCollection=client.db('doctormongodb').collection('orders')


async function run(){
    client.connect()
    console.log("database connect");
    try{
        app.get('/Service',async(req,res)=>{
            const query = {};
            const cursor = servicesCollection.find(query);
            const service= await cursor.toArray();
            res.send(service)
        })

        app.get('/Service/:id',async(req,res)=>{
            const id = req.params.id;
            const query={_id:ObjectId(id)}
            const service = await servicesCollection.findOne(query)
            res.send(service)
        })
          
          app.post('/Orders',async(req,res)=>{
            const order = req.body;
            const result = await orderCollection.insertOne(order)
            res.send(result)
          })
       


    }
    finally{

    }

}
run().catch(error=>console.log(error))


 
app.get('/',(req,res)=>{
    res.send('doctor car server is running')
 
})
 

app.listen(port,(req,res)=>{
    console.log(`server is running port ${port}`);
 
})

// mongodb user :doctordb
// mongodb password:xap5Bw2LjUsAwkJi

//Doctordb
//Servic
