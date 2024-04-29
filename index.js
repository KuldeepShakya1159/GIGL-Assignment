require('dotenv').config();
require('./src/database/dbconfig');

const express= require('express');
const app = express();

// middleware
app.use(express.json());



const userRoutes = require('./src/router/userRoutes');

// routes
app.use('/user',userRoutes);




app.listen(process.env.PORT || 5000,(err)=>{
    if(err){
        console.log(`server failed to start because ${err}`)
    }else{
        console.log(`server has started ${process.env.PORT}`)
    }
})
