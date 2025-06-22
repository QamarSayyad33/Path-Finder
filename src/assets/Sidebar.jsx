import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { 
  BsCart3, 
  BsGrid1X2Fill, 
  BsFillArchiveFill, 
  BsFillGrid3X3GapFill, 
  BsPeopleFill, 
  BsListCheck, 
  BsMenuButtonWideFill, 
  BsFillGearFill ,
  BsBuildingCheck
} from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsBuildingCheck className="icon_header" /> EXPLORE
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>X</span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/"> {/* Use Link to navigate to the Home page */}
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/credits"> {/* Update link for Credits page */}
            <BsFillArchiveFill className="icon" /> Credits
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/subjects"> {/* Update link for Subjects page */}
            <BsFillGrid3X3GapFill className="icon" /> Subjects
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/contests"> {/* Update link for Contests page */}
            <BsPeopleFill className="icon" /> Contests
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/notifications"> {/* Update link for Notifications page */}
            <BsListCheck className="icon" /> Notifications
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/interview-questions"> {/* Update link for Interview Questions */}
            <BsMenuButtonWideFill className="icon" /> Interview Questions
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/settings"> {/* Update link for Settings page */}
            <BsFillGearFill className="icon" /> Setting
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
