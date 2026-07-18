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
import { NgoLayout } from './layouts/NgoLayout';
import { RepairLayout } from './layouts/RepairLayout';
import { RecyclerLayout } from './layouts/RecyclerLayout';
import { SellerLayout } from './layouts/SellerLayout';
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

import { EnterpriseHome } from './pages/EnterpriseHome';
import { GovernmentHome } from './pages/GovernmentHome';
import { AdminHome } from './pages/AdminHome';
import { NgoDashboard } from './pages/NgoDashboard';
import { RepairDashboard } from './pages/RepairDashboard';
import { RecyclerDashboard } from './pages/RecyclerDashboard';
import { SellerDashboard } from './pages/SellerDashboard';

// Route Protection
import { PrivateRoute, GuestRoute, RoleRoute, DashboardRedirect } from './components/RouteProtection';
import { PortalFeaturePlaceholder } from './components/PortalFeaturePlaceholder';

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

          <Route path="/dashboard">
            <Route index element={<DashboardRedirect />} />
            {/* Secure Individual User Routes */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['USER', 'ADMIN', 'SUPER_ADMIN']} />}>
                <Route path="user" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="objects" element={<Objects />} />
                  <Route path="objects/new" element={<AddObject />} />
                  <Route path="objects/:id" element={<ObjectDetails />} />
                  <Route path="objects/:id/edit" element={<EditObject />} />
                  <Route path="objects/:id/passport" element={<DigitalPassport />} />
                  <Route path="scanner" element={<Scanner />} />
                  <Route path="passport" element={<Passport />} />
                  <Route path="marketplace" element={<Marketplace />} />
                  <Route path="repair" element={<PortalFeaturePlaceholder name="Hardware Repair Console" description="Diagnose and schedule hardware repair tickets." />} />
                  <Route path="donate" element={<PortalFeaturePlaceholder name="Donate Stream" description="Connect redundant hardware directly with registered NGOs." />} />
                  <Route path="wallet" element={<Wallet />} />
                  <Route path="notifications" element={<PortalFeaturePlaceholder name="Notifications Alert Center" description="Telemetry warnings and system notification log." />} />
                  <Route path="profile" element={<PortalFeaturePlaceholder name="Profile Card Settings" description="Personal credentials and earthscore telemetry keys." />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>
            </Route>

            {/* Secure Enterprise Console */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['ENTERPRISE', 'ADMIN', 'SUPER_ADMIN']} />}>
                <Route path="enterprise" element={<EnterpriseLayout />}>
                  <Route index element={<EnterpriseHome />} />
                  <Route path="streams" element={<PortalFeaturePlaceholder name="Material Streams" description="Industrial byproduct matching and logistics registry." />} />
                  <Route path="settings" element={<PortalFeaturePlaceholder name="ERP Integration" description="Configure background sync tools for enterprise databases." />} />
                </Route>
              </Route>
            </Route>

            {/* Secure Government Portal */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['GOVERNMENT', 'ADMIN', 'SUPER_ADMIN']} />}>
                <Route path="government" element={<GovernmentLayout />}>
                  <Route index element={<GovernmentHome />} />
                  <Route path="stats" element={<PortalFeaturePlaceholder name="National Statistics" description="Nation-wide resource diversion and recycling target metrics." />} />
                  <Route path="waste" element={<PortalFeaturePlaceholder name="Waste Analytics" description="Municipal landfills geospatial heatmaps and diversion curves." />} />
                  <Route path="districts" element={<PortalFeaturePlaceholder name="District Reports" description="Regional districts performance compliance audit logs." />} />
                  <Route path="carbon" element={<PortalFeaturePlaceholder name="Carbon Audit Ledger" description="Official government audit database for carbon credit allocation." />} />
                  <Route path="ngos" element={<PortalFeaturePlaceholder name="NGO Partner Registries" description="Manage certified non-profit distribution networks." />} />
                  <Route path="recyclers" element={<PortalFeaturePlaceholder name="Sorting Facilities" description="Authorized waste recyclers registry & compliance status." />} />
                  <Route path="policies" element={<PortalFeaturePlaceholder name="Regulatory Policies" description="Set and adjust municipal waste regulatory limits." />} />
                  <Route path="settings" element={<PortalFeaturePlaceholder name="Government Panel Settings" description="Configure public interface accessibility targets." />} />
                </Route>
              </Route>
            </Route>

            {/* Secure Admin Control Panel */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']} />}>
                <Route path="admin" element={<AdminLayout />}>
                  <Route index element={<AdminHome />} />
                  <Route path="users" element={<AdminHome />} />
                  <Route path="objects" element={<PortalFeaturePlaceholder name="Global Objects Ledger" description="Master administrative control center for physical objects." />} />
                  <Route path="reports" element={<PortalFeaturePlaceholder name="Reports Console" description="Generate system usage audits and carbon reports." />} />
                  <Route path="marketplace" element={<PortalFeaturePlaceholder name="Marketplace Monitor" description="Observe transaction logs and listings." />} />
                  <Route path="moderation" element={<PortalFeaturePlaceholder name="System Moderation" description="Review flagged objects, user complaints, and escalations." />} />
                  <Route path="partners" element={<PortalFeaturePlaceholder name="Partner Directory" description="Manage relations with NGOs, repair partners, and recyclers." />} />
                  <Route path="analytics" element={<PortalFeaturePlaceholder name="System Analytics" description="System telemetry graphs and database performance benchmarks." />} />
                  <Route path="carbon" element={<PortalFeaturePlaceholder name="Carbon Ledger" description="Manage carbon credit distribution rates and transaction logs." />} />
                  <Route path="support" element={<PortalFeaturePlaceholder name="Helpdesk Support" description="Ticket queue for users requiring technical support." />} />
                  <Route path="settings" element={<PortalFeaturePlaceholder name="Admin Settings" description="Override permissions and security parameters." />} />
                </Route>
              </Route>
            </Route>

            {/* NGO Portal */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['NGO', 'ADMIN', 'SUPER_ADMIN']} />}>
                <Route path="ngo" element={<NgoLayout />}>
                  <Route index element={<NgoDashboard />} />
                  <Route path="requests" element={<PortalFeaturePlaceholder name="Donation Requests" description="Active material donation requests." />} />
                  <Route path="inventory" element={<PortalFeaturePlaceholder name="Inventory Stockpile" description="Stored resources and sorted material streams." />} />
                  <Route path="receivers" element={<PortalFeaturePlaceholder name="Receiver NGOs" description="Registry of final target charities." />} />
                  <Route path="donors" element={<PortalFeaturePlaceholder name="Donor Registry" description="Log of corporate and individual carbon donors." />} />
                  <Route path="deliveries" element={<PortalFeaturePlaceholder name="Logistics & Deliveries" description="Courier manifest tracking." />} />
                  <Route path="reports" element={<PortalFeaturePlaceholder name="Impact Reports" description="Generate annual reports." /> } />
                  <Route path="impact" element={<PortalFeaturePlaceholder name="Community Impact" description="Ledger of carbon offsets saved by NGOs." />} />
                  <Route path="settings" element={<PortalFeaturePlaceholder name="NGO Settings" description="Profile and notification configurations." />} />
                </Route>
              </Route>
            </Route>

            {/* Repair Partner Portal */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['REPAIR_PARTNER', 'ADMIN', 'SUPER_ADMIN']} />}>
                <Route path="repair" element={<RepairLayout />}>
                  <Route index element={<RepairDashboard />} />
                </Route>
              </Route>
            </Route>

            {/* Recycler Portal */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['RECYCLER', 'ADMIN', 'SUPER_ADMIN']} />}>
                <Route path="recycler" element={<RecyclerLayout />}>
                  <Route index element={<RecyclerDashboard />} />
                </Route>
              </Route>
            </Route>

            {/* Seller Portal */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['SELLER', 'ADMIN', 'SUPER_ADMIN']} />}>
                <Route path="seller" element={<SellerLayout />}>
                  <Route index element={<SellerDashboard />} />
                </Route>
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
