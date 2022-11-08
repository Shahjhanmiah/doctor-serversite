const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT||5000;
 
//  middleweare
 
app.use(cors())
app.use(express.json())
 
app.get('/',(req,res)=>{
    res.send('doctor car server is running')
 
})
 
app.listen(port,(req,res)=>{
    console.log(`server is running port ${port}`);
 
})
