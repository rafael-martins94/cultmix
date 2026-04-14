import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';
import Home from './pages/Home';
import Card from './pages/Card';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageSwitcher />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Card />} />
      </Routes>
    </BrowserRouter>
  );
}
