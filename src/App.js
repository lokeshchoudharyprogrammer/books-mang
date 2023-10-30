
import { Route, Routes } from 'react-router-dom';
import './App.css';
import BookManagementPage from './pages/Books';
import { Singlebook } from './pages/Singlebook';
import { Navbar } from './pages/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<BookManagementPage />} />
        <Route path="/:id" element={<Singlebook />} />
      </Routes>

    </div>
  );
}

export default App;
