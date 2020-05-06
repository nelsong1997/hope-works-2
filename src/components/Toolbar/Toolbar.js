import React from 'react';
import './Toolbar.css';

const toolbar = props => (
  <header className="toolbar">
     <nav className="toolbar_navigation">
        <div className="toolbar_logo">HOPE WORKS</div>
        <div className="toolbar_navigation-items">
          <ul className="toolbar_list-items">
            <li><a href="#all-fields">Personal Info</a></li>
            <li><a href="#demographic-link">Demographic</a></li> 
            <li><a href="#incident-info-link">Incident Info</a></li> 
            <li><a href="#communication-link">Communication Details</a></li> 
            <li><a href="#services-link">Services Provided</a></li> 
            <li><a href="#groups">Referrals</a></li> 
            <li><a href="#measures">Outcome Measures</a></li> 
          </ul>
        </div>
     </nav>
  </header>
);

export default toolbar; 