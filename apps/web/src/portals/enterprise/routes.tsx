import React from 'react';
import { Route } from 'react-router-dom';
import { EnterpriseLayout } from './EnterpriseLayout';
import { EnterpriseDashboard } from './pages/EnterpriseDashboard';
import { PortalFeaturePlaceholder } from '../../components/PortalFeaturePlaceholder';

export const EnterpriseRoutes = (
  <Route path="enterprise" element={<EnterpriseLayout />}>
    <Route path="dashboard" element={<EnterpriseDashboard />} />
    <Route path="departments" element={<PortalFeaturePlaceholder name="Departments" description="Departmental ESG goals and carbon quotas." />} />
    <Route path="assets" element={<PortalFeaturePlaceholder name="Assets Management" description="Lifecycle tracking of physical assets." />} />
    <Route path="carbon" element={<PortalFeaturePlaceholder name="Carbon Analytics" description="Scope 3 emissions accounting." />} />
    <Route path="employees" element={<PortalFeaturePlaceholder name="Employees" description="Employee sustainability training and engagement." />} />
    <Route path="reports" element={<PortalFeaturePlaceholder name="Reports" description="Internal recycling and diversion reporting." />} />
  </Route>
);
