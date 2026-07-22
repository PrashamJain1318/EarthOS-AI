import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { UserLayout } from './layouts/UserLayout';
// Pages
const Home = React.lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = React.lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Features = React.lazy(() => import('./pages/Features').then(m => ({ default: m.Features })));
const Pricing = React.lazy(() => import('./pages/Pricing').then(m => ({ default: m.Pricing })));
const Contact = React.lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));

const Login = React.lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const Signup = React.lazy(() => import('./pages/Signup').then(m => ({ default: m.Signup })));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword').then(m => ({ default: m.ForgotPassword })));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword').then(m => ({ default: m.ResetPassword })));
const VerifyEmail = React.lazy(() => import('./pages/VerifyEmail').then(m => ({ default: m.VerifyEmail })));
const InvalidRole = React.lazy(() => import('./pages/InvalidRole').then(m => ({ default: m.InvalidRole })));

const Dashboard = React.lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Objects = React.lazy(() => import('./pages/Objects').then(m => ({ default: m.Objects })));
const AddObject = React.lazy(() => import('./pages/AddObject').then(m => ({ default: m.AddObject })));
const EditObject = React.lazy(() => import('./pages/EditObject').then(m => ({ default: m.EditObject })));
const ObjectDetails = React.lazy(() => import('./pages/ObjectDetails').then(m => ({ default: m.ObjectDetails })));
const Scanner = React.lazy(() => import('./pages/Scanner').then(m => ({ default: m.Scanner })));
const Passport = React.lazy(() => import('./pages/Passport').then(m => ({ default: m.Passport })));
const DigitalPassport = React.lazy(() => import('./pages/DigitalPassport').then(m => ({ default: m.DigitalPassport })));
const Marketplace = React.lazy(() => import('./pages/Marketplace').then(m => ({ default: m.Marketplace })));
const EarthGPT = React.lazy(() => import('./pages/EarthGPT').then(m => ({ default: m.EarthGPT })));
const EarthTwin = React.lazy(() => import('./pages/EarthTwin').then(m => ({ default: m.EarthTwin })));
const Community = React.lazy(() => import('./pages/Community').then(m => ({ default: m.Community })));
const Wallet = React.lazy(() => import('./pages/Wallet').then(m => ({ default: m.Wallet })));
const Settings = React.lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })));
const Analytics = React.lazy(() => import('./pages/Analytics').then(m => ({ default: m.Analytics })));
const PublicPassport = React.lazy(() => import('./pages/PublicPassport').then(m => ({ default: m.PublicPassport })));
const AdminLogin = React.lazy(() => import('./pages/AdminLogin').then(m => ({ default: m.AdminLogin })));

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

import { ErrorBoundary } from './components/ErrorBoundary';
import { EosSpinner, EosToast } from '@earthos/ui';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const SuspenseFallback = () => (
  <div className="flex h-screen w-full items-center justify-center bg-[#0B1220]">
    <EosSpinner size="lg" />
  </div>
);

function App() {
  const [showAuthToast, setShowAuthToast] = React.useState(false);

  React.useEffect(() => {
    const handleAuthExpired = () => setShowAuthToast(true);
    window.addEventListener('auth-expired', handleAuthExpired);
    return () => window.removeEventListener('auth-expired', handleAuthExpired);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundary>
        <React.Suspense fallback={<SuspenseFallback />}>
        {showAuthToast && (
          <div className="fixed top-4 right-4 z-50">
            <EosToast 
              id="auth-expired-toast" 
              message="Your session has expired. Please log in again." 
              type="warning" 
              onClose={() => setShowAuthToast(false)} 
            />
          </div>
        )}
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
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<AuthLayout />}>
              <Route path="signup" element={<Signup />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="verify-email" element={<VerifyEmail />} />
            </Route>
          </Route>

          <Route path="/invalid-role" element={<InvalidRole />} />
          <Route path="/admin/login" element={<AdminLogin />} />

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
        </React.Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
