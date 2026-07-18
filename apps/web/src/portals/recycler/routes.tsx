import React from 'react';
import { Route } from 'react-router-dom';
import { RecyclerLayout } from './RecyclerLayout';
import { RecyclerDashboard } from './pages/RecyclerDashboard';
import { PortalFeaturePlaceholder } from '../../components/PortalFeaturePlaceholder';

export const RecyclerRoutes = (
  <Route path="recycler" element={<RecyclerLayout />}>
    <Route path="dashboard" element={<RecyclerDashboard />} />
    <Route path="pickups" element={<PortalFeaturePlaceholder name="Pickup Requests" description="Schedule waste material collection." />} />
    <Route path="processing" element={<PortalFeaturePlaceholder name="Processing" description="Material breakdown and recovery rates." />} />
    <Route path="certificates" element={<PortalFeaturePlaceholder name="Certificates" description="Issued recycling compliance certificates." />} />
    <Route path="carbon" element={<PortalFeaturePlaceholder name="Carbon Reports" description="Calculated carbon offset logs." />} />
  </Route>
);
