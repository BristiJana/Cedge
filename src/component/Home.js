// Home.js
import React from 'react';
import { BrowserRouter as Router, Route,Routes, Switch, Link } from 'react-router-dom';
function Home() {
  return (
    <div>
        <h1>Home Page</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tenant-hierarchy-define">TenantHirercy</Link>
            </li>
            <li>
              <Link to="/tenant-onboard">TenantOnboard</Link>
            </li>
          </ul>
        </nav>
    </div>
  );
}

export default Home;
