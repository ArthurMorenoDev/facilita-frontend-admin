import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AreaTableAction = ({ id }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/tabulacao/${id}`);
      alert('Item deleted successfully');
      // Optionally, refresh the list or navigate away
      // navigate('/somewhere'); // e.g., navigate to a list page or refresh
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`); // Redirect to edit page with item ID
  };

  const handleView = () => {
    navigate(`/view/${id}`); // Redirect to view page with item ID
  };

  return (
    <>
      <button
        type="button"
        className="action-dropdown-btn"
        onClick={handleDropdown}
      >
        <HiDotsHorizontal size={18} />
        {showDropdown && (
          <div className="action-dropdown-menu" ref={dropdownRef}>
            <ul className="dropdown-menu-list">
              <li className="dropdown-menu-item">
                <button onClick={handleView} className="dropdown-menu-link">
                  View
                </button>
              </li>
              <li className="dropdown-menu-item">
                <button onClick={handleEdit} className="dropdown-menu-link">
                  Edit
                </button>
              </li>
              <li className="dropdown-menu-item">
                <button onClick={handleDelete} className="dropdown-menu-link">
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}
      </button>
    </>
  );
};

export default AreaTableAction;
