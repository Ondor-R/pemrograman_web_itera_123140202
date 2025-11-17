import { useState } from 'react';
import { BookProvider } from './components/BookContext.jsx';
import AppNavigator from './components/appNavigator.jsx';
import HomePage from './components/pages/HomePage.jsx';
import StatsPage from './components/pages/statsPage.jsx';
import './index.css';

const App = () => {
  const [page, setPage] = useState('home');

  return (
    <BookProvider>
      <div className="app-container">
        <AppNavigator page={page} setPage={setPage} />
        <main className="main-content">
          {page === 'home' && <HomePage />}
          {page === 'stats' && <StatsPage />}
        </main>
        <footer className="app-footer">
          123140202 | Reyhan Oktavian Putra
        </footer>
      </div>
    </BookProvider>
  );
};

export default App;