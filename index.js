const express = require('express')
const cors = require('cors')
const jwt = require("jsonwebtoken")
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

        // jwt 
        app.post('/jwt',(req,res)=>{
            const user = req.body;
            const token =jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})
            res.send({token})
        })
        app.get('/Service',async(req,res)=>{
            const query = {};
            const cursor = servicesCollection.find(query);
            const service= await cursor.limit(3).toArray();
            res.send(service)
        })
        app.get('/service',async(req,res)=>{
            const query = {};
            const cursor = servicesCollection.find(query);
            const servic= await cursor.limit(6).toArray();
            res.send(servic)
        })

        // speack  id 
        app.get('/Service/:id',async(req,res)=>{
            const id = req.params.id;
            const query={_id:ObjectId(id)}
            const service = await servicesCollection.findOne(query)
            res.send(service)
        })


        // orders api 
        app.get('/Orders',async(req,res)=>{
            let query = {};
             if(req.query.email){
                query={
                    email:req.query.email
                }
             }
             const cursor = orderCollection.find(query)
             const  order = await cursor.toArray()
             res.send(order)
            })
            
          app.post('/Orders',async(req,res)=>{
            const order = req.body;
            const result = await orderCollection.insertOne(order)
            res.send(result)
          })

         

    // update button click 

    app.patch('/Orders/:id',async(req,res)=>{
        const id  = req.params.id;
        const status= req.body.status;
        const query = {_id:ObjectId(id)}
        const updateDoc= {
            $set:{
                status:status
            }
            
        }
        const result = await orderCollection.updateOne(query,updateDoc)
        res.send(result)
        
    })

    app.delete('/Orders/:id',async(req,res)=>{
        const id = req.params.id
        const query = {_id:ObjectId(id)};
        const result = await orderCollection.deleteOne(query)
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
