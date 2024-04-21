import express from 'express';
import mongoose from 'mongoose';
import router from './router/APIrouter.mjs';

let app = express();

app.use(express.json());

mongoose.connect(
  "mongodb+srv://arihantsinghrana2004:Ariarn1977@cluster0.x8akbbk.mongodb.net/Blogs_And_Authors"
).then(()=>console.log("Connected to the mongo server")).catch((e)=>console.log(e.message));

app.use('/', router);

app.listen(8000,()=> console.log("Server Started at :",8000));