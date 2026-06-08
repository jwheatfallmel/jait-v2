// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import JAITDatabase from './pages/JAITDatabase';
import Insights from './pages/Insights';
import Methodology from './pages/Methodology';
import Disclaimers from './pages/Disclaimers';
import Contact from './pages/Contact';
import './App.css';
import Taxonomy from './pages/Taxonomy';
import EntryDetail from './components/EntryDetail';
import News from './pages/News';
import TermsOfUse from './pages/TermsOfUse';


function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jai-t" element={<JAITDatabase />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/about" element={<Contact />} />
        <Route path="/jai-t/:id" element={<EntryDetail />} />
        <Route path="/contact/faq" element={<Contact />} />
        <Route path="/news" element={<News />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
      </Routes>
      <Footer />
    </div>
  );
}


export default App;
