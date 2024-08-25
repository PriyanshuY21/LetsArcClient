import React, { useState, useEffect } from 'react';
import { FaInfoCircle, FaSearch, FaTrash } from 'react-icons/fa';
import ProgressBar from './Progressbar';
import Detailed from './Detailed';

const Dashboard = () => {
  // Stores list of projects fetched from backend
  const [projects, setProjects] = useState([]);

  // State to stores current search term entered by user
  const [searchTerm, setSearchTerm] = useState('');

  // State to stores currently selected project for detailed view
  const [selectedProject, setSelectedProject] = useState(null);

  // State to stores current filter (All, Ongoing, Completed)
  const [filter, setFilter] = useState('All');

  // useEffect hook to fetch projects data when component mounts
  useEffect(() => {
    fetch('http://localhost:5002/projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data); // Sets fetched projects data
        setSelectedProject(data[0]); // Sets first project as selected project by default
      });
  }, []);

  // Function to handle deletion of a project
  const handleDelete = (projectName) => {
    fetch(`http://localhost:5002/projects/${projectName}`, { method: 'DELETE' })
      .then(() => {
        // Update projects state by filtering out deleted project
        setProjects(projects.filter((project) => project.name !== projectName));
      });
  };

  // Function to filter projects based on current filter and search term
  const filteredProjects = projects.filter(project => {
    if (filter === 'All') return true; 
    if (filter === 'Ongoing') return project.progress.completed < project.progress.total; 
    if (filter === 'Completed') return project.progress.completed === project.progress.total; 
  }).filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filters based on the search term
  );

  // Get list of projects that are almost completed (9 to 11 out of 12)
  const almostCompletedProjects = projects
    .filter(project => project.progress.completed >= 9 && project.progress.completed <= 11)
    .sort((a, b) => b.progress.completed - a.progress.completed); // Sort by completion status

  // Function to get row's class name based on its state (selected, even/odd row)
  const getRowClassName = (project, index) => {
    if (project === selectedProject) {
      return 'bg-nn2'; // Highlights selected project
    } else {
      if (index % 2 === 0) {
        return 'bg-secondary'; // Even row style
      } else {
        return 'bg-nn'; // Odd row style
      }
    }
  };

  return (
    <div className="flex flex-col p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">My Projects</h2>
          <div className="relative group ml-2 pt-1">
            <FaInfoCircle className="w-6 h-6 text-gray-500 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute left-full mt-2 ml-2 w-64 text-center p-2 bg-gray-500 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Find your all ongoing and completed project's progress in this section.
            </div>
          </div>
          <div className="relative ml-4">
            <FaSearch className="absolute top-3 text-gray-400" style={{ marginLeft: '20rem' }} />
            <input
              type="text"
              placeholder="Search within projects"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md px-12 py-2 focus"
              style={{ marginLeft: '19rem' }}
            />
          </div>
        </div>
      </div>

      {/* Filter buttons for All, Ongoing, Completed */}
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 rounded-md ml-2 ${filter === 'All' ? 'bg-text text-secondary' : 'bg-gray-200'}`}
          onClick={() => setFilter('All')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-md ml-2 ${filter === 'Ongoing' ? 'bg-text text-secondary' : 'bg-gray-200'}`}
          onClick={() => setFilter('Ongoing')}
        >
          Ongoing
        </button>
        <button
          className={`px-4 py-2 rounded-md ml-2 ${filter === 'Completed' ? 'bg-text text-secondary' : 'bg-gray-200'}`}
          onClick={() => setFilter('Completed')}
        >
          Completed
        </button>
      </div>

      {/* Main content area with project list and almost completed projects */}
      <div className="flex" style={{ height: '50%' }}>
        <div className="flex flex-col w-2/3 pr-2">
          <div className="overflow-auto flex-1 border border-gray-200 rounded-lg shadow-lg p-2 custom-scrollbar">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-nn">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-accent">Projects</th>
                  <th className="px-8 py-3 text-center text-xs font-medium text-accent" style={{ width: '200%' }}>Progress</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-accent">Start Date</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-accent">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-secondary divide-y divide-gray-200">
                {filteredProjects.map((project, index) => (
                  <tr
                    key={project.name}
                    className={getRowClassName(project, index)}
                    onClick={() => setSelectedProject(project)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-text">
                      {project.name}
                    </td>
                    <td className="px-8 py-3 text-center whitespace-nowrap text-sm text-accent" style={{ width: '200%' }}>
                      <ProgressBar
                        completed={project.progress.completed}
                        total={project.progress.total}
                      />
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-accent text-center">{project.startDate}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-center text-red-600">
                      {project.progress.completed === project.progress.total && (
                        <FaTrash
                          className="cursor-pointer"
                          onClick={(e) => { e.stopPropagation(); handleDelete(project.name); }}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Almost Completed Projects Section */}
        <div className="flex flex-col w-1/3 pl-2" style={{ marginTop: '-3rem', height: '116%' }}>
          <div className="overflow-auto flex-1 border border-gray-200 rounded-lg shadow-lg p-4 custom-scrollbar">
            <h2 className="text-2xl opacity-90 font-bold mb-4 ml-16">Almost Completed</h2>
            <div className="space-y-1.5">
              {almostCompletedProjects.map((project, index) => (
                <div key={project.name} className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center pl-4">
                      <h4 className="text-base font-medium">{project.name}</h4>
                    </div>
                    <p className="text-base font-medium text-gr pr-4">{project.progress.completed} / {project.progress.total} Completed</p>
                  </div>
                  {index < almostCompletedProjects.length - 1 && <hr className="my-2 border-gray-300" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed View Component for the Selected Project */}
      {selectedProject && <Detailed project={selectedProject} />}
    </div>
  );
};

export default Dashboard;
