import express from 'express';
import cors  from 'cors';
import mongoose from 'mongoose';
import userModel from'./models/users';

import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI || "";

app.use(cors());
app.use(express.json());

const connectDb = async () => {
  try {
    const res = await mongoose.connect(uri);
  console.log(res.connection.host, 'connected');
  } catch(err) {
    console.log("Er: ",err)
  }
}

connectDb();

app.get('/users', async (request, response) => {
  const users = await userModel.find({});
  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.post('/user', async (request, response) => {
  console.log(request.body)
  const user = new userModel(request.body);
  
  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get('/', (req: any, res: any) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
