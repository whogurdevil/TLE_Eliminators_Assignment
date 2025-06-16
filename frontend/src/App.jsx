import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentListPage from './pages/StudentListPage';
import Navbar from './components/Navbar';
import StudentProfilePage from './pages/StudentProfilePage';
function App() {
  return (
    <BrowserRouter>
    <Navbar/> 
      <Routes>
        <Route path="/" element={<StudentListPage />} />
        <Route path="/student/:id" element={<StudentProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
