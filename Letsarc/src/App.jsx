import React, { useState } from 'react'; 
import Navbar from './assets/components/Nav.jsx'; 
import Sidebar from './assets/components/Sidebar.jsx'; 
import Dashboard from './assets/components/Dashboard.jsx'; 
import Concern from './assets/components/Concern.jsx'; 
import User from './assets/components/User.jsx';
import './index.css'; 

const App = () => {
  const [selectedItem, setSelectedItem] = useState('Dashboard'); // State to track currently selected sidebar item

  // Function to handle item selection from Sidebar
  const handleSelect = (item) => {
    setSelectedItem(item); // Updates selected item state
  };

  // Defines sidebar items to be displayed
  const sidebarItems = ['Dashboard', 'Raise a Concern', 'User Profile'];

  // Function to render content based on selected sidebar item
  const renderContent = () => {
    switch (selectedItem) {
      case 'Dashboard':
        return <Dashboard/>; // Renders Dashboard component if 'Dashboard' is selected
      case 'Raise a Concern':
        return <Concern/>; // Renders Concern component if 'Raise a Concern' is selected
      case 'User Profile':
        return <User/>; // Renders User component if 'User Profile' is selected
      default:
        return null; // Return null if no valid item is selected
    }
  };

  return (
    <div className="flex flex-col h-screen"> 
      <Navbar /> {/* Renders Navbar component at top */}
      <div className="flex flex-grow overflow-hidden"> 
        <Sidebar items={sidebarItems} onSelect={handleSelect} /> {/* Renders Sidebar with items and selection handler */}
        <div className="flex-grow p-4 overflow-auto"> 
          {renderContent()} {/* Renders content based on the selected item */}
        </div>
      </div>
    </div>
  );
};

export default App;
