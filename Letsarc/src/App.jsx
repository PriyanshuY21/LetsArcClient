import React, { useState } from 'react';
import Navbar from './assets/components/Nav.jsx';
import Sidebar from './assets/components/Sidebar.jsx';
import Dashboard from './assets/components/Dashboard.jsx';
import Concern from './assets/components/Concern.jsx';
import User from './assets/components/User.jsx';
import './index.css';  

const App = () => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  const sidebarItems = ['Dashboard', 'Raise a Concern', 'User Profile'];

  const renderContent = () => {
    switch (selectedItem) {
      case 'Dashboard':
        return <Dashboard/>;
      case 'Raise a Concern':
        return <Concern/>;
      case 'User Profile':
        return <User/>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar items={sidebarItems} onSelect={handleSelect} />
        <div className="flex-grow p-4 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App;
