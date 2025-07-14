const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage (in production, you'd use a real database)
let companies = [];
let drafts = [];
let submissions = [];

// Helper function to generate ID
const generateId = () => Date.now();

// Routes

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'BVI Company Formation API is running!',
    timestamp: new Date().toISOString(),
    endpoints: {
      companies: '/companies',
      drafts: '/drafts',
      submissions: '/submissions'
    }
  });
});

// Companies endpoints
app.get('/companies', (req, res) => {
  res.json(companies);
});

app.post('/companies', (req, res) => {
  const company = {
    id: generateId(),
    status: 'submitted',
    submittedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...req.body
  };
  
  companies.push(company);
  res.status(201).json(company);
});

app.get('/companies/:id', (req, res) => {
  const company = companies.find(c => c.id === parseInt(req.params.id));
  if (!company) {
    return res.status(404).json({ error: 'Company not found' });
  }
  res.json(company);
});

// Drafts endpoints
app.get('/drafts', (req, res) => {
  res.json(drafts);
});

app.post('/drafts', (req, res) => {
  const draft = {
    id: generateId(),
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...req.body
  };
  
  drafts.push(draft);
  res.status(201).json(draft);
});

app.get('/drafts/:id', (req, res) => {
  const draft = drafts.find(d => d.id === parseInt(req.params.id));
  if (!draft) {
    return res.status(404).json({ error: 'Draft not found' });
  }
  res.json(draft);
});

app.put('/drafts/:id', (req, res) => {
  const draftIndex = drafts.findIndex(d => d.id === parseInt(req.params.id));
  if (draftIndex === -1) {
    return res.status(404).json({ error: 'Draft not found' });
  }
  
  drafts[draftIndex] = {
    ...drafts[draftIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  res.json(drafts[draftIndex]);
});

app.delete('/drafts/:id', (req, res) => {
  const draftIndex = drafts.findIndex(d => d.id === parseInt(req.params.id));
  if (draftIndex === -1) {
    return res.status(404).json({ error: 'Draft not found' });
  }
  
  drafts.splice(draftIndex, 1);
  res.status(204).send();
});

// Submissions endpoint (legacy)
app.get('/submissions', (req, res) => {
  res.json(submissions);
});

app.post('/submissions', (req, res) => {
  const submission = {
    id: generateId(),
    submittedAt: new Date().toISOString(),
    ...req.body
  };
  
  submissions.push(submission);
  res.status(201).json(submission);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`BVI Company Formation API server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/`);
});

module.exports = app;
