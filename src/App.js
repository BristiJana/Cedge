

import React from 'react';
import { BrowserRouter as Router, Route,Routes, Switch, Link } from 'react-router-dom';
import Home from './component/Home'
import TenantHierarchyDefineComponent from './component/TenantHirercy'
import TenantOnboardComponent from './component/TenantOnboard';
import UserRegistration from './component/UserRegistration';
import ScheduleProcess from './component/ScheduleProcess';

import RoleTenantComponent from './component/RoleTenant';
import Pagerole from './component/Pagerole';
function App() {
  return (
    
    <Router>
      <div className="App">
        

        <Routes>
          <Route path="/"  element={<Home />}/>
          <Route path="/tenant-hierarchy-define"  element={<TenantHierarchyDefineComponent/>}/>
          <Route path="/tenant-onboard" element={<TenantOnboardComponent/>}/>
          
          
          <Route path='/roletenant' element={<RoleTenantComponent/>}/>
          <Route path='/user-registration' element={<UserRegistration/>}/>
          <Route path='/pages-role-link' element={<Pagerole/>}/>
          <Route path='/schedule-process' element={<ScheduleProcess/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
