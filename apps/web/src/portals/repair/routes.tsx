import React from 'react';
import { Route } from 'react-router-dom';
import { RepairLayout } from './RepairLayout';
import { RepairDashboard } from './pages/RepairDashboard';
import { PortalFeaturePlaceholder } from '../../components/PortalFeaturePlaceholder';

export const RepairRoutes = (
  <Route path="repair" element={<RepairLayout />}>
    <Route path="dashboard" element={<RepairDashboard />} />
    <Route path="jobs" element={<PortalFeaturePlaceholder name="Repair Jobs" description="Active and queued repair tickets." />} />
    <Route path="technicians" element={<PortalFeaturePlaceholder name="Technicians" description="Manage repair staff and schedules." />} />
    <Route path="invoices" element={<PortalFeaturePlaceholder name="Invoices" description="Billing and payment histories." />} />
    <Route path="inventory" element={<PortalFeaturePlaceholder name="Parts Inventory" description="Track hardware replacement parts." />} />
    <Route path="analytics" element={<PortalFeaturePlaceholder name="Analytics" description="Revenue and turnaround time metrics." />} />
  </Route>
);
