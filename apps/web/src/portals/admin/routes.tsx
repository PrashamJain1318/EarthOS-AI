import React from 'react';
import { Route } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { AdminDashboard } from './pages/AdminDashboard';
import { PortalFeaturePlaceholder } from '../../components/PortalFeaturePlaceholder';

export const AdminRoutes = (
  <Route path="admin" element={<AdminLayout />}>
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="users" element={<PortalFeaturePlaceholder name="User Management" description="Manage platform users and roles." />} />
    <Route path="moderation" element={<PortalFeaturePlaceholder name="Object Moderation" description="Review flagged resource passports." />} />
    <Route path="analytics" element={<PortalFeaturePlaceholder name="System Analytics" description="System telemetry graphs and database performance benchmarks." />} />
    <Route path="reports" element={<PortalFeaturePlaceholder name="Reports Console" description="Generate system usage audits and carbon reports." />} />
    <Route path="health" element={<PortalFeaturePlaceholder name="System Health" description="Realtime cluster node health streams." />} />
  </Route>
);
