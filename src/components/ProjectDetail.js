import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProjectDetail = ({ projects }) => {
  // Grab the 'id' from the URL (defined in App.js as /project/:id)
  const { id } = useParams();
  
  // Find the specific project in our state array
  // Note: URL params are strings, so we parse it to an integer
  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return <div className="container"><h2>Show not found</h2><Link to="/">Back to Home</Link></div>;
  }

  return (
    <div className="content-box">
      <Link to="/" style={{ fontSize: '0.9em', textDecoration: 'underline' }}>&larr; Back to List</Link>
      
      <h1 style={{ marginTop: '20px', fontSize: '2.5rem' }}>{project.title}</h1>
      
      <div style={{ margin: '20px 0', padding: '20px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
        <p><strong>Current Status:</strong> {project.status}</p>
        <p><strong>My Rating:</strong> {project.rating} / 5 Stars</p>
      </div>

      <h3>Synopsis</h3>
      <p>{project.description}</p>
    </div>
  );
}

export default ProjectDetail;