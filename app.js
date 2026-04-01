require('dotenv').config();
const express = require('express');
const app = express();
const connectdb = require('./config/db');
const userRouter = require('./router/user')
const adminRouter = require('./router/admin')
const vahicalRouter = require('./router/vahical')
const cors = require('cors');
const path = require("path");



app.use(cors({
  origin: "*",
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use('/api/user',userRouter);
app.use('/api/admin',adminRouter);
app.use('/api/vahical',vahicalRouter);
app.get("/api/home", (req,res) => {
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