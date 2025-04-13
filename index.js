import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import resultsRoutes from './routes/results.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/results', resultsRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});