import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connection from '../db/connection.js';
import authRouter from './routes/authRoutes.js';
import blogRouter from './routes/blogRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002;
app.use(express.json());
app.use(cors());

app.use("/auth",authRouter)
app.use("/api/blogs",blogRouter)
app.get("/",(req,res)=>{
    res.send("Hello World! I am working fine!")
})

await connection();
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
})
