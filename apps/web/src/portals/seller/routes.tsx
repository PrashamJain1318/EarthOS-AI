import React from 'react';
import { Route } from 'react-router-dom';
import { SellerLayout } from './SellerLayout';
import { SellerDashboard } from './pages/SellerDashboard';
import { PortalFeaturePlaceholder } from '../../components/PortalFeaturePlaceholder';

export const SellerRoutes = (
  <Route path="seller" element={<SellerLayout />}>
    <Route path="dashboard" element={<SellerDashboard />} />
    <Route path="products" element={<PortalFeaturePlaceholder name="Products" description="Manage marketplace listings and inventory." />} />
    <Route path="orders" element={<PortalFeaturePlaceholder name="Orders" description="Fulfillment and shipping logistics." />} />
    <Route path="customers" element={<PortalFeaturePlaceholder name="Customers" description="Customer messages and CRM." />} />
    <Route path="revenue" element={<PortalFeaturePlaceholder name="Revenue" description="Detailed financial tracking and accounting." />} />
  </Route>
);
