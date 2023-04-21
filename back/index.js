const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routers/authRouter')
const basketRouter = require('./routers/basketRouter')
const cors = require('cors') 

const url = "mongodb+srv://zogame002:Witcher2013@cluster0.b67le3g.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 8080;

const application = express();
application.use(cors())

application.use(express.json())
application.use('/auth', authRouter)
application.use('/basket', basketRouter)


const start = async() => {
    try {
        await mongoose.connect(url);
        application.listen(PORT, () => console.log(`server started on localhost:${PORT}`));        
    } catch (error) {
        console.log(error)
    }
}

start();