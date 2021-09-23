import express, {Request, Response} from 'express';
import crypto from 'crypto';
import { ConfirmationTokenModel, userModel } from '../models';
import { typeOfUser } from '../types';
const app = express()


app.post('/register', async (req: Request, res: Response) => {
  const { username, fullName, password, email} = req.body;
  let user = null;
  let confirmationToken = null;

  try {
    user = new userModel({ username, fullName, password, email });
    confirmationToken = new ConfirmationTokenModel({
      user: user._id,
      token: crypto.randomBytes(20).toString('hex'),
    });
    console.log('token ======> ', crypto.randomBytes(20).toString('hex'),)
    await user.save();
    await confirmationToken.save();
    res.status(201).send(user)
    // res.status(201).send({
    //   user: {
    //     email: user.email,
    //     username: user.username
    //   }
    // });
    res.status(201).send(user)
    console.log(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default app;