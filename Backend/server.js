const express=require("express");
const cors=require("cors");
const errorhandler = require("./Middleware/errorhandler");
const connectdb = require("./config/dbconnection");
connectdb();
const app=express();
const dotenv=require("dotenv").config();
const port=process.env.PORT||5000;



app.use(cors({
    origin: "http://localhost:5173", // React frontend URL
    credentials: true
}));
app.use(express.json());
app.use(errorhandler);
app.use('/api/contacts',require("./routes/contactroutes"));
app.use('/api/users',require("./routes/userroutes"));
app.use('/api/marks',require("./routes/marksroutes"));
app.use('/api/questions',require("./routes/questionsroutes"));
app.listen(port,()=>{
    console.log(`server is connected to port ${port}`);
})