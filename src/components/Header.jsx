import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Header() {
  const location = useLocation();
  
  // Single state for each dropdown to handle both hover and click
  const [jaitOpen, setJaitOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const isJaiTActive = location.pathname === '/jai-t' || location.pathname === '/jai-t/taxonomy';
  const isContactActive = location.pathname.startsWith('/contact');

  const closeAll = () => {
    setJaitOpen(false);
    setContactOpen(false);
  };

  return (
    <header className="bg-[#011e41] text-white py-4 md:py-6 px-4 md:px-8 border-b-2 border-[#011e41]">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo and Title Group */}
        <Link to="/" onClick={closeAll} className="no-underline text-white flex-shrink-1 md:flex-shrink-0">
          <div className="flex flex-row items-center text-left">
            <img 
              src={`${import.meta.env.BASE_URL}logo.svg`}
              alt="Evidence for Justice Lab Logo" 
              className="h-14 md:h-16 lg:h-20 w-auto mr-3 lg:mr-4"
            />
            <h1 className="text-white font-['Source_Sans_3'] text-lg md:text-xl lg:text-2xl font-bold leading-tight max-w-[200px] md:max-w-[300px] lg:max-w-none">
              Justice and Artificial Intelligence Tracker
            </h1>
          </div>
        </Link>
        
        {/* Navigation Links */}
        <nav className="flex flex-row items-center justify-end gap-4 md:gap-6 lg:gap-10">
          <Link 
            to="/" 
            onClick={closeAll}
            className={`font-['Source_Sans_3'] text-sm md:text-base lg:text-[1.2rem] font-bold text-white no-underline hover:underline whitespace-nowrap ${
              location.pathname === '/' ? 'underline' : ''
            }`}
          >
            Map
          </Link>
          
          {/* JAI-T Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setJaitOpen(true)}
            onMouseLeave={() => setJaitOpen(false)}
          >
            <Link 
              to="/jai-t#table"
              onClick={() => {
                setJaitOpen(false);
                closeAll();
              }}
              className={`bg-transparent border-none cursor-pointer p-0 font-['Source_Sans_3'] text-sm md:text-base lg:text-[1.2rem] font-bold no-underline hover:underline transition-colors whitespace-nowrap ${
                isJaiTActive ? 'underline' : ''
              } ${jaitOpen ? 'text-[#0097b2]' : 'text-white'}`}
            >
              Database
            </Link>
            
            {jaitOpen && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 bg-[#011e41] min-w-[180px] shadow-xl z-[1000] rounded mt-0 pt-2 py-2 border border-white/10"
                onMouseEnter={() => setJaitOpen(true)}
              >
                <Link to="/jai-t#table" onClick={closeAll} className="block py-2 px-4 hover:bg-[#0097b2] text-white no-underline transition-colors text-sm md:text-base">Table</Link>
                <Link to="/jai-t#taxonomy" onClick={closeAll} className="block py-2 px-4 hover:bg-[#0097b2] text-white no-underline transition-colors text-sm md:text-base">Taxonomy</Link>
                <Link to="/jai-t#methodology" onClick={closeAll} className="block py-2 px-4 hover:bg-[#0097b2] text-white no-underline transition-colors text-sm md:text-base">Methodology</Link>
                <Link to="/jai-t#disclaimers" onClick={closeAll} className="block py-2 px-4 hover:bg-[#0097b2] text-white no-underline transition-colors text-sm md:text-base">Disclaimers</Link>
                <Link to="/jai-t#citation" onClick={closeAll} className="block py-2 px-4 hover:bg-[#0097b2] text-white no-underline transition-colors text-sm md:text-base">Cite</Link>
              </div>
            )}
          </div>

          <Link
            to="/insights"
            onClick={closeAll}
            className={`font-['Source_Sans_3'] text-sm md:text-base lg:text-[1.2rem] font-bold text-white no-underline hover:underline whitespace-nowrap ${
              location.pathname === '/insights' ? 'underline' : ''
            }`}
          >
            Insights
          </Link>

          <Link
            to="/news"
            onClick={closeAll}
            className={`font-['Source_Sans_3'] text-sm md:text-base lg:text-[1.2rem] font-bold text-white no-underline hover:underline whitespace-nowrap ${
              location.pathname === '/news' ? 'underline' : ''
            }`}
          >
            News
          </Link>

          {/* Contact Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setContactOpen(true)}
            onMouseLeave={() => setContactOpen(false)}
          >
            <Link 
              to="/contact"
              onClick={() => {
                setContactOpen(false);
                closeAll();
              }}
              className={`bg-transparent border-none cursor-pointer p-0 font-['Source_Sans_3'] text-sm md:text-base lg:text-[1.2rem] font-bold no-underline hover:underline transition-colors whitespace-nowrap ${
                isContactActive ? 'underline' : ''
              } ${contactOpen ? 'text-[#0097b2]' : 'text-white'}`}
            >
              Contact
            </Link>
            {contactOpen && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 bg-[#011e41] min-w-[180px] shadow-xl z-[1000] rounded mt-0 pt-2 py-2 border border-white/10"
                onMouseEnter={() => setContactOpen(true)}
              >
                <Link to="/contact/about" onClick={closeAll} className="block py-2 px-4 hover:bg-[#0097b2] text-white no-underline transition-colors text-sm md:text-base">About Us</Link>
                <Link to="/contact" onClick={closeAll} className="block py-2 px-4 hover:bg-[#0097b2] text-white no-underline transition-colors text-sm md:text-base">Submit an Entry</Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;