import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { parseCSVData } from '../utils/csvParser';
import './EntryDetail.css';

// ── Category image map ────────────────────────────────────────────────────────
const CATEGORY_IMAGES = {
  'Detection':               '/category-icons/detection.png',
  'Surveillance':            '/category-icons/surveillance.png',
  'Prediction':              '/category-icons/prediction.png',
  'Forensic Analysis':       '/category-icons/forensicanalysis.png',
  'Front End Support':       '/category-icons/frontend.png',
  'Back End Administration': '/category-icons/backend.png',
};

function getCategoryImage(categoryString) {
  if (!categoryString || categoryString.trim() === '') return null;
  const first = categoryString.split(',')[0].trim();
  return CATEGORY_IMAGES[first] || null;
}

// ── Domain image map ──────────────────────────────────────────────────────────
const DOMAIN_IMAGES = {
  'Law Enforcement': '/domain-icons/LawEnforcement_Icon2.svg',
  'Courts':          '/domain-icons/Courts_Icon2.svg',
  'Corrections':     '/domain-icons/Corrections_Icon2.svg',
};

function getUseIcon(orgUse) {
  if (!orgUse) return null;
  return orgUse.toLowerCase().includes('organizational')
    ? '/domain-icons/organizational-use.svg'
    : '/domain-icons/individual-use.svg';
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

  // Collect all source links
  const sourceLinks = [entry.link, entry.link2, entry.link3, entry.link4]
    .filter(l => l && l.trim() !== '');

  const domain = entry.domain || '';
  const statusLower = entry.status?.toLowerCase() || '';
  const statusClass = statusLower === 'active' ? 'ed-status-active'
    : statusLower === 'inactive' ? 'ed-status-inactive'
    : 'ed-status-unsure';
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
          <span className="ed-header-title">{entry.typeOfAI || entry.name || 'Entry Detail'}</span>
          <span className="ed-header-location">
            {[entry.city, entry.state].filter(Boolean).join(', ')}
          </span>
        </div>

        {/* ── Body: two columns ── */}
        <div className="ed-body">

          {/* LEFT: image → tool name → vendor */}
          <div className="ed-left">
            <div className="ed-image-box">
              {categoryImage ? (
                <img src={categoryImage} alt={entry.category} className="ed-category-img" />
              ) : (
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

            <p className="ed-tool-name">{entry.nameOfTool || entry.name}</p>
            <p className="ed-by">by</p>

            {entry.vendor && entry.vendor.trim() !== '' && entry.vendor !== 'N/A' ? (
              <span className="ed-vendor-pill">{entry.vendor}</span>
            ) : (
              <span className="ed-vendor-pill ed-vendor-unknown">Unknown</span>
            )}

            {/* Category */}
            {entry.category && entry.category !== 'N/A' && (
              <div className="ed-meta-block">
                <span className="ed-meta-label">Category</span>
                <span className="ed-meta-value">{entry.category}</span>
              </div>
            )}

            {/* Domain */}
            {entry.domain && entry.domain !== 'N/A' && (
              <div className="ed-meta-block">
                <span className="ed-meta-label">Domain</span>
                <span className="ed-meta-value">{entry.domain}</span>
              </div>
            )}

            {/* Use */}
            {entry.orgUse && entry.orgUse.trim() !== '' && (
              <div className="ed-meta-block">
                <span className="ed-meta-label">Use</span>
                <span className="ed-meta-value">{entry.orgUse}</span>
              </div>
            )}

          </div>

          {/* RIGHT: badges → description → meta → citations → footer */}
          <div className="ed-right">

            {/* Domain icons + use icon + status badge */}
            <div className="ed-badges-row">
              {['Law Enforcement', 'Courts', 'Corrections'].map(d =>
                domain.includes(d) && DOMAIN_IMAGES[d] ? (
                  <img key={d} src={DOMAIN_IMAGES[d]} alt={d} title={d} className="ed-domain-icon" />
                ) : null
              )}
              {entry.orgUse && entry.orgUse.trim() !== '' && (
                <img src={getUseIcon(entry.orgUse)} alt={entry.orgUse} title={entry.orgUse} className="ed-domain-icon" />
              )}
              {entry.status && entry.status.trim() !== '' && (
                <span className={`ed-status-badge ${statusClass}`}>
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

            {/* Last Updated — above the line */}
            {entry.lastUpdated && (
              <p className="ed-last-updated">Last Updated {entry.lastUpdated}</p>
            )}

            {/* Footer: citations + source links — below the line */}
            <div className="ed-footer-row">
              {sourceLinks.length > 0 && (
                <div className="ed-sources">
                  <span className="ed-sources-label">Sources</span>
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
              {entry.citations && entry.citations.length > 0 && (
                <div className="ed-citations">
                  <h4 className="ed-citations-label">Citations</h4>
                  <ol className="ed-citations-list">
                    {entry.citations.map((cite, i) => (
                      <li key={i} className="ed-citation-item">{cite}</li>
                    ))}
                  </ol>
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
