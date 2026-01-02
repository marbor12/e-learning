
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';

// Trainer Pages
import TrainerDashboard from './pages/trainer/TrainerDashboard';
import TrainerEvents from './pages/trainer/TrainerEvents';
import TrainerEventDetail from './pages/trainer/TrainerEventDetail';
import TrainerCourses from './pages/trainer/TrainerCourses';
import TrainerCourseDetail from './pages/trainer/TrainerCourseDetail';
import TrainerFeedback from './pages/trainer/TrainerFeedback';
import TrainerProfile from './pages/trainer/TrainerProfile';
import TrainerMaterialManagement from './pages/trainer/TrainerMaterialManagement';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTrainerList from './pages/admin/AdminTrainerList';
import AdminTrainerDetail from './pages/admin/AdminTrainerDetail';
import AdminAttendance from './pages/admin/AdminAttendance';
import AdminMaterialValidation from './pages/admin/AdminMaterialValidation';
import AdminInviteTrainer from './pages/admin/AdminInviteTrainer';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Trainer Portal */}
        <Route path="/trainer" element={<Layout />}>
          <Route index element={<TrainerDashboard />} />
          <Route path="events" element={<TrainerEvents />} />
          <Route path="events/:eventId" element={<TrainerEventDetail />} />
          <Route path="courses" element={<TrainerCourses />} />
          <Route path="courses/:courseId" element={<TrainerCourseDetail />} />
          <Route path="materials" element={<TrainerMaterialManagement />} />
          <Route path="feedback" element={<TrainerFeedback />} />
          <Route path="profile" element={<TrainerProfile />} />
        </Route>

        {/* Admin Portal */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="validation" element={<AdminMaterialValidation />} />
          <Route path="trainers" element={<AdminTrainerList />} />
          <Route path="trainers/:trainerId" element={<AdminTrainerDetail />} />
          <Route path="trainers/:trainerId/invite" element={<AdminInviteTrainer />} />
        </Route>

        {/* Catch-all */}
        <Route path="/admin-trainer" element={<Navigate to="/admin" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
