import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

if (!uri) throw new Error('MONGODB_URI is required. Add it to your local .env file.');

const client = new MongoClient(uri);
const blogs = client.db('PortfolioDB').collection('Blogs');

app.use(cors());
app.use(express.json());

app.get('/api/health', async (_request, response) => {
  await client.db('PortfolioDB').command({ ping: 1 });
  response.json({ ok: true });
});

app.get('/api/blogs', async (_request, response, next) => {
  try {
    const posts = await blogs.find({ published: { $ne: false } })
      .sort({ publishedAt: -1, createdAt: -1 })
      .toArray();
    response.json(posts.map((post) => ({ ...post, _id: post._id.toString() })));
  } catch (error) { next(error); }
});

app.get('/api/blogs/:id', async (request, response, next) => {
  try {
    if (!ObjectId.isValid(request.params.id)) return response.status(400).json({ message: 'Invalid blog id.' });
    const post = await blogs.findOne({ _id: new ObjectId(request.params.id), published: { $ne: false } });
    if (!post) return response.status(404).json({ message: 'Blog post not found.' });
    response.json({ ...post, _id: post._id.toString() });
  } catch (error) { next(error); }
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ message: 'Unable to load blog posts.' });
});

client.connect().then(() => app.listen(port, () => console.log(`Blog API listening on http://localhost:${port}`))).catch((error) => {
  console.error('MongoDB connection failed:', error.message);
  process.exit(1);
});
