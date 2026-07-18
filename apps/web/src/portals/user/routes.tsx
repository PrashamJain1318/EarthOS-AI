import React from 'react';
import { Route } from 'react-router-dom';
import { UserLayout } from './UserLayout';
import { UserDashboard } from './pages/UserDashboard';
import { Objects } from '../../pages/Objects';
import { AddObject } from '../../pages/AddObject';
import { ObjectDetails } from '../../pages/ObjectDetails';
import { EditObject } from '../../pages/EditObject';
import { DigitalPassport } from '../../pages/DigitalPassport';
import { Scanner } from '../../pages/Scanner';
import { Passport } from '../../pages/Passport';
import { Marketplace } from '../../pages/Marketplace';
import { EarthGPT } from '../../pages/EarthGPT';
import { EarthTwin } from '../../pages/EarthTwin';
import { Community } from '../../pages/Community';
import { Wallet } from '../../pages/Wallet';
import { Settings } from '../../pages/Settings';
import { Analytics } from '../../pages/Analytics';

export const UserRoutes = (
  <Route path="user" element={<UserLayout />}>
    <Route path="dashboard" element={<UserDashboard />} />
    <Route path="analytics" element={<Analytics />} />
    <Route path="my-objects" element={<Objects />} />
    <Route path="objects/new" element={<AddObject />} />
    <Route path="objects/:id" element={<ObjectDetails />} />
    <Route path="objects/:id/edit" element={<EditObject />} />
    <Route path="objects/:id/passport" element={<DigitalPassport />} />
    <Route path="scanner" element={<Scanner />} />
    <Route path="passport" element={<Passport />} />
    <Route path="marketplace" element={<Marketplace />} />
    <Route path="earthgpt" element={<EarthGPT />} />
    <Route path="twin" element={<EarthTwin />} />
    <Route path="community" element={<Community />} />
    <Route path="wallet" element={<Wallet />} />
    <Route path="settings" element={<Settings />} />
  </Route>
);
