import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = ({ projects, onStatusChange, onDelete }) => {
  if (!projects || projects.length === 0) {
    return <p style={{ textAlign: 'center' }}>No shows found. Add one above!</p>;
  }

  return (
    <div className="project-list-grid">
      {projects.map((project) => (
        <div key={project._id} className="project-card" style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', borderRadius: '8px' }}>
          
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <span className={`status-badge ${project.status.toLowerCase().replace(/\s/g, '-')}`}>
              {project.status}
            </span>
            
            <div>
              <button 
                onClick={() => onStatusChange(project._id, project.status)}
                style={{ marginRight: '10px', cursor: 'pointer' }}
              >
                Update Status
              </button>

              <button 
                onClick={() => onDelete(project._id)}
                style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              >
                Delete
              </button>

               <Link to={`/project/${project._id}`} style={{ marginLeft: '10px' }}>Details</Link>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default ProjectList;