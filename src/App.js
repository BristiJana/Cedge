

import React from 'react';
import { BrowserRouter as Router, Route,Routes, Switch, Link } from 'react-router-dom';
import Home from './component/Home'
import TenantHierarchyDefineComponent from './component/TenantHirercy'
import TenantOnboardComponent from './component/TenantOnboard';
import TenantOnboardDetailsComponent from './component/TenantOnboardDetail';
import Tenant1 from './component/Tenant1';
import Tenant2 from './component/Tenant2';

function App() {
  return (
    
    <Router>
      <div className="App">
        

        <Routes>
          <Route path="/"  element={<Home />}/>
          <Route path="/tenant-hierarchy-define"  element={<TenantHierarchyDefineComponent/>}/>
          <Route path="/tenant-onboard" element={<TenantOnboardComponent/>}/>
          <Route path="/tenant-onboarddetail" element={<TenantOnboardDetailsComponent/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
