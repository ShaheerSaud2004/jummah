import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import BackToTop from './components/BackToTop';
import AdminRoute from './components/AdminRoute';
import Homepage from './pages/Homepage';
import Khateebs from './pages/Khateebs';
import KhateebDetail from './pages/KhateebDetail';
import Community from './pages/Community';
import About from './pages/About';
import WeeklyUpdates from './pages/WeeklyUpdates';
import Gems from './pages/Gems';
import Salawaat from './pages/Salawaat';
import KahfCircle from './pages/KahfCircle';
import Parking from './pages/Parking';
import TeamApplication from './pages/TeamApplication';
import Team from './pages/Team';
import SunnahReminders from './pages/SunnahReminders';
import HOJ from './pages/HOJ';
import Adab from './pages/Adab';
import Calendar from './pages/Calendar';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminKhateebs from './pages/admin/AdminKhateebs';
import AdminWeeklyContent from './pages/admin/AdminWeeklyContent';
import AdminGems from './pages/admin/AdminGems';
import AdminSalawaat from './pages/admin/AdminSalawaat';
import AdminKahfCircle from './pages/admin/AdminKahfCircle';
import AdminLivestream from './pages/admin/AdminLivestream';
import AdminTeam from './pages/admin/AdminTeam';
import AdminSunnahReminders from './pages/admin/AdminSunnahReminders';
import AdminEvents from './pages/admin/AdminEvents';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/khateebs" element={<Khateebs />} />
            <Route path="/khateebs/:id" element={<KhateebDetail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route path="/updates" element={<WeeklyUpdates />} />
            <Route path="/gems" element={<Gems />} />
            <Route path="/salawaat" element={<Salawaat />} />
            <Route path="/kahf-circle" element={<KahfCircle />} />
            <Route path="/parking" element={<Parking />} />
            <Route path="/team-application" element={<TeamApplication />} />
            <Route path="/team" element={<Team />} />
            <Route path="/sunnah-reminders" element={<SunnahReminders />} />
            <Route path="/hoj" element={<HOJ />} />
            <Route path="/adab" element={<Adab />} />
            <Route path="/calendar" element={<Calendar />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/khateebs" element={<AdminRoute><AdminKhateebs /></AdminRoute>} />
            <Route path="/admin/weekly-content" element={<AdminRoute><AdminWeeklyContent /></AdminRoute>} />
            <Route path="/admin/gems" element={<AdminRoute><AdminGems /></AdminRoute>} />
            <Route path="/admin/salawaat" element={<AdminRoute><AdminSalawaat /></AdminRoute>} />
            <Route path="/admin/kahf-circle" element={<AdminRoute><AdminKahfCircle /></AdminRoute>} />
            <Route path="/admin/livestream" element={<AdminRoute><AdminLivestream /></AdminRoute>} />
            <Route path="/admin/team" element={<AdminRoute><AdminTeam /></AdminRoute>} />
            <Route path="/admin/sunnah-reminders" element={<AdminRoute><AdminSunnahReminders /></AdminRoute>} />
            <Route path="/admin/events" element={<AdminRoute><AdminEvents /></AdminRoute>} />
            <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
