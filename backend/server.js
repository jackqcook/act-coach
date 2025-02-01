const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();
const sequelize = require('./config/database');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

// Middleware
app.use(cors());
app.use(express.json());

// Sync database
sequelize.sync({ force: false })
  .then(() => console.log('Database synced'))
  .catch((err) => console.log('Error syncing database:', err));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// User routes
app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/questions', async (req, res) => {
  const result = await pool.query('SELECT * FROM questions');
  res.json(result.rows);
});

app.post('/responses', async (req, res) => {
  const { userId, questionId, answer } = req.body;
  // Compare answer with correct answer from the database
  // Store response and result
  res.json({ success: true });
});

app.post('/feedback', async (req, res) => {
  const { incorrectQuestions } = req.body;
  const prompt = `Provide feedback and generate similar questions for: ${incorrectQuestions}`;
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 150,
  });
  res.json(response.data.choices[0].text);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
}); 