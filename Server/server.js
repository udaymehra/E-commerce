const express = require("express");
const mongoose = require("mongoose"); 
const cookieParser=require('cookie-parser');
const cors=require('cors');
const authRouter=require('./routes/auth/auth-routes')
const adminProductsRouter=require('./routes/admin/products-routes')
// it will return a promise and when promise is resolved then your server connection with database is successful
mongoose
  .connect("mongodb+srv://mehrauday66:mehra4461@cluster0.j1suw.mongodb.net/")
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin : 'http://localhost:5173',
        methods : ['GET','POST','DELETE','PUT'],
        allowedHeaders : [
            "Content-Type",
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials : true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter)
app.use('/api/admin/products',adminProductsRouter)

app.listen(PORT,()=>console.log(`Server is now running on port ${PORT}`));

