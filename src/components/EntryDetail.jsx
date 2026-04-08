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

const SITE_NAMES = {
  'cnn.com': 'CNN',
  'foxnews.com': 'Fox News',
  'fox5ny.com': 'FOX 5 NY',
  'fox5atlanta.com': 'FOX 5 Atlanta',
  'msnbc.com': 'MSNBC',
  'nbcnews.com': 'NBC News',
  'abc7.com': 'ABC7',
  'cbsnews.com': 'CBS News',
  'nytimes.com': 'The New York Times',
  'washingtonpost.com': 'The Washington Post',
  'theguardian.com': 'The Guardian',
  'npr.org': 'NPR',
  'apnews.com': 'AP News',
  'reuters.com': 'Reuters',
  'bbc.com': 'BBC',
  'bbc.co.uk': 'BBC',
  'politico.com': 'Politico',
  'thehill.com': 'The Hill',
  'axios.com': 'Axios',
  'propublica.org': 'ProPublica',
  'wired.com': 'Wired',
  'techcrunch.com': 'TechCrunch',
  'thedailybeast.com': 'The Daily Beast',
  'vice.com': 'VICE',
  'theintercept.com': 'The Intercept',
  'motherjones.com': 'Mother Jones',
  'slate.com': 'Slate',
  'vox.com': 'Vox',
  'buzzfeednews.com': 'BuzzFeed News',
  'buzzfeed.com': 'BuzzFeed',
  'statescoop.com': 'StateScoop',
  'govtech.com': 'Government Technology',
  'fedscoop.com': 'FedScoop',
  'nextgov.com': 'Nextgov',
  'brennancenter.org': 'Brennan Center',
  'aclu.org': 'ACLU',
  'nyclu.org': 'NYCLU',
  'eff.org': 'EFF',
  'aclum.org': 'ACLU of MA',
  'vera.org': 'Vera Institute',
  'sentencingproject.org': 'The Sentencing Project',
  'hrw.org': 'Human Rights Watch',
  'amnesty.org': 'Amnesty International',
  'civilrights.org': 'The Leadership Conference',
  'colorofchange.org': 'Color of Change',
  'law.cornell.edu': 'Cornell Law',
  'oyez.org': 'Oyez',
  'scotusblog.com': 'SCOTUSblog',
  'policingproject.org': 'The Policing Project',
  'policinginstitute.org': 'Police Foundation',
  'pewtrusts.org': 'Pew Trusts',
  'urban.org': 'Urban Institute',
  'brookings.edu': 'Brookings',
  'rand.org': 'RAND',
  'pewresearch.org': 'Pew Research',
  'nij.ojp.gov': 'NIJ',
  'ojp.gov': 'OJP',
  'bja.gov': 'BJA',
  'justice.gov': 'DOJ',
  'fbi.gov': 'FBI',
  'dhs.gov': 'DHS',
  'nytimes.com': 'NY Times',
  'nypost.com': 'NY Post',
  'nydailynews.com': 'NY Daily News',
  'gothamist.com': 'Gothamist',
  'cityandstateny.com': 'City & State NY',
  'thecity.nyc': 'THE CITY',
  'news12.com': 'News 12',
  'nbcchicago.com': 'NBC Chicago',
  'chicagotribune.com': 'Chicago Tribune',
  'suntimes.com': 'Chicago Sun-Times',
  'latimes.com': 'LA Times',
  'sfchronicle.com': 'SF Chronicle',
  'dallasnews.com': 'Dallas Morning News',
  'houstonchronicle.com': 'Houston Chronicle',
  'miamiherald.com': 'Miami Herald',
  'tampabay.com': 'Tampa Bay Times',
  'orlandosentinel.com': 'Orlando Sentinel',
  'ajc.com': 'Atlanta Journal-Constitution',
  'bostonglobe.com': 'Boston Globe',
  'baltimoresun.com': 'Baltimore Sun',
  'philly.com': 'Philadelphia Inquirer',
  'inquirer.com': 'Philadelphia Inquirer',
  'seattletimes.com': 'Seattle Times',
  'oregonlive.com': 'The Oregonian',
  'denverpost.com': 'Denver Post',
  'azcentral.com': 'Arizona Republic',
  'startribune.com': 'Star Tribune',
  'freep.com': 'Detroit Free Press',
  'clevelandplaindealer.com': 'Cleveland Plain Dealer',
  'dispatch.com': 'Columbus Dispatch',
  'cincinnati.com': 'Cincinnati Enquirer',
  'indystar.com': 'Indianapolis Star',
  'courier-journal.com': 'Courier Journal',
  'nola.com': 'The Times-Picayune',
  'theadvocate.com': 'The Advocate',
  'knoxnews.com': 'Knoxville News Sentinel',
  'tennessean.com': 'The Tennessean',
  'commercialappeal.com': 'The Commercial Appeal',
  'spotlightpa.org': 'Spotlight PA',
  'kqed.org': 'KQED',
  'whyy.org': 'WHYY',
  'wbez.org': 'WBEZ',
  'wamu.org': 'WAMU',
  'static1.squarespace.com': 'Report (PDF)',
  'squarespace.com': 'Report (PDF)',
  'docs.google.com': 'Google Doc',
  'drive.google.com': 'Google Drive',
  'github.com': 'GitHub',
  'medium.com': 'Medium',
  'substack.com': 'Substack',
  'wordpress.com': 'WordPress',
};

function getLinkLabel(href) {
  try {
    const host = new URL(href).hostname.replace(/^www\./, '');
    if (SITE_NAMES[host]) return SITE_NAMES[host];
    // check subdomains against map (e.g. bronx.news12.com → news12.com)
    const parts = host.split('.');
    for (let i = 1; i < parts.length - 1; i++) {
      const sub = parts.slice(i).join('.');
      if (SITE_NAMES[sub]) return SITE_NAMES[sub];
    }
    // fallback: capitalize the second-to-last segment
    const name = parts.length >= 2 ? parts[parts.length - 2] : parts[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return 'Source';
  }
}

function getCategoryImage(categoryString) {
  if (!categoryString || categoryString.trim() === '') return null;
  const first = categoryString.split(',')[0].trim();
  return CATEGORY_IMAGES[first] || null;
}

// ── Domain image map ──────────────────────────────────────────────────────────
const DOMAIN_IMAGES = {
  'Law Enforcement': '/domain-icons/lawenforcement-icon.png',
  'Courts':          '/domain-icons/courts-icon.png',
  'Corrections':     '/domain-icons/corrections-icon.png',
};

function getUseIcon(orgUse) {
  if (!orgUse) return null;
  return orgUse.toLowerCase().includes('organizational')
    ? '/domain-icons/organizationaluse-icon.png'
    : '/domain-icons/individualuse-icon.png';
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
              entry.vendorLink && entry.vendorLink.trim() !== '' ? (
                <a href={entry.vendorLink} target="_blank" rel="noopener noreferrer"
                   className="ed-vendor-pill ed-vendor-link">
                  {entry.vendor}
                </a>
              ) : (
                <span className="ed-vendor-pill">{entry.vendor}</span>
              )
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
                        {getLinkLabel(href)}
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
