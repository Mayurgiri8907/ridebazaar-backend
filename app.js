const express = require('express');
const app = express();
require('dotenv').config();
const connectdb = require('./config/db');
const userRouter = require('./router/user')


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/user',userRouter);
app.get("/", (req,res) => {
    res.send("server is runing and hii");
});


connectdb().then(() => {
    app.listen(process.env.PORT, (error) => {
        console.log(error);
    });
}).catch((error) => {
    console.log(error);
})