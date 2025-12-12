import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Importing Components
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import Features from './components/Features';
import About from './components/About';

function App() {
  // --- THEME LOGIC (Kept as is) ---
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // --- BACKEND INTEGRATION START ---

  // 1. STATE: Start with empty array, not hardcoded data
  const [projects, setProjects] = useState([]);
  
  // Form State for "Create" requirement
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // API URL (Change to your Render URL when deploying)
  const API_URL = "http://localhost:5000/api/projects";

  // 2. READ: Fetch data from Backend on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (response.ok) {
        setProjects(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // 3. CREATE: Add a new project to Backend
  const addProject = async (e) => {
    e.preventDefault();
    if (!newTitle) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: newTitle, 
          description: newDesc, 
          status: "Want to Watch" // Default status
        })
      });
      const data = await response.json();
      
      if (response.ok) {
        setProjects([...projects, data]); // Update UI instantly
        setNewTitle('');
        setNewDesc('');
      }
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  // 4. UPDATE: Toggle Status in Backend
  // Note: MongoDB uses '_id', not 'id'
  const toggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Watching' ? 'Watched' 
                     : currentStatus === 'Watched' ? 'Want to Watch' 
                     : 'Watching';

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      
      const updatedProject = await response.json();

      if (response.ok) {
        setProjects(projects.map(p => p._id === id ? updatedProject : p));
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // 5. DELETE: Remove from Backend
  const deleteProject = async (id) => {
    if(!window.confirm("Are you sure you want to delete this?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setProjects(projects.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header title="ShowTracker" theme={theme} toggleTheme={toggleTheme} />

        <main>
          <div className="container">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  
                  {/* CREATE FORM (Required for Assignment) */}
                  <div className="form-container" style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                    <h3>Add New Show</h3>
                    <form onSubmit={addProject} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <input 
                        type="text" 
                        placeholder="Show Title" 
                        value={newTitle} 
                        onChange={(e) => setNewTitle(e.target.value)}
                        style={{ padding: '8px', flex: '1' }}
                      />
                      <input 
                        type="text" 
                        placeholder="Description" 
                        value={newDesc} 
                        onChange={(e) => setNewDesc(e.target.value)}
                        style={{ padding: '8px', flex: '2' }}
                      />
                      <button type="submit" style={{ padding: '8px 16px', background: '#e50914', color: 'white', border: 'none', cursor: 'pointer' }}>
                        Add
                      </button>
                    </form>
                  </div>

                  {/* LIST VIEW */}
                  {/* We pass 'projects' and the handlers down to the list */}
                  <ProjectList 
                    projects={projects} 
                    onStatusChange={toggleStatus} 
                    onDelete={deleteProject} 
                  />
                </>
              } />
              
              <Route path="/project/:id" element={<ProjectDetail projects={projects} />} />
              <Route path="/features" element={<Features />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;