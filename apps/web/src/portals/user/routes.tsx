import React from 'react';
import { Route } from 'react-router-dom';
const UserLayout = React.lazy(() => import('./UserLayout').then(m => ({ default: m.UserLayout })));
const UserDashboard = React.lazy(() => import('./pages/UserDashboard').then(m => ({ default: m.UserDashboard })));
const Objects = React.lazy(() => import('../../pages/Objects').then(m => ({ default: m.Objects })));
const AddObject = React.lazy(() => import('../../pages/AddObject').then(m => ({ default: m.AddObject })));
const ObjectDetails = React.lazy(() => import('../../pages/ObjectDetails').then(m => ({ default: m.ObjectDetails })));
const EditObject = React.lazy(() => import('../../pages/EditObject').then(m => ({ default: m.EditObject })));
const DigitalPassport = React.lazy(() => import('../../pages/DigitalPassport').then(m => ({ default: m.DigitalPassport })));
const Scanner = React.lazy(() => import('../../pages/Scanner').then(m => ({ default: m.Scanner })));
const Passport = React.lazy(() => import('../../pages/Passport').then(m => ({ default: m.Passport })));
const Marketplace = React.lazy(() => import('../../pages/Marketplace').then(m => ({ default: m.Marketplace })));
const EarthGPT = React.lazy(() => import('../../pages/EarthGPT').then(m => ({ default: m.EarthGPT })));
const EarthTwin = React.lazy(() => import('../../pages/EarthTwin').then(m => ({ default: m.EarthTwin })));
const Community = React.lazy(() => import('../../pages/Community').then(m => ({ default: m.Community })));
const Wallet = React.lazy(() => import('../../pages/Wallet').then(m => ({ default: m.Wallet })));
const Settings = React.lazy(() => import('../../pages/Settings').then(m => ({ default: m.Settings })));
const Analytics = React.lazy(() => import('../../pages/Analytics').then(m => ({ default: m.Analytics })));

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
