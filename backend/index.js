import express from "express";
import mongo from "mongoose";
import cors from "cors";

// Import jalur untuk user
import route from "./routes/routes.js";

const app = express();
mongo.connect('mongodb+srv://fahmiblacklist:mongodbpass@blacklist.oi0s23a.mongodb.net/?',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongo.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));

app.use(cors());
app.use(express.json());
app.use(route);

app.listen(5012, ()=> console.log('Tes Server On....'));