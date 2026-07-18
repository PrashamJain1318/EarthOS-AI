import React from 'react';
import { Route } from 'react-router-dom';
import { GovernmentLayout } from './GovernmentLayout';
import { GovernmentDashboard } from './pages/GovernmentDashboard';
import { PortalFeaturePlaceholder } from '../../components/PortalFeaturePlaceholder';

export const GovernmentRoutes = (
  <Route path="government" element={<GovernmentLayout />}>
    <Route path="dashboard" element={<GovernmentDashboard />} />
    <Route path="statistics" element={<PortalFeaturePlaceholder name="National Statistics" description="State-level resource diversion and targets." />} />
    <Route path="waste" element={<PortalFeaturePlaceholder name="Waste Reports" description="Municipal landfills geospatial heatmaps." />} />
    <Route path="ngos" element={<PortalFeaturePlaceholder name="NGO Partner Registries" description="Manage certified non-profit distribution networks." />} />
    <Route path="policies" element={<PortalFeaturePlaceholder name="Regulatory Policies" description="Set and adjust municipal waste regulatory limits." />} />
    <Route path="compliance" element={<PortalFeaturePlaceholder name="Compliance Audits" description="Environmental enforcement and auditing." />} />
  </Route>
);
