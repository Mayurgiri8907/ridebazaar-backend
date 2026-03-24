require('dotenv').config();
const express = require('express');
const app = express();
const connectdb = require('./config/db');
const userRouter = require('./router/user')
const cors = require('cors');



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/user',userRouter);
app.get("/", (req,res) => {
    res.send("server is runing and hii");
});


connectdb()
  .then(() => {
    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Startup Error:", error);
  });