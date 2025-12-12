import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import Features from './components/Features';
import About from './components/About';

function App() {
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

  const [projects, setProjects] = useState([]);

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const API_URL = "https://showtracker-api.onrender.com";

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
          status: "Want to Watch"
        })
      });
      const data = await response.json();
      
      if (response.ok) {
        setProjects([...projects, data]);
        setNewTitle('');
        setNewDesc('');
      }
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

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