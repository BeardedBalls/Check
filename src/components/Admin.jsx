import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SidePanel from './SidePanel';
import Dashboard from './Dashboard';
import Client from './Client';
import Billing from './Billing';
import Profile from './Profile';

function Admin(){
    return(
            <div style={{ display: 'flex' }}>
            <SidePanel />
            <div style={{ flex: 1, padding: '20px' }}>
                <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/client" element={<Client />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/" element={<Dashboard />} /> {/* Default route */}
                </Routes>
            </div>
            </div>
)
}
export default Admin;