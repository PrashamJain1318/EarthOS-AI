import React from 'react';
import { Route } from 'react-router-dom';
import { NgoLayout } from './NgoLayout';
import { NgoDashboard } from './pages/NgoDashboard';
import { PortalFeaturePlaceholder } from '../../components/PortalFeaturePlaceholder';

export const NgoRoutes = (
  <Route path="ngo" element={<NgoLayout />}>
    <Route path="dashboard" element={<NgoDashboard />} />
    <Route path="donations" element={<PortalFeaturePlaceholder name="Donations Management" description="Manage incoming material donations." />} />
    <Route path="receivers" element={<PortalFeaturePlaceholder name="Receiver Registry" description="Registry of final target charities." />} />
    <Route path="inventory" element={<PortalFeaturePlaceholder name="Inventory Stockpile" description="Stored resources and sorted material streams." />} />
    <Route path="reports" element={<PortalFeaturePlaceholder name="Impact Reports" description="Generate annual and community impact reports." />} />
    <Route path="impact" element={<PortalFeaturePlaceholder name="Impact Analytics" description="Visualize overall community impact and carbon savings." />} />
    <Route path="delivery" element={<PortalFeaturePlaceholder name="Logistics & Deliveries" description="Courier manifest tracking." />} />
  </Route>
);
