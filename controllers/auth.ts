import express, {Request, Response} from 'express';
import { userModel } from '../models';
const app = express()


app.post('/register', async (req: Request, res: Response) => {

    const user = new userModel(req.body);
    
    try {
      await user.save();
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
});

export default app;