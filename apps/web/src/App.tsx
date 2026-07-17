import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { EnterpriseLayout } from './layouts/EnterpriseLayout';
import { GovernmentLayout } from './layouts/GovernmentLayout';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Features } from './pages/Features';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';

import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';

import { Dashboard } from './pages/Dashboard';
import { Objects } from './pages/Objects';
import { Scanner } from './pages/Scanner';
import { Passport } from './pages/Passport';
import { Marketplace } from './pages/Marketplace';
import { EarthGPT } from './pages/EarthGPT';
import { EarthTwin } from './pages/EarthTwin';
import { Community } from './pages/Community';

import { EnterpriseHome } from './pages/EnterpriseHome';
import { GovernmentHome } from './pages/GovernmentHome';
import { AdminHome } from './pages/AdminHome';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Website */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="features" element={<Features />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Auth Flow */}
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Customer Dashboard */}
          <Route path="/" element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="objects" element={<Objects />} />
            <Route path="scanner" element={<Scanner />} />
            <Route path="passport" element={<Passport />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="earthgpt" element={<EarthGPT />} />
            <Route path="earth-twin" element={<EarthTwin />} />
            <Route path="community" element={<Community />} />
          </Route>

          {/* Enterprise Console */}
          <Route path="/" element={<EnterpriseLayout />}>
            <Route path="enterprise" element={<EnterpriseHome />} />
          </Route>

          {/* Government Portal */}
          <Route path="/" element={<GovernmentLayout />}>
            <Route path="government" element={<GovernmentHome />} />
          </Route>

          {/* Admin Panel */}
          <Route path="/" element={<AdminLayout />}>
            <Route path="admin" element={<AdminHome />} />
          </Route>

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
