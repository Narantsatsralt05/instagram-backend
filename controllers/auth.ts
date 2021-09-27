import express, {Request, Response} from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { ConfirmationTokenModel, User } from '../models';
import jwt from 'jwt-simple';
import * as dotenv from 'dotenv';
import { typeOfUser } from '../interfaces';

const app = express();
dotenv.config();

const jwtSecret = process.env.JWT_SECRET || "";

app.post('/register', async (req: Request, res: Response, next) => {
  const { username, fullName, password, email} = req.body;
  let user = null;
  let confirmationToken = null;

  try {
    user = new User({ username, fullName, password, email });
    confirmationToken = new ConfirmationTokenModel({
      user: user._id,
      token: crypto.randomBytes(20).toString('hex'),
    });

    await user.save();
    await confirmationToken.save();

    res.status(201).send({user,token: jwt.encode({id: user._id }, jwtSecret)})
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
});

app.post('/login', async (req: Request, res: Response, next) => {
  // console.log(req.headers);
  console.log('orj irleee')
  // const { authorization } = req.header;
  const { username, email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ error: 'Please provide both a username/email and a password.' });
  }

  try {
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    console.log(user);
    
    if (!user || !user.password) {
      return res.status(401).send({
        error: 'The credentials you provided are incorrect, please try again.',
      });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.status(401).send({
          error:
            'The credentials you provided are incorrect, please try again.',
        });
      }
      console.log('sent')
      res.send({
        user: {
          _id: user._id,
          email: user.email,
          username: user.username,
        },
        token: jwt.encode({ id: user._id }, jwtSecret),
      });
    });
  }
    

   
  catch (err) {
    next(err);
  }
});

export default app;