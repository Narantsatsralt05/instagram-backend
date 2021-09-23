import express, {Response, Request} from 'express';
import  { postModel } from '../models';
const app = express();

app.post('/post', async (req: Request, res: Response) => {

    const post = new postModel(req.body);
  
    try {
      await post.save();
      res.send(post);
    } catch (error) {
      res.status(500).send(error);
    }
});
  
  app.get('/posts', async (req: Request, res: Response) => {
  
    const posts = await postModel.find({});
  
    try {
      res.send(posts);
    } catch (error) {
      res.status(500).send(error);
    }
});

export default app;