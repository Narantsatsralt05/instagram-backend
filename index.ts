import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authController from "./controllers/auth_controller";
import postController from './controllers/post_controller';
import * as dotenv from 'dotenv';

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

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
