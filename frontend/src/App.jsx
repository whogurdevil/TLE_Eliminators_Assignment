import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentTableViewPage from './pages/StudentTableViewPage'
import Navbar from './components/Navbar';
import StudentProfilePage from './pages/StudentProfilePage';
import StudentEdit from './pages/StudentEditPage';
import StudentAddPage from './pages/StudentAddPage';
function App() {
  return (
    <BrowserRouter>
    <Navbar/> 
      <Routes>
        <Route path="/" element={<StudentTableViewPage />} />
        <Route path="/student/edit/:studentId" element={<StudentEdit />} />
        <Route path="/student/new/" element={<StudentAddPage />} />
        <Route path="/student/:studentId" element={<StudentProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
