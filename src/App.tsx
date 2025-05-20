// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import styles from './App.module.scss';
import Navbar from './components/Navbar/Navbar';
import About from './pages/Profile';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './components/Register/Register';



function App() {
  return (
    <div className={styles.App}>
      <Router>
        <header className={styles.AppHeader}>
          <Navbar />
        </header>
        <main className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
