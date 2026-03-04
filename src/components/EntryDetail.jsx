// // import { useState, useEffect } from 'react';
// // import { useParams, Link } from 'react-router-dom';
// // import { parseCSVData } from '../utils/csvParser';
// // import './EntryDetail.css';

// // function EntryDetail() {
// //   const { id } = useParams();
// //   const [entry, setEntry] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const url = `${import.meta.env.BASE_URL}jait-data.csv?t=${Date.now()}`;
// //     fetch(url, { cache: 'no-store' })
// //       .then(res => res.text())
// //       .then(csvText => {
// //         const data = parseCSVData(csvText);
// //         const found = data.find(row => String(row.id) === String(id));
// //         if (found) {
// //           setEntry(found);
// //         } else {
// //           console.error('Entry not found. Available IDs:', data.map(r => r.id));
// //           setError(`Entry with ID ${id} not found`);
// //         }
// //         setLoading(false);
// //       })
// //       .catch(err => {
// //         setError(err.message);
// //         setLoading(false);
// //       });
// //   }, [id]);

// //   if (loading) return <div className="p-20 text-center">Loading...</div>;
// //   if (error) return <div className="p-20 text-center text-red-600">Error: {error}</div>;
// //   if (!entry) return <div className="p-20 text-center">Entry not found</div>;

// //   return (
// //     <div className="entry-detail bg-[#f5f5f0] min-h-[calc(100vh-200px)] py-12 px-6">
// //       <div className="max-w-[900px] mx-auto bg-white rounded-lg shadow-md p-8">
// //         <Link to="/jai-t" className="text-[#0097b2] hover:underline mb-6 inline-block">
// //           ← Back to Database
// //         </Link>

// //         <h1 className="text-4xl font-bold text-[#011e41] mb-2">{entry.name || 'Entry Detail'}</h1>
// //         {entry.vendor && <p className="text-lg text-gray-600 mb-6">{entry.vendor}</p>}

// //         <div className="grid grid-cols-2 gap-6 mb-8">
// //           <div>
// //             <h3 className="font-bold text-[#011e41] mb-2">City</h3>
// //             <p>{entry.city || 'N/A'}</p>
// //           </div>
// //           <div>
// //             <h3 className="font-bold text-[#011e41] mb-2">State</h3>
// //             <p>{entry.state || 'N/A'}</p>
// //           </div>
// //           <div>
// //             <h3 className="font-bold text-[#011e41] mb-2">Domain</h3>
// //             <p>{entry.domain || 'N/A'}</p>
// //           </div>
// //           <div>
// //             <h3 className="font-bold text-[#011e41] mb-2">Category</h3>
// //             <p>{entry.category || 'N/A'}</p>
// //           </div>
// //         </div>

// //         <div className="mb-8">
// //           <h3 className="font-bold text-[#011e41] mb-2">Type of AI</h3>
// //           <p>{entry.typeOfAI || 'N/A'}</p>
// //         </div>

// //         <div className="mb-8">
// //           <h3 className="font-bold text-[#011e41] mb-2">Description</h3>
// //           <p>{entry.description || 'No description available'}</p>
// //         </div>

// //         <div className="mb-8">
// //           <h3 className="font-bold text-[#011e41] mb-2">Primary Link</h3>
// //           {entry.link ? (
// //             <a href={entry.link} target="_blank" rel="noopener noreferrer" className="text-[#0097b2] hover:underline break-all">
// //               {entry.link}
// //             </a>
// //           ) : (
// //             <p>No link available</p>
// //           )}
// //         </div>

// //         {entry.otherLinks && (
// //           <div className="mb-8">
// //             <h3 className="font-bold text-[#011e41] mb-2">Other Links</h3>
// //             <p>{entry.otherLinks}</p>
// //           </div>
// //         )}

// //         <div className="mb-8">
// //           <h3 className="font-bold text-[#011e41] mb-2">Last Updated</h3>
// //           <p>{entry.lastUpdated || 'N/A'}</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default EntryDetail;
// import { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { parseCSVData } from '../utils/csvParser';
// import './EntryDetail.css';

// function EntryDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [entry, setEntry] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const url = `${import.meta.env.BASE_URL}jait-data.csv?t=${Date.now()}`;
//     fetch(url, { cache: 'no-store' })
//       .then(res => res.text())
//       .then(csvText => {
//         const data = parseCSVData(csvText);
//         const found = data.find(row => String(row.id) === String(id));
//         if (found) {
//           setEntry(found);
//         } else {
//           setError(`Entry with ID "${id}" not found`);
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return (
//     <div className="ed-loading">
//       <div className="ed-spinner" />
//       <p>Loading...</p>
//     </div>
//   );
//   if (error) return (
//     <div className="ed-loading">
//       <p className="ed-error">Error: {error}</p>
//       <Link to="/jai-t" className="ed-back-link">← Back to Database</Link>
//     </div>
//   );
//   if (!entry) return null;

//   // Parse additional source links — supports link, link2, link3 CSV columns
//   // OR a comma-separated "links" column as fallback
//   const sourceLinks = [];
//   if (entry.link  && entry.link.trim())  sourceLinks.push(entry.link.trim());
//   if (entry.link2 && entry.link2.trim()) sourceLinks.push(entry.link2.trim());
//   if (entry.link3 && entry.link3.trim()) sourceLinks.push(entry.link3.trim());
//   if (sourceLinks.length === 0 && entry.links) {
//     entry.links.split(',').map(l => l.trim()).filter(Boolean).forEach(l => sourceLinks.push(l));
//   }

//   const domain = entry.domain || '';
//   const showLawEnforcement = domain.includes('Law Enforcement');
//   const showCourts = domain.includes('Courts');
//   const showCorrections = domain.includes('Corrections');
//   const isActive = entry.status?.toLowerCase() === 'active';

//   return (
//     <div className="ed-wrapper">

//       {/* Back link — above the card */}
//       <div className="ed-back-row">
//         <button onClick={() => navigate(-1)} className="ed-back-link">
//           ← Back to Database
//         </button>
//       </div>

//       {/* ── CARD ── */}
//       <div className="ed-card">

//         {/* Header bar: tool name left, city/state right */}
//         <div className="ed-header">
//           <span className="ed-header-title">{entry.name || 'Entry Detail'}</span>
//           <span className="ed-header-location">
//             {[entry.city, entry.state].filter(Boolean).join(', ')}
//           </span>
//         </div>

//         {/* Card body */}
//         <div className="ed-body">

//           {/* ── LEFT column ── */}
//           <div className="ed-left">

//             {/* Square teal image box */}
//             <div className="ed-image-box">
//               {entry.imageUrl && entry.imageUrl.trim() !== '' ? (
//                 <img src={entry.imageUrl} alt={entry.name} className="ed-image" />
//               ) : (
//                 /* Placeholder — magnifier + warning triangle matching mockup */
//                 <svg viewBox="0 0 100 100" fill="none" className="ed-placeholder-svg"
//                      stroke="white" strokeWidth="3">
//                   <circle cx="42" cy="42" r="26" strokeWidth="3.5" />
//                   <line x1="61" y1="61" x2="83" y2="83" strokeWidth="5" strokeLinecap="round" />
//                   <circle cx="42" cy="42" r="12" strokeDasharray="5 4" />
//                   {/* crosshair ticks */}
//                   <path d="M42 20v6M42 58v6M20 42h6M58 42h6" strokeLinecap="round" strokeWidth="3" />
//                   {/* warning triangle */}
//                   <path d="M42 32l-9 16h18l-9-16z" fill="white" stroke="none" opacity="0.9" />
//                   <path d="M42 38v5" stroke="#3dbdd4" strokeWidth="2" strokeLinecap="round" />
//                   <circle cx="42" cy="45.5" r="1" fill="#3dbdd4" />
//                 </svg>
//               )}
//             </div>

//             {/* Tool name + vendor */}
//             <p className="ed-tool-name">{entry.name}</p>
//             <p className="ed-by">by</p>
//             {entry.vendor && entry.vendor.trim() !== '' ? (
//               entry.vendorUrl && entry.vendorUrl.trim() !== '' ? (
//                 <a href={entry.vendorUrl} target="_blank" rel="noopener noreferrer"
//                    className="ed-vendor-pill">
//                   {entry.vendor}
//                 </a>
//               ) : (
//                 <span className="ed-vendor-pill">{entry.vendor}</span>
//               )
//             ) : (
//               <span className="ed-vendor-pill ed-vendor-unknown">Unknown</span>
//             )}

//           </div>

//           {/* ── RIGHT column ── */}
//           <div className="ed-right">

//             {/* Domain icons + status badge */}
//             <div className="ed-badges-row">
//               {showLawEnforcement && (
//                 <div className="ed-domain-circle ed-domain-gold" title="Law Enforcement">
//                   {/* Badge/shield icon */}
//                   <svg viewBox="0 0 36 36" fill="currentColor" width="22" height="22">
//                     <path d="M18 2L4 8v10c0 8.3 5.9 16 14 18 8.1-2 14-9.7 14-18V8L18 2zm0 3.2l11 4.9V18c0 6.6-4.7 12.8-11 14.8C11.7 30.8 7 24.6 7 18V10.1l11-4.9z"/>
//                     <path d="M18 11l2.3 4.6H26l-3.8 3 1.3 5L18 21l-5.5 2.6 1.3-5L10 15.6h5.7L18 11z"/>
//                   </svg>
//                 </div>
//               )}
//               {showCourts && (
//                 <div className="ed-domain-circle ed-domain-blue" title="Courts">
//                   {/* Person/user outline icon */}
//                   <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
//                     <circle cx="18" cy="13" r="5" />
//                     <path d="M6 30c0-6.6 5.4-12 12-12s12 5.4 12 12" strokeLinecap="round"/>
//                   </svg>
//                 </div>
//               )}
//               {showCorrections && (
//                 <div className="ed-domain-circle ed-domain-corrections" title="Corrections">
//                   <svg viewBox="0 0 36 36" fill="currentColor" width="22" height="22">
//                     <path d="M18 3C13.0 3 9 7.0 9 12v2H6v19h24V14h-3v-2c0-5.0-4.0-9-9-9zm0 3c3.3 0 6 2.7 6 6v2H12v-2c0-3.3 2.7-6 6-6zm0 13a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
//                   </svg>
//                 </div>
//               )}
//               {/* Status badge */}
//               {entry.status && entry.status.trim() !== '' && (
//                 <span className={`ed-status-badge ${isActive ? 'ed-status-active' : 'ed-status-inactive'}`}>
//                   {entry.status}
//                 </span>
//               )}
//             </div>

//             {/* Description — serif, large */}
//             <p className="ed-description">
//               {entry.description && entry.description.trim() !== ''
//                 ? entry.description
//                 : 'No description available.'}
//             </p>

//             {/* Footer row: last updated + source links */}
//             <div className="ed-footer-row">
//               {entry.lastUpdated && (
//                 <p className="ed-last-updated">Last Updated {entry.lastUpdated}</p>
//               )}
//               {sourceLinks.length > 0 && (
//                 <div className="ed-sources">
//                   <span className="ed-sources-label">Additional sources</span>
//                   <div className="ed-source-links">
//                     {sourceLinks.map((href, i) => (
//                       <a key={i} href={href} target="_blank" rel="noopener noreferrer"
//                          className="ed-source-pill">
//                         Link {i + 1}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EntryDetail;
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { parseCSVData } from '../utils/csvParser';
import './EntryDetail.css';

// ── Category image map ────────────────────────────────────────────────────────
// Keys must match exactly what appears in your CSV "category" column.
// Place these 6 PNGs in /public/category-icons/ in your Vite project.
const CATEGORY_IMAGES = {
  'Detection':               '/category-icons/detection.png',
  'Surveillance':            '/category-icons/surveillance.png',
  'Prediction':              '/category-icons/prediction.png',
  'Forensic Analysis':       '/category-icons/forensicanalysis.png',
  'Front End Support':       '/category-icons/frontend.png',
  'Back End Administration': '/category-icons/backend.png',
};

// Returns the image path for the FIRST category listed in the CSV cell.
// e.g. "Detection, Surveillance" → detection.png
function getCategoryImage(categoryString) {
  if (!categoryString || categoryString.trim() === '') return null;
  const first = categoryString.split(',')[0].trim();
  return CATEGORY_IMAGES[first] || null;
}

// ── Domain SVG icons ──────────────────────────────────────────────────────────
function ShieldIcon() {
  return (
    <svg viewBox="0 0 36 36" fill="currentColor" width="22" height="22">
      <path d="M18 2L4 8v10c0 8.3 5.9 16 14 18 8.1-2 14-9.7 14-18V8L18 2zm0 3.2l11 4.9V18c0 6.6-4.7 12.8-11 14.8C11.7 30.8 7 24.6 7 18V10.1l11-4.9z"/>
      <path d="M18 11l2.3 4.6H26l-3.8 3 1.3 5L18 21l-5.5 2.6 1.3-5L10 15.6h5.7L18 11z"/>
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
      <circle cx="18" cy="13" r="5" />
      <path d="M6 30c0-6.6 5.4-12 12-12s12 5.4 12 12" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 36 36" fill="currentColor" width="22" height="22">
      <path d="M18 3C13 3 9 7 9 12v2H6v19h24V14h-3v-2c0-5-4-9-9-9zm0 3c3.3 0 6 2.7 6 6v2H12v-2c0-3.3 2.7-6 6-6zm0 13a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
function EntryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `${import.meta.env.BASE_URL}jait-data.csv?t=${Date.now()}`;
    fetch(url, { cache: 'no-store' })
      .then(res => res.text())
      .then(csvText => {
        const data = parseCSVData(csvText);
        const found = data.find(row => String(row.id) === String(id));
        if (found) setEntry(found);
        else setError(`Entry with ID "${id}" not found`);
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div className="ed-loading">
      <div className="ed-spinner" />
      <p>Loading...</p>
    </div>
  );
  if (error) return (
    <div className="ed-loading">
      <p className="ed-error">Error: {error}</p>
      <Link to="/jai-t" className="ed-back-link">← Back to Database</Link>
    </div>
  );
  if (!entry) return null;

  // Source links from CSV columns: link, link2, link3
  const sourceLinks = [entry.link, entry.link2, entry.link3]
    .filter(l => l && l.trim() !== '');

  // Fallback: comma-separated "links" column
  if (sourceLinks.length === 0 && entry.links) {
    entry.links.split(',').map(l => l.trim()).filter(Boolean).forEach(l => sourceLinks.push(l));
  }

  const domain = entry.domain || '';
  const isActive = entry.status?.toLowerCase() === 'active';
  const categoryImage = getCategoryImage(entry.category);

  return (
    <div className="ed-wrapper">

      <div className="ed-back-row">
        <button onClick={() => navigate(-1)} className="ed-back-link">
          ← Back to Database
        </button>
      </div>

      <div className="ed-card">

        {/* ── Header bar ── */}
        <div className="ed-header">
          <span className="ed-header-title">{entry.name || 'Entry Detail'}</span>
          <span className="ed-header-location">
            {[entry.city, entry.state].filter(Boolean).join(', ')}
          </span>
        </div>

        {/* ── Body: two columns ── */}
        <div className="ed-body">

          {/* LEFT: image box → tool name → by → vendor pill */}
          <div className="ed-left">
            <div className="ed-image-box">
              {categoryImage ? (
                <img
                  src={categoryImage}
                  alt={entry.category}
                  className="ed-category-img"
                />
              ) : (
                // Generic fallback placeholder SVG
                <svg viewBox="0 0 100 100" fill="none" className="ed-placeholder-svg"
                     stroke="white" strokeWidth="3">
                  <circle cx="42" cy="42" r="26" strokeWidth="3.5" />
                  <line x1="61" y1="61" x2="83" y2="83" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="42" cy="42" r="12" strokeDasharray="5 4" />
                  <path d="M42 20v6M42 58v6M20 42h6M58 42h6" strokeLinecap="round" strokeWidth="3" />
                  <path d="M42 32l-9 16h18l-9-16z" fill="white" stroke="none" opacity="0.9" />
                  <path d="M42 38v5" stroke="#3dbdd4" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="42" cy="45.5" r="1" fill="#3dbdd4" />
                </svg>
              )}
            </div>

            <p className="ed-tool-name">{entry.name}</p>
            <p className="ed-by">by</p>

            {entry.vendor && entry.vendor.trim() !== '' ? (
              entry.vendorUrl && entry.vendorUrl.trim() !== '' ? (
                <a href={entry.vendorUrl} target="_blank" rel="noopener noreferrer"
                   className="ed-vendor-pill">
                  {entry.vendor}
                </a>
              ) : (
                <span className="ed-vendor-pill">{entry.vendor}</span>
              )
            ) : (
              <span className="ed-vendor-pill ed-vendor-unknown">Unknown</span>
            )}
          </div>

          {/* RIGHT: domain badges → description → footer */}
          <div className="ed-right">

            {/* Domain circles + status badge */}
            <div className="ed-badges-row">
              {domain.includes('Law Enforcement') && (
                <div className="ed-domain-circle ed-domain-gold" title="Law Enforcement">
                  <ShieldIcon />
                </div>
              )}
              {domain.includes('Courts') && (
                <div className="ed-domain-circle ed-domain-blue" title="Courts">
                  <PersonIcon />
                </div>
              )}
              {domain.includes('Corrections') && (
                <div className="ed-domain-circle ed-domain-corrections" title="Corrections">
                  <LockIcon />
                </div>
              )}
              {entry.status && entry.status.trim() !== '' && (
                <span className={`ed-status-badge ${isActive ? 'ed-status-active' : 'ed-status-inactive'}`}>
                  {entry.status}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="ed-description">
              {entry.description && entry.description.trim() !== ''
                ? entry.description
                : 'No description available.'}
            </p>

            {/* Footer: last updated + source links */}
            <div className="ed-footer-row">
              {entry.lastUpdated && (
                <p className="ed-last-updated">Last Updated {entry.lastUpdated}</p>
              )}
              {sourceLinks.length > 0 && (
                <div className="ed-sources">
                  <span className="ed-sources-label">Additional sources</span>
                  <div className="ed-source-links">
                    {sourceLinks.map((href, i) => (
                      <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                         className="ed-source-pill">
                        Link {i + 1}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default EntryDetail;

/*
──────────────────────────────────────────────────────────────────────────────
SETUP: place the 6 PNG files in your Vite project at:
  /public/category-icons/detection.png
  /public/category-icons/surveillance.png
  /public/category-icons/prediction.png
  /public/category-icons/forensicanalysis.png
  /public/category-icons/frontend.png
  /public/category-icons/backend.png

Vite serves /public/ as the root, so these will be accessible at:
  https://yoursite.com/category-icons/detection.png

If you use a BASE_URL (e.g. GitHub Pages subfolder), prefix with:
  `${import.meta.env.BASE_URL}category-icons/detection.png`
and update CATEGORY_IMAGES accordingly.
──────────────────────────────────────────────────────────────────────────────
*/



