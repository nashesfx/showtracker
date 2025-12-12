require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ProjectLog = require('./models/ProjectLog'); // Ensure this path matches your file structure

const app = express();
const PORT = process.env.PORT || 4000;

// 1. MIDDLEWARE
app.use(express.json());

// Requirement 1.3: CORS Setup
// We allow requests from both local React (5173 or 3000) and your future deployed frontend
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'https://your-frontend-app.vercel.app'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}));


// 2. ROUTES

// CREATE (POST)
app.post('/api/projects', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newProject = new ProjectLog({ title, description, status });
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ (GET)
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await ProjectLog.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE (PATCH) - Requirement 1.2
app.patch('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // { new: true } returns the updated document
    const updatedProject = await ProjectLog.findByIdAndUpdate(id, { ...req.body }, { new: true });
    
    if (!updatedProject) {
        return res.status(404).json({ error: "Project not found" });
    }
    
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE (DELETE) - Requirement 1.1
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await ProjectLog.findByIdAndDelete(id);
    
    if (!deletedProject) {
        return res.status(404).json({ error: "Project not found" });
    }
    
    // Status 204 means "No Content" (Successful deletion)
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// 3. DATABASE CONNECTION & SERVER START
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to DB & Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });