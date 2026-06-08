// import { useState, useMemo, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import FilterSidebar from '../components/FilterSidebar';
// import DataTable from '../components/DataTable';
// import Taxonomy from './Taxonomy';
// import Methodology from './Methodology';
// import Cite from './Cite';
// import DownloadModal from '../components/DownloadModal';
// import { parseCSVData } from '../utils/csvParser';
// import './JAITDatabase.css';
// import Disclaimers from './Disclaimers';

// const categoryDefinitions = {
//   "Back End Administration": "Supports internal operations (ex: data management, documentation).",
//   "Detection": "Identifies objects or events (ex: gunshot detection, license plate recognition).",
//   "Forensic Analysis": "Analyzes evidence (ex: images, biometrics).",
//   "Front End Support": "Directly interacts with the public (ex: chatbots, online portals).",
//   "Prediction": "Forecasts risk, hotspots, recidivism, or resource demands.",
//   "Surveillance": "Real-time monitoring, video analysis, or sensor-based tracking.",
//   "N/A" : "At the time of search, research assistants found no AI powered tools.",
// };

// function JAITDatabase() {
//   const location = useLocation();
//   const [viewMode, setViewMode] = useState('table');
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     categories: [],
//     domain: [],
//     state: [],
//     city: []
//   });

//   const availableStates = useMemo(() => {
//     const stateSet = new Set();
//     data.forEach(row => {
//       if (row.state && row.state.trim()) stateSet.add(row.state.trim());
//     });
//     return Array.from(stateSet).sort();
//   }, [data]);

//   const availableCities = useMemo(() => {
//     const citySet = new Set();
//     data.forEach(row => {
//       if (row.city && row.city.trim()) citySet.add(row.city.trim());
//     });
//     return Array.from(citySet).sort();
//   }, [data]);

//   useEffect(() => {
//     const hash = location.hash.replace('#', '');
//     if (['taxonomy', 'methodology', 'disclaimers','cite'].includes(hash)) {
//       setViewMode(hash);
//     } else {
//       setViewMode('table');
//     }
//   }, [location.hash]);

//   useEffect(() => {
//     const url = `${import.meta.env.BASE_URL}jait-data.csv?t=${Date.now()}`;
//     fetch(url, { cache: 'no-store' })
//       .then(res => res.text())
//       .then(csvText => {
//         setData(parseCSVData(csvText));
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   // NEW: Read query params on mount and apply filters
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const city = params.get('city');
//     const state = params.get('state');
//     const domain = params.get('domain');

//     const newFilters = {
//       categories: [],
//       domain: [],
//       state: [],
//       city: []
//     };

//     if (city) {
//       newFilters.city = [decodeURIComponent(city)];
//     }
//     if (state) {
//       newFilters.state = [decodeURIComponent(state)];
//     }
//     if (domain) {
//       newFilters.domain = [decodeURIComponent(domain)];
//     }

//     setFilters(newFilters);

//     // Scroll to table on load
//     setTimeout(() => {
//       const tableElement = document.getElementById('database-table');
//       if (tableElement) {
//         tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }
//     }, 100);
//   }, [location.search]);

//   const handleFilterChange = (filterType, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [filterType]: prev[filterType].includes(value)
//         ? prev[filterType].filter(v => v !== value)
//         : [...prev[filterType], value]
//     }));
//   };

//   const filteredData = useMemo(() => {
//     return data.filter(row => {
//       // Filter by state
//       if (filters.state.length > 0 && !filters.state.includes(row.state)) {
//         return false;
//       }

//       // Filter by domain
//       if (filters.domain.length > 0 && !filters.domain.includes(row.domain)) {
//         return false;
//       }

//       // Filter by category
//       if (filters.categories.length > 0) {
//         const rowCategories = row.category ? row.category.split(',').map(c => c.trim()) : [];
//         const hasMatchingCategory = filters.categories.some(cat => rowCategories.includes(cat));
//         if (!hasMatchingCategory) {
//           return false;
//         }
//       }

//       // Filter by city
//       if (filters.city.length > 0 && !filters.city.includes(row.city)) {
//         return false;
//       }

//       return true;
//     });
//   }, [data, filters]);

//   const columns = useMemo(() => [
//     {
//       accessorKey: 'name',
//       header: "Name",
//       cell: info => (
//         <a href={info.row.original.link} target="_blank" rel="noopener noreferrer" 
//            className="text-[#011e41] font-bold hover:underline decoration-[#5f9ae2]">
//           {info.getValue()}
//         </a>
//       ),
//     },
//     { accessorKey: 'city', header: 'City' },
//     { accessorKey: 'state', header: 'State' },
//     {
//       accessorKey: 'domain',
//       header: 'Domain',
//       cell: info => {
//         const domain = info.getValue();
//         if (!domain || domain === 'N/A') return '-';
        
//         const colors = {
//           'Corrections': 'bg-[#d6c07e] text-[#011e41]',
//           'Courts': 'bg-[#665825] text-white',
//           'Law Enforcement': 'bg-[#bb9f4b] text-white'
//         };
        
//         return (
//           <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colors[domain] || 'bg-gray-200 text-gray-700'}`}>
//             {domain}
//           </span>
//         );
//       },
//     },
//     {
//       accessorKey: 'category',
//       header: 'Category',
//       cell: info => {
//         const raw = info.getValue();
//         if (!raw) return '-';
//         const categories = raw.split(',').map(c => c.trim()).filter(Boolean);

//         return (
//           <div className="flex flex-wrap gap-2">
//             {categories.map((cat, i) => (
//               <div
//                 key={i}
//                 className="category-tooltip-trigger relative cursor-help px-2 py-1 bg-[#d4f1f4] border border-[#0097b2] text-[#011e41] text-xs font-medium rounded"
//                 data-tooltip={categoryDefinitions[cat] || "No definition available"}
//               >
//                 {cat}
//               </div>
//             ))}
//           </div>
//         );
//       }
//     },
//     {
//       accessorKey: 'lastUpdated',
//       header: 'Last Searched',
//       cell: info => {
//         const date = info.getValue();
//         if (!date) return '-';
//         const dateObj = new Date(date);
//         return isNaN(dateObj.getTime()) ? date : dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
//       },
//     },
//   ], []);

//   if (loading) return <div className="p-20 text-center font-['Source_Sans_3'] text-xl">Loading database...</div>;

//   return (
//     <div className="flex-1 bg-[#f5f5f0] min-h-[calc(100vh-200px)] font-['Source_Sans_3'] text-[#011e41]">
//       {/* Header */}
//       <div className="max-w-[1400px] mx-auto py-8 px-6 md:px-12">
//         <h1 className="text-3xl font-bold mb-2">JAI-T Database</h1>
//         <p className="text-lg leading-relaxed text-[#333]">
//           The JAI-T is a database that can be used to investigate the varying integrations of artificial intelligence tools within the criminal justice system.
//         </p>
//         <p className="text-lg leading-relaxed text-[#333]">
//           Please review our methodology and disclaimers for details on the criteria and parameters used to identify and include use cases.
//         </p>
//       </div>

//       <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

//       {/* Tabs */}
//       <div className="max-w-[1400px] mx-auto px-6 md:px-12 overflow-x-auto border-b-2 border-[#011e41]">
//         <div className="flex min-w-max">
//           {['table', 'taxonomy', 'methodology', 'disclaimers','cite'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setViewMode(tab)}
//               className={`py-4 px-4 md:px-8 text-lg md:text-xl font-medium transition-all border-b-4 -mb-[2px] capitalize whitespace-nowrap ${
//                 viewMode === tab ? 'text-[#011e41] border-[#0097b2] font-semibold' : 'text-gray-500 border-transparent hover:bg-black/5'
//               }`}
//             >
//               {tab === 'table' ? 'Database' : tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Content Area */}
//       <div className="max-w-[1400px] mx-auto">
//         {viewMode === 'table' ? (
//           <div className="flex flex-col lg:flex-row p-4 md:p-6 gap-6 items-start" id="database-table">
//             <div className="w-full lg:w-[280px]">
//               <FilterSidebar 
//                 filters={filters} 
//                 onFilterChange={handleFilterChange} 
//                 availableStates={availableStates}
//                 availableCities={availableCities}
//               />
//             </div>
//             {/* iPad & Mobile Friendly Wrapper */}
//             <div className="flex-1 overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
//               <div className="min-w-[800px] lg:min-w-0"> 
//                 <DataTable data={filteredData} columns={columns} filters={filters} onDownload={() => setIsModalOpen(true)} />
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="p-6 md:p-12 bg-white m-6 rounded-lg shadow-sm">
//              {viewMode === 'taxonomy' && <Taxonomy />}
//              {viewMode === 'methodology' && <Methodology />}
//              {viewMode === 'disclaimers' && <Disclaimers />}
//              {viewMode === 'cite' && <Cite />}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default JAITDatabase;

import { useState, useMemo, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import DataTable from '../components/DataTable';
import Taxonomy from './Taxonomy';
import Methodology from './Methodology';
import Cite from './Cite';
import DownloadModal from '../components/DownloadModal';
import { parseCSVData } from '../utils/csvParser';
import './JAITDatabase.css';
import Disclaimers from './Disclaimers';

const categoryDefinitions = {
  "Back End Administration": "Supports internal operations (ex: data management, documentation).",
  "Detection": "Identifies objects or events (ex: gunshot detection, license plate recognition).",
  "Forensic Analysis": "Analyzes evidence (ex: images, biometrics).",
  "Front End Support": "Directly interacts with the public (ex: chatbots, online portals).",
  "Prediction": "Forecasts risk, hotspots, recidivism, or resource demands.",
  "Surveillance": "Real-time monitoring, video analysis, or sensor-based tracking.",
  "N/A" : "At the time of search, research assistants found no AI powered tools.",
};

function JAITDatabase() {
  const location = useLocation();
  const [viewMode, setViewMode] = useState('table');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    domain: [],
    state: [],
    city: []
  });

  const availableStates = useMemo(() => {
    const stateSet = new Set();
    data.forEach(row => {
      if (row.state && row.state.trim()) stateSet.add(row.state.trim());
    });
    return Array.from(stateSet).sort();
  }, [data]);

  const availableCities = useMemo(() => {
    const citySet = new Set();
    data.forEach(row => {
      if (row.city && row.city.trim()) citySet.add(row.city.trim());
    });
    return Array.from(citySet).sort();
  }, [data]);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (['taxonomy', 'methodology', 'disclaimers','cite'].includes(hash)) {
      setViewMode(hash);
    } else {
      setViewMode('table');
    }
  }, [location.hash]);

  useEffect(() => {
    const url = `${import.meta.env.BASE_URL}jait-data.csv?t=${Date.now()}`;
    fetch(url, { cache: 'no-store' })
      .then(res => res.text())
      .then(csvText => {
        setData(parseCSVData(csvText));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // NEW: Read query params on mount and apply filters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const city = params.get('city');
    const state = params.get('state');
    const domain = params.get('domain');

    const newFilters = {
      categories: [],
      domain: [],
      state: [],
      city: []
    };

    if (city) {
      newFilters.city = [decodeURIComponent(city)];
    }
    if (state) {
      newFilters.state = [decodeURIComponent(state)];
    }
    if (domain) {
      newFilters.domain = [decodeURIComponent(domain)];
    }

    setFilters(newFilters);

    // Scroll to table on load
    setTimeout(() => {
      const tableElement = document.getElementById('database-table');
      if (tableElement) {
        tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, [location.search]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(v => v !== value)
        : [...prev[filterType], value]
    }));
  };

  const filteredData = useMemo(() => {
    return data.filter(row => {
      // Filter by state
      if (filters.state.length > 0 && !filters.state.includes(row.state)) {
        return false;
      }

      // Filter by domain
      if (filters.domain.length > 0 && !filters.domain.includes(row.domain)) {
        return false;
      }

      // Filter by category
      if (filters.categories.length > 0) {
        const rowCategories = row.category ? row.category.split(',').map(c => c.trim()) : [];
        const hasMatchingCategory = filters.categories.some(cat => rowCategories.includes(cat));
        if (!hasMatchingCategory) {
          return false;
        }
      }

      // Filter by city
      if (filters.city.length > 0 && !filters.city.includes(row.city)) {
        return false;
      }

      return true;
    });
  }, [data, filters]);

  const columns = useMemo(() => [
    {
      accessorKey: 'typeOfAI',
      header: "Name",
      cell: info => (
        <Link
          to={`/jai-t/${info.row.original.id}`}
          className="text-[#011e41] font-bold hover:underline decoration-[#5f9ae2]"
        >
          {info.getValue()}
        </Link>
      ),
    },
    { accessorKey: 'city', header: 'City' },
    { accessorKey: 'state', header: 'State' },
    {
      accessorKey: 'domain',
      header: 'Domain',
      cell: info => {
        const domain = info.getValue();
        if (!domain || domain === 'N/A') return '-';
        
        const colors = {
          'Corrections': 'bg-[#d6c07e] text-[#011e41]',
          'Courts': 'bg-[#665825] text-white',
          'Law Enforcement': 'bg-[#bb9f4b] text-white'
        };
        
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colors[domain] || 'bg-gray-200 text-gray-700'}`}>
            {domain}
          </span>
        );
      },
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: info => {
        const raw = info.getValue();
        if (!raw) return '-';
        const categories = raw.split(',').map(c => c.trim()).filter(Boolean);

        return (
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="category-tooltip-trigger relative cursor-help px-2 py-1 bg-[#d4f1f4] border border-[#0097b2] text-[#011e41] text-xs font-medium rounded"
                data-tooltip={categoryDefinitions[cat] || "No definition available"}
              >
                {cat}
              </div>
            ))}
          </div>
        );
      }
    },
    {
      accessorKey: 'lastUpdated',
      header: 'Last Searched',
      cell: info => {
        const date = info.getValue();
        if (!date) return '-';
        const dateObj = new Date(date);
        return isNaN(dateObj.getTime()) ? date : dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      },
    },
  ], []);

  if (loading) return <div className="p-20 text-center font-['Source_Sans_3'] text-xl">Loading database...</div>;

  return (
    <div className="flex-1 bg-[#f5f5f0] min-h-[calc(100vh-200px)] font-['Source_Sans_3'] text-[#011e41]">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto py-8 px-6 md:px-12">
        <h1 className="text-3xl font-bold mb-2">JAI-T Database</h1>
        <p className="text-lg leading-relaxed text-[#333]">
          The JAI-T is a database that can be used to investigate the varying integrations of artificial intelligence tools within the criminal justice system.
        </p>
        <p className="text-lg leading-relaxed text-[#333]">
          Please review our methodology and disclaimers for details on the criteria and parameters used to identify and include use cases.
        </p>
      </div>

      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Tabs */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 overflow-x-auto border-b-2 border-[#011e41]">
        <div className="flex min-w-max">
          {['table', 'taxonomy', 'methodology', 'disclaimers','cite'].map((tab) => (
            <button
              key={tab}
              onClick={() => setViewMode(tab)}
              className={`py-4 px-4 md:px-8 text-lg md:text-xl font-medium transition-all border-b-4 -mb-[2px] capitalize whitespace-nowrap ${
                viewMode === tab ? 'text-[#011e41] border-[#0097b2] font-semibold' : 'text-gray-500 border-transparent hover:bg-black/5'
              }`}
            >
              {tab === 'table' ? 'Database' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-[1400px] mx-auto">
        {viewMode === 'table' ? (
          <div className="flex flex-col lg:flex-row p-4 md:p-6 gap-6 items-start" id="database-table">
            <div className="w-full lg:w-[280px]">
              <FilterSidebar 
                filters={filters} 
                onFilterChange={handleFilterChange} 
                availableStates={availableStates}
                availableCities={availableCities}
              />
            </div>
            {/* iPad & Mobile Friendly Wrapper */}
            <div className="flex-1 overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="min-w-[800px] lg:min-w-0"> 
                <DataTable data={filteredData} columns={columns} filters={filters} onDownload={() => setIsModalOpen(true)} />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 md:p-12 bg-white m-6 rounded-lg shadow-sm">
             {viewMode === 'taxonomy' && <Taxonomy />}
             {viewMode === 'methodology' && <Methodology />}
             {viewMode === 'disclaimers' && <Disclaimers />}
             {viewMode === 'cite' && <Cite />}
          </div>
        )}
      </div>
    </div>
  );
}

export default JAITDatabase;