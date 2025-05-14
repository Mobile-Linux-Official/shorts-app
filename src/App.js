import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import VideoFeed from './components/VideoFeed';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import UploadVideo from './components/UploadVideo';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<VideoFeed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/upload" element={<UploadVideo />} /> {/* Route untuk upload video */}
      </Routes>
    </Router>
  );
}

export default App;
