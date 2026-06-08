import { Link } from 'react-router-dom';
import { useState } from 'react';

function Footer() {
  const linkedInUrl = "https://www.linkedin.com/company/evidence-for-justice-lab/";
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://formspree.io/f/xykgkzqy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        // Also record in Google Sheet
        fetch('https://script.google.com/macros/s/AKfycbxvWB_Kr4-RiSLOOrHQOxsN44Kqd3l4Ft8Pa4BizTdUsn_ab8J4QaT6Tgb6zG23mXB7/exec', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            formType: 'newsletter',
            email: email
          }).toString()
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));

        setSubscribeStatus('Thanks for subscribing!');
        setEmail('');
        setTimeout(() => setSubscribeStatus(''), 3000);
      } else {
        setSubscribeStatus('Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubscribeStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <footer className="bg-[#011e41] text-white py-6 px-6 md:px-12 mt-auto">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-8">
        
        {/* Footer Left - Logo */}
        <div className="flex items-center md:order-1">
          <img 
            src={`${import.meta.env.BASE_URL}footerlogo.png`}
            alt="Evidence for Justice Lab Logo" 
            className="h-[120px] md:h-[120px] w-auto object-contain"
          />
        </div>

        {/* Footer Middle - Social + Nav */}
        <div className="flex flex-row md:flex-row items-center gap-6 md:gap-12 flex-1 justify-center md:order-2 w-full md:w-auto">
          {/* Social Link */}
          <div className="flex items-center gap-5">
            <a 
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white transition-opacity duration-200 hover:opacity-70"
              aria-label="LinkedIn"
            >
              <svg 
                className="w-6 h-6"
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          {/* Navigation */}
          <nav className="flex flex-row md:flex-row items-center gap-8 md:gap-7 sm:gap-4">
            <Link 
              to="/" 
              className="font-['Source_Sans_3'] text-base text-white no-underline transition-opacity duration-200 hover:opacity-70 whitespace-nowrap"
            >
              Map
            </Link>
            <Link 
              to="/jai-t" 
              className="font-['Source_Sans_3'] text-base text-white no-underline transition-opacity duration-200 hover:opacity-70 whitespace-nowrap"
            >
              JAI-T
            </Link>
            <Link 
              to="/insights" 
              className="font-['Source_Sans_3'] text-base text-white no-underline transition-opacity duration-200 hover:opacity-70 whitespace-nowrap"
            >
              Insights
            </Link>
            <Link
              to="/contact/about"
              className="font-['Source_Sans_3'] text-base text-white no-underline transition-opacity duration-200 hover:opacity-70 whitespace-nowrap"
            >
              Contact
            </Link>
            <Link
              to="/terms-of-use"
              className="font-['Source_Sans_3'] text-base text-white no-underline transition-opacity duration-200 hover:opacity-70 whitespace-nowrap"
            >
              Terms of Use
            </Link>
          </nav>
        </div>

        {/* Footer Newsletter */}
        <div className="flex flex-col gap-2 w-full md:max-w-[600px] md:order-3">
          <p className="font-['Source_Sans_3'] italic text-sm font-semibold m-0 mb-1 text-white">
            Track AI. Track Justice. Stay Informed.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 py-[0.65rem] px-4 border border-white/30 rounded bg-white/10 text-white font-['Source_Sans_3'] text-sm transition-all duration-200 focus:outline-none focus:border-[#0097b2] focus:bg-white/15 placeholder:text-white/60 w-full sm:w-auto"
              required
            />
            <button 
              type="submit" 
              className="py-[0.65rem] px-5 bg-[#0097b2] text-white border-none rounded font-['Source_Sans_3'] text-sm font-semibold cursor-pointer transition-colors duration-200 hover:bg-[#007a8c] whitespace-nowrap w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
          {subscribeStatus && (
            <p className="font-['Source_Sans_3'] text-[0.85rem] text-green-400 m-0">
              {subscribeStatus}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;