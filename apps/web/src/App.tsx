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
import { ResetPassword } from './pages/ResetPassword';
import { VerifyEmail } from './pages/VerifyEmail';

import { Dashboard } from './pages/Dashboard';
import { Objects } from './pages/Objects';
import { Scanner } from './pages/Scanner';
import { Passport } from './pages/Passport';
import { Marketplace } from './pages/Marketplace';
import { EarthGPT } from './pages/EarthGPT';
import { EarthTwin } from './pages/EarthTwin';
import { Community } from './pages/Community';
import { Wallet } from './pages/Wallet';
import { Settings } from './pages/Settings';
import { Analytics } from './pages/Analytics';

import { EnterpriseHome } from './pages/EnterpriseHome';
import { GovernmentHome } from './pages/GovernmentHome';
import { AdminHome } from './pages/AdminHome';

// Route Protection
import { PrivateRoute, GuestRoute, RoleRoute } from './components/RouteProtection';

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

          {/* Guest Only Auth Flow */}
          <Route element={<GuestRoute />}>
            <Route path="/" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="verify-email" element={<VerifyEmail />} />
            </Route>
          </Route>

          {/* Secure Individual User Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<RoleRoute allowedRoles={['USER', 'ADMIN', 'SUPER_ADMIN']} />}>
              <Route path="/" element={<DashboardLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="objects" element={<Objects />} />
                <Route path="scanner" element={<Scanner />} />
                <Route path="passport" element={<Passport />} />
                <Route path="marketplace" element={<Marketplace />} />
                <Route path="earthgpt" element={<EarthGPT />} />
                <Route path="earth-twin" element={<EarthTwin />} />
                <Route path="community" element={<Community />} />
                <Route path="wallet" element={<Wallet />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
          </Route>

          {/* Secure Enterprise Console */}
          <Route element={<PrivateRoute />}>
            <Route element={<RoleRoute allowedRoles={['ENTERPRISE', 'ADMIN', 'SUPER_ADMIN']} />}>
              <Route path="/" element={<EnterpriseLayout />}>
                <Route path="enterprise" element={<EnterpriseHome />} />
              </Route>
            </Route>
          </Route>

          {/* Secure Government Portal */}
          <Route element={<PrivateRoute />}>
            <Route element={<RoleRoute allowedRoles={['GOVERNMENT', 'ADMIN', 'SUPER_ADMIN']} />}>
              <Route path="/" element={<GovernmentLayout />}>
                <Route path="government" element={<GovernmentHome />} />
              </Route>
            </Route>
          </Route>

          {/* Secure Admin Control Panel */}
          <Route element={<PrivateRoute />}>
            <Route element={<RoleRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']} />}>
              <Route path="/" element={<AdminLayout />}>
                <Route path="admin" element={<AdminHome />} />
              </Route>
            </Route>
          </Route>

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
