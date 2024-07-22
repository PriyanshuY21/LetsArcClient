import React, { useState } from 'react';
import { FaTachometerAlt, FaExclamationCircle, FaUser } from 'react-icons/fa';

const Sidebar = ({ items, onSelect }) => {
  const [selected, setSelected] = useState(items[0]);

  const handleClick = (item) => {
    setSelected(item);
    onSelect(item);
  };

  const renderIcon = (item) => {
    const iconProps = {
      className: `mr-2 ${selected === item ? 'text-green-500' : ''}`
    };

    switch (item) {
      case 'Dashboard':
        return <FaTachometerAlt {...iconProps} />;
      case 'Raise a Concern':
        return <FaExclamationCircle {...iconProps} />;
      case 'User Profile':
        return <FaUser {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="sidebar bg-text h-screen w-64 text-secondary flex flex-col pt-4">
      {items.map((item) => (
        <div
          key={item}
          onClick={() => handleClick(item)}
          className={`p-4 cursor-pointer flex items-center ${selected === item ? 'bg-secondary text-text w-50 h-10 rounded-lg' : ''}`}
        >
          {renderIcon(item)}
          {item}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
