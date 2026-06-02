import logo from './logo.svg';
import './App.css';
import {Route,BrowserRouter as Router,Routes} from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/authContext';
import VideoMeetComponent from './pages/videoMeet';
import HomeComponent from './pages/home';
import History from './pages/history';
function App() {
  return (
   <div className="App">
    <Router>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/auth' element={<Authentication/>}/>
        <Route path='/:url' element={<VideoMeetComponent/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/home' element={<HomeComponent/>}/>
                 </Routes>
                 </AuthProvider>
    </Router>
   </div>
  );
}

export default App;
