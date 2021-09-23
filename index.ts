import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authController from "./controllers/auth";
import postController from './controllers/post';
import * as dotenv from 'dotenv';
import { userModel } from './models';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI || "";

app.use(cors());
app.use(express.json());
app.use(authController);
app.use(postController);

const connectDb = async () => {
  try {
    const res = await mongoose.connect(uri);
    console.log(res.connection.host, 'connected');
  } catch (err) {
    console.log("Er: ", err)
  }
}

connectDb();

app.get('/users', async (req: Request, res: Response) => {

  const users = await userModel.find({});
  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
