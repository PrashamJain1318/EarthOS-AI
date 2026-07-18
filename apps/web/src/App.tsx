import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { UserLayout } from './layouts/UserLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { EnterpriseLayout } from './layouts/EnterpriseLayout';
import { GovernmentLayout } from './layouts/GovernmentLayout';
import { NgoLayout } from './layouts/NgoLayout';
import { RepairLayout } from './layouts/RepairLayout';
import { RecyclerLayout } from './layouts/RecyclerLayout';
import { SellerLayout } from './layouts/SellerLayout';
import { SuperAdminLayout } from './layouts/SuperAdminLayout';
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
import { PrivateRoute, GuestRoute, RoleRoute, AppRedirect } from './components/RouteProtection';
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
            <Route index element={<AppRedirect />} />
            {/* Secure Individual User Routes */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['USER', 'ADMIN', 'SUPER_ADMIN']} />}>
                <Route path="user" element={<UserLayout />}>
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
                  <Route path="earthscore" element={<PortalFeaturePlaceholder name="Earth Score" description="Detailed environmental impact metrics." />} />
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
                  <Route path="assets" element={<PortalFeaturePlaceholder name="Assets Management" description="Lifecycle tracking of physical assets." />} />
                  <Route path="employees" element={<PortalFeaturePlaceholder name="Employees" description="Employee sustainability training and engagement." />} />
                  <Route path="departments" element={<PortalFeaturePlaceholder name="Departments" description="Departmental ESG goals and carbon quotas." />} />
                  <Route path="carbon" element={<PortalFeaturePlaceholder name="Carbon Analytics" description="Scope 3 emissions accounting." />} />
                  <Route path="waste" element={<PortalFeaturePlaceholder name="Waste Reports" description="Internal recycling and diversion reporting." />} />
                  <Route path="compliance" element={<PortalFeaturePlaceholder name="Compliance" description="ESG compliance checklists and audits." />} />
                  <Route path="settings" element={<PortalFeaturePlaceholder name="Settings" description="Configure background sync tools for enterprise databases." />} />
                </Route>
              </Route>
            </Route>

            {/* Secure Government Portal */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['GOVERNMENT', 'ADMIN', 'SUPER_ADMIN']} />}>
                <Route path="government" element={<GovernmentLayout />}>
                  <Route index element={<GovernmentHome />} />
                  <Route path="states" element={<PortalFeaturePlaceholder name="States Dashboard" description="State-level resource diversion and targets." />} />
                  <Route path="districts" element={<PortalFeaturePlaceholder name="District Reports" description="Regional districts performance compliance." />} />
                  <Route path="ngos" element={<PortalFeaturePlaceholder name="NGO Partner Registries" description="Manage certified non-profit distribution networks." />} />
                  <Route path="waste" element={<PortalFeaturePlaceholder name="Waste Analytics" description="Municipal landfills geospatial heatmaps." />} />
                  <Route path="carbon" element={<PortalFeaturePlaceholder name="Carbon Reports" description="Official government audit database for carbon credit." />} />
                  <Route path="policies" element={<PortalFeaturePlaceholder name="Regulatory Policies" description="Set and adjust municipal waste regulatory limits." />} />
                  <Route path="compliance" element={<PortalFeaturePlaceholder name="Compliance Audits" description="Environmental enforcement and auditing." />} />
                  <Route path="settings" element={<PortalFeaturePlaceholder name="Government Panel Settings" description="Configure public interface accessibility targets." />} />
                </Route>
              </Route>
            </Route>

            {/* Secure Admin Control Panel */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']} />}>
                <Route path="admin" element={<AdminLayout />}>
                  <Route index element={<AdminHome />} />
                  <Route path="users" element={<PortalFeaturePlaceholder name="User Management" description="Manage platform users and roles." />} />
                  <Route path="inventory" element={<PortalFeaturePlaceholder name="Global Inventory" description="Master administrative control center for physical objects." />} />
                  <Route path="marketplace" element={<PortalFeaturePlaceholder name="Marketplace Monitor" description="Observe transaction logs and listings." />} />
                  <Route path="partners" element={<PortalFeaturePlaceholder name="Partner Directory" description="Manage relations with corporate and repair partners." />} />
                  <Route path="ngos" element={<PortalFeaturePlaceholder name="NGO Directory" description="Manage registered NGOs and distribution networks." />} />
                  <Route path="reports" element={<PortalFeaturePlaceholder name="Reports Console" description="Generate system usage audits and carbon reports." />} />
                  <Route path="analytics" element={<PortalFeaturePlaceholder name="System Analytics" description="System telemetry graphs and database performance benchmarks." />} />
                  <Route path="carbon" element={<PortalFeaturePlaceholder name="Carbon Ledger" description="Manage carbon credit distribution rates and transaction logs." />} />
                  <Route path="support" element={<PortalFeaturePlaceholder name="Helpdesk Support" description="Ticket queue for users requiring technical support." />} />
                  <Route path="settings" element={<PortalFeaturePlaceholder name="Admin Settings" description="Override permissions and security parameters." />} />
                </Route>
              </Route>
            </Route>

            {/* Secure Super Admin Portal */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['SUPER_ADMIN']} />}>
                <Route path="superadmin" element={<SuperAdminLayout />}>
                  <Route index element={<PortalFeaturePlaceholder name="God Mode Dashboard" description="Full master system telemetry." />} />
                  <Route path="telemetry" element={<PortalFeaturePlaceholder name="System Telemetry" description="Realtime system health streams." />} />
                  <Route path="logs" element={<PortalFeaturePlaceholder name="Database Logs" description="Direct database inspection." />} />
                  <Route path="api" element={<PortalFeaturePlaceholder name="API Console" description="Direct execution of GraphQL/REST nodes." />} />
                  <Route path="servers" element={<PortalFeaturePlaceholder name="Server Fleet" description="Manage underlying Kubernetes node infrastructure." />} />
                  <Route path="settings" element={<PortalFeaturePlaceholder name="Global Configurations" description="Master feature flags and kill switches." />} />
                </Route>
              </Route>
            </Route>

            {/* NGO Portal */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['NGO', 'ADMIN', 'SUPER_ADMIN']} />}>
                <Route path="ngo" element={<NgoLayout />}>
                  <Route index element={<NgoDashboard />} />
                  <Route path="donations" element={<PortalFeaturePlaceholder name="Donations Management" description="Manage incoming material donations." />} />
                  <Route path="receivers" element={<PortalFeaturePlaceholder name="Receiver Registry" description="Registry of final target charities." />} />
                  <Route path="inventory" element={<PortalFeaturePlaceholder name="Inventory Stockpile" description="Stored resources and sorted material streams." />} />
                  <Route path="distribution" element={<PortalFeaturePlaceholder name="Distribution Networks" description="Manage logistics and distribution channels." />} />
                  <Route path="deliveries" element={<PortalFeaturePlaceholder name="Logistics & Deliveries" description="Courier manifest tracking." />} />
                  <Route path="reports" element={<PortalFeaturePlaceholder name="Impact Reports" description="Generate annual and community impact reports." /> } />
                  <Route path="partners" element={<PortalFeaturePlaceholder name="Partner Directory" description="Network of repair and recycling partners." />} />
                  <Route path="settings" element={<PortalFeaturePlaceholder name="NGO Settings" description="Profile and notification configurations." />} />
                </Route>
              </Route>
            </Route>

            {/* Repair Partner Portal */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['REPAIR_PARTNER', 'ADMIN', 'SUPER_ADMIN']} />}>
                <Route path="repair" element={<RepairLayout />}>
                  <Route index element={<RepairDashboard />} />
                  <Route path="jobs" element={<PortalFeaturePlaceholder name="Repair Jobs" description="Active and queued repair tickets." />} />
                  <Route path="customers" element={<PortalFeaturePlaceholder name="Customers" description="Customer directory and feedback logs." />} />
                  <Route path="inventory" element={<PortalFeaturePlaceholder name="Parts Inventory" description="Track hardware replacement parts." />} />
                  <Route path="invoices" element={<PortalFeaturePlaceholder name="Invoices" description="Billing and payment histories." />} />
                  <Route path="technicians" element={<PortalFeaturePlaceholder name="Technicians" description="Manage repair staff and schedules." />} />
                  <Route path="analytics" element={<PortalFeaturePlaceholder name="Analytics" description="Revenue and turnaround time metrics." />} />
                  <Route path="settings" element={<PortalFeaturePlaceholder name="Settings" description="Workshop configurations." />} />
                </Route>
              </Route>
            </Route>

            {/* Recycler Portal */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['RECYCLER', 'ADMIN', 'SUPER_ADMIN']} />}>
                <Route path="recycler" element={<RecyclerLayout />}>
                  <Route index element={<RecyclerDashboard />} />
                  <Route path="pickups" element={<PortalFeaturePlaceholder name="Pickup Requests" description="Schedule waste material collection." />} />
                  <Route path="materials" element={<PortalFeaturePlaceholder name="Materials" description="Sorted waste stream categories." />} />
                  <Route path="processing" element={<PortalFeaturePlaceholder name="Processing" description="Material breakdown and recovery rates." />} />
                  <Route path="carbon" element={<PortalFeaturePlaceholder name="Carbon Reports" description="Calculated carbon offset logs." />} />
                  <Route path="certificates" element={<PortalFeaturePlaceholder name="Certificates" description="Issued recycling compliance certificates." />} />
                  <Route path="analytics" element={<PortalFeaturePlaceholder name="Analytics" description="Facility throughput and efficiency." />} />
                  <Route path="settings" element={<PortalFeaturePlaceholder name="Settings" description="Recycling plant configurations." />} />
                </Route>
              </Route>
            </Route>

            {/* Seller Portal */}
            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={['SELLER', 'ADMIN', 'SUPER_ADMIN']} />}>
                <Route path="seller" element={<SellerLayout />}>
                  <Route index element={<SellerDashboard />} />
                  <Route path="products" element={<PortalFeaturePlaceholder name="Products" description="Manage marketplace listings and inventory." />} />
                  <Route path="orders" element={<PortalFeaturePlaceholder name="Orders" description="Fulfillment and shipping logistics." />} />
                  <Route path="customers" element={<PortalFeaturePlaceholder name="Customers" description="Customer messages and CRM." />} />
                  <Route path="analytics" element={<PortalFeaturePlaceholder name="Analytics" description="Storefront traffic and conversion rates." />} />
                  <Route path="revenue" element={<PortalFeaturePlaceholder name="Revenue" description="Detailed financial tracking and accounting." />} />
                  <Route path="payouts" element={<PortalFeaturePlaceholder name="Payouts" description="Bank deposits and transaction history." />} />
                  <Route path="settings" element={<PortalFeaturePlaceholder name="Settings" description="Storefront branding and configurations." />} />
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
