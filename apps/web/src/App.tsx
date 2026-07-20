import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { UserLayout } from './layouts/UserLayout';
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
import { InvalidRole } from './pages/InvalidRole';

import { Dashboard } from './pages/Dashboard';
import { Objects } from './pages/Objects';
import { AddObject } from './pages/AddObject';
import { EditObject } from './pages/EditObject';
import { ObjectDetails } from './pages/ObjectDetails';
import { Scanner } from './pages/Scanner';
import { Passport } from './pages/Passport';
import { DigitalPassport } from './pages/DigitalPassport';
import { Marketplace } from './pages/Marketplace';
import { EarthGPT } from './pages/EarthGPT';
import { EarthTwin } from './pages/EarthTwin';
import { Community } from './pages/Community';
import { Wallet } from './pages/Wallet';
import { Settings } from './pages/Settings';
import { Analytics } from './pages/Analytics';
import { PublicPassport } from './pages/PublicPassport';

// Route Protection
import { PrivateRoute, GuestRoute, RoleRoute, AppRedirect } from './components/RouteProtection';
import { UserRoutes } from './portals/user/routes';
import { AdminRoutes } from './portals/admin/routes';
import { NgoRoutes } from './portals/ngo/routes';
import { RepairRoutes } from './portals/repair/routes';
import { RecyclerRoutes } from './portals/recycler/routes';
import { SellerRoutes } from './portals/seller/routes';
import { EnterpriseRoutes } from './portals/enterprise/routes';
import { GovernmentRoutes } from './portals/government/routes';
import { SuperAdminRoutes } from './portals/superadmin/routes';

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
            <Route path="passport/:passportId" element={<PublicPassport />} />
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

          <Route path="/invalid-role" element={<InvalidRole />} />

          <Route path="/portal">
            <Route index element={<AppRedirect />} />
            
            {/* Secure Individual User Routes */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['USER', 'ADMIN', 'SUPER_ADMIN']} />}>
                {UserRoutes}
              </Route>
            </Route>

            {/* Secure Admin Control Panel */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']} />}>
                {AdminRoutes}
              </Route>
            </Route>

            {/* Secure NGO Portal */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['NGO', 'ADMIN', 'SUPER_ADMIN']} />}>
                {NgoRoutes}
              </Route>
            </Route>

            {/* Secure Repair Partner Portal */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['REPAIR_PARTNER', 'ADMIN', 'SUPER_ADMIN']} />}>
                {RepairRoutes}
              </Route>
            </Route>

            {/* Secure Recycler Portal */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['RECYCLER', 'ADMIN', 'SUPER_ADMIN']} />}>
                {RecyclerRoutes}
              </Route>
            </Route>

            {/* Secure Seller Portal */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['SELLER', 'ADMIN', 'SUPER_ADMIN']} />}>
                {SellerRoutes}
              </Route>
            </Route>

            {/* Secure Enterprise Portal */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['ENTERPRISE', 'ADMIN', 'SUPER_ADMIN']} />}>
                {EnterpriseRoutes}
              </Route>
            </Route>

            {/* Secure Government Portal */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['GOVERNMENT', 'ADMIN', 'SUPER_ADMIN']} />}>
                {GovernmentRoutes}
              </Route>
            </Route>

            {/* Secure Super Admin Portal */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['SUPER_ADMIN']} />}>
                {SuperAdminRoutes}
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
