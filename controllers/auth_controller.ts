import express, {Request, Response} from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import * as dotenv from 'dotenv';
import { ConfirmationTokenModel, User } from '../models';


const app = express();
dotenv.config();

const jwtSecret = process.env.JWT_SECRET || "";
const saltRounds = Number(process.env.SALT_ROUNDS);

app.post('/register', async (req: Request, res: Response, next) => {
  const { username, fullName, password, email} = req.body;
  let user = null;
  let confirmationToken = null;

  try {
    bcrypt.genSalt(saltRounds, (saltError, salt) => {

      if (saltError) {
        throw saltError;
      } else {
        bcrypt.hash(password, salt, async (hashError, hash) => {
    
          if (hashError) {
            throw hashError;
          } else {
            user = new User({ username, fullName, "password":hash, email });

            confirmationToken = new ConfirmationTokenModel({
              user: user._id,
              token: crypto.randomBytes(20).toString('hex'),
            });
        
            await user.save();
            await confirmationToken.save();
        
            res.status(201).send({user,token: jwt.encode({id: user._id }, jwtSecret)})
          }
        })
      }
    });
    
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
});

app.post('/login', async (req: Request, res: Response, next) => {
  
  const { username, email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ error: 'Please provide both a username/email and a password.' });
  }

  try {
    let user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    console.log(user);
    
    if (!user || !user.password) {
      return res.status(401).send({
        error: 'The credentials you provided are incorrect, please try again.',
      });
    }
    
    const check = await bcrypt.compare(password, user.password);
    console.log(user)
    if(check) res.json(user)
  } catch (err) {
    next(err);
  }
});

export default app;