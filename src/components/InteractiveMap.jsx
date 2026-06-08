import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, useMap } from 'react-leaflet';
import Papa from 'papaparse';
import 'leaflet/dist/leaflet.css';

const CATEGORY_COLORS = {
  'detection':        '#3b82f6',
  'surveillance':     '#ec4899',
  'prediction':       '#f97316',
  'forensic analysis':'#22c55e',
  'back-end admin':   '#8b5cf6',
  'front-end support':'#92400e',
};
const DEFAULT_COLOR = '#6b7280';

const CATEGORIES = [
  'detection', 'surveillance', 'prediction',
  'forensic analysis', 'back-end admin', 'front-end support',
];
const DOMAINS = ['corrections', 'courts', 'law enforcement'];

const CITY_COORDS = {
  'Albuquerque':      [35.0844, -106.6504],
  'Anaheim':          [33.8366, -117.9143],
  'Anchorage':        [61.2181, -149.9003],
  'Arlington':        [32.7357,  -97.1081],
  'Atlanta':          [33.7490,  -84.3880],
  'Aurora':           [39.7294, -104.8319],
  'Austin':           [30.2672,  -97.7431],
  'Bakersfield':      [35.3733, -119.0187],
  'Baltimore':        [39.2904,  -76.6122],
  'Boise':            [43.6150, -116.2023],
  'Boston':           [42.3601,  -71.0589],
  'Buffalo':          [42.8864,  -78.8784],
  'Cape Coral':       [26.5629,  -81.9495],
  'Chandler':         [33.3062, -111.8413],
  'Charlotte':        [35.2271,  -80.8431],
  'Chesapeake':       [36.7682,  -76.2875],
  'Chicago':          [41.8781,  -87.6298],
  'Chula Vista':      [32.6401, -117.0842],
  'Cincinnati':       [39.1031,  -84.5120],
  'Cleveland':        [41.4993,  -81.6944],
  'Colorado Springs': [38.8339, -104.8214],
  'Columbus':         [39.9612,  -82.9988],
  'Corpus Christi':   [27.8006,  -97.3964],
  'Dallas':           [32.7767,  -96.7970],
  'Denver':           [39.7392, -104.9903],
  'Detroit':          [42.3314,  -83.0458],
  'Durham':           [35.9940,  -78.8986],
  'El Paso':          [31.7619, -106.4850],
  'Fort Wayne':       [41.0793,  -85.1394],
  'Fort Worth':       [32.7555,  -97.3308],
  'Fresno':           [36.7378, -119.7871],
  'Frisco':           [33.1507,  -96.8236],
  'Garland':          [32.9126,  -96.6389],
  'Gilbert':          [33.3528, -111.7890],
  'Glendale':         [33.5387, -112.1860],
  'Greensboro':       [36.0726,  -79.7920],
  'Henderson':        [36.0395, -114.9817],
  'Hialeah':          [25.8576,  -80.2781],
  'Honolulu':         [21.3069, -157.8583],
  'Houston':          [29.7604,  -95.3698],
  'Indianapolis':     [39.7684,  -86.1581],
  'Irvine':           [33.6846, -117.8265],
  'Irving':           [32.8140,  -96.9489],
  'Jacksonville':     [30.3322,  -81.6557],
  'Jersey City':      [40.7178,  -74.0431],
  'Kansas City':      [39.0997,  -94.5786],
  'Laredo':           [27.5306,  -99.4803],
  'Las Vegas':        [36.1699, -115.1398],
  'Lexington':        [38.0406,  -84.5037],
  'Lincoln':          [40.8136,  -96.7026],
  'Long Beach':       [33.7701, -118.1937],
  'Los Angeles':      [34.0522, -118.2437],
  'Louisville':       [38.2527,  -85.7585],
  'Lubbock':          [33.5779, -101.8552],
  'Madison':          [43.0731,  -89.4012],
  'Memphis':          [35.1495,  -90.0490],
  'Mesa':             [33.4152, -111.8315],
  'Miami':            [25.7617,  -80.1918],
  'Milwaukee':        [43.0389,  -87.9065],
  'Minneapolis':      [44.9778,  -93.2650],
  'Nashville':        [36.1627,  -86.7816],
  'New Orleans':      [29.9511,  -90.0715],
  'New York City':    [40.7128,  -74.0060],
  'Newark':           [40.7357,  -74.1724],
  'Norfolk':          [36.8508,  -76.2859],
  'North Las Vegas':  [36.1989, -115.1175],
  'Oakland':          [37.8044, -122.2712],
  'Oklahoma City':    [35.4676,  -97.5164],
  'Omaha':            [41.2565,  -95.9345],
  'Orlando':          [28.5383,  -81.3792],
  'Philadelphia':     [39.9526,  -75.1652],
  'Phoenix':          [33.4484, -112.0740],
  'Pittsburgh':       [40.4406,  -79.9959],
  'Plano':            [33.0198,  -96.6989],
  'Port St. Lucie':   [27.2730,  -80.3582],
  'Portland':         [45.5051, -122.6750],
  'Raleigh':          [35.7796,  -78.6382],
  'Reno':             [39.5296, -119.8138],
  'Richmond':         [37.5407,  -77.4360],
  'Riverside':        [33.9533, -117.3962],
  'Sacramento':       [38.5816, -121.4944],
  'San Antonio':      [29.4241,  -98.4936],
  'San Diego':        [32.7157, -117.1611],
  'San Francisco':    [37.7749, -122.4194],
  'San Jose':         [37.3382, -121.8863],
  'Santa Ana':        [33.7455, -117.8677],
  'Scottsdale':       [33.4942, -111.9261],
  'Seattle':          [47.6062, -122.3321],
  'St. Louis':        [38.6270,  -90.1994],
  'St. Paul':         [44.9537,  -93.0900],
  'St. Petersburg':   [27.7676,  -82.6403],
  'Stockton':         [37.9577, -121.2908],
  'Tampa':            [27.9506,  -82.4572],
  'Toledo':           [41.6639,  -83.5552],
  'Tucson':           [32.2226, -110.9747],
  'Tulsa':            [36.1540,  -95.9928],
  'Virginia Beach':   [36.8529,  -75.9780],
  'Washington DC':    [38.9072,  -77.0369],
  'Wichita':          [37.6872,  -97.3301],
  'Winston-Salem':    [36.0999,  -80.2442],
};

const US_BOUNDS = [[24.4, -125.0], [49.5, -66.9]];

function getCategoryColor(cat) {
  return CATEGORY_COLORS[cat?.toLowerCase()] || DEFAULT_COLOR;
}

function getDominantCategory(tools) {
  const counts = {};
  tools.forEach(t => {
    const c = t.category1?.toLowerCase();
    if (c) counts[c] = (counts[c] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}

function getRadius(count) {
  return Math.max(6, Math.min(22, 5 + count * 1.4));
}

function toTitleCase(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}

function FitUS() {
  const map = useMap();
  useEffect(() => { map.fitBounds(US_BOUNDS); }, [map]);
  return null;
}

export default function InteractiveMap() {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    fetch('/jait-data.csv')
      .then(r => r.text())
      .then(text => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          transformHeader: h => h.trim().replace(/\s+/g, ' '),
          complete: ({ data }) => {
            const rows = data
              .filter(r => r.City?.trim() && r.State?.trim())
              .map(r => ({
                city:        r.City.trim(),
                state:       r.State.trim(),
                category1:   r['Category 1']?.trim().toLowerCase() || '',
                category2:   r['Category 2']?.trim().toLowerCase() || '',
                category3:   r['Category 3']?.trim().toLowerCase() || '',
                domain:      r.Domain?.trim().toLowerCase() || '',
                stage:       r['Stage of Deployment as of X date']?.trim().toLowerCase() || '',
                toolName:    r['Name of Tool']?.trim() || '',
                vendor:      r['Vendor or Name of Tech (if applicable)']?.trim() || '',
                description: r['Description of Tool in your own words (1-2 sentences)']?.trim() || '',
              }))
              .filter(r => CITY_COORDS[r.city]);
            setAllData(rows);
            setLoading(false);
          },
        });
      });
  }, []);

  const filteredData = useMemo(() => {
    let rows = allData;
    if (selectedCategories.length > 0) {
      rows = rows.filter(r =>
        selectedCategories.some(c =>
          r.category1 === c || r.category2 === c || r.category3 === c
        )
      );
    }
    if (selectedDomains.length > 0) {
      rows = rows.filter(r => selectedDomains.includes(r.domain));
    }
    return rows;
  }, [allData, selectedCategories, selectedDomains]);

  const cityGroups = useMemo(() => {
    const map = {};
    filteredData.forEach(r => {
      if (!map[r.city]) {
        const [lat, lng] = CITY_COORDS[r.city];
        map[r.city] = { city: r.city, state: r.state, lat, lng, tools: [] };
      }
      map[r.city].tools.push(r);
    });
    return Object.values(map);
  }, [filteredData]);

  const stats = useMemo(() => {
    const active = filteredData.filter(r => r.stage === 'active').length;
    const domains = new Set(filteredData.map(r => r.domain).filter(Boolean));
    return { cities: cityGroups.length, tools: filteredData.length, active, domains: domains.size };
  }, [filteredData, cityGroups]);

  function toggleCategory(cat) {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
    setSelectedCity(null);
  }

  function toggleDomain(domain) {
    setSelectedDomains(prev =>
      prev.includes(domain) ? prev.filter(d => d !== domain) : [...prev, domain]
    );
    setSelectedCity(null);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[800px] text-gray-500 text-lg">
        Loading map data…
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[800px] bg-white font-sans rounded-xl border border-gray-200 shadow-sm overflow-hidden">

      {/* Stats bar */}
      <div className="flex justify-center gap-16 px-6 py-5 border-b border-gray-200">
        <Stat value={stats.cities} label="City Count" />
        <Stat value={stats.tools} label="Application Count" />
      </div>

      {/* Filter bar */}
      <div className="flex flex-col gap-1 px-6 py-2 border-b border-gray-100 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-500 font-semibold">Category:</span>
          <FilterPill
            label="All"
            active={selectedCategories.length === 0}
            color="#6b7280"
            onClick={() => { setSelectedCategories([]); setSelectedCity(null); }}
          />
          {CATEGORIES.map(cat => (
            <FilterPill
              key={cat}
              label={toTitleCase(cat)}
              active={selectedCategories.includes(cat)}
              color={CATEGORY_COLORS[cat]}
              onClick={() => toggleCategory(cat)}
            />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-500 font-semibold">Domain:</span>
          <FilterPill
            label="All"
            active={selectedDomains.length === 0}
            color="#6b7280"
            onClick={() => { setSelectedDomains([]); setSelectedCity(null); }}
          />
          {DOMAINS.map(d => (
            <FilterPill
              key={d}
              label={toTitleCase(d)}
              active={selectedDomains.includes(d)}
              color="#0d9488"
              onClick={() => toggleDomain(d)}
            />
          ))}
        </div>
      </div>

      {/* Map + side panel */}
      <div className="flex flex-1 overflow-hidden">

        {/* Map */}
        <div className="relative flex-1">
          <MapContainer
            bounds={US_BOUNDS}
            style={{ height: '100%', width: '100%' }}
            zoomControl={true}
            maxBounds={[[17, -170], [72, -52]]}
            maxBoundsViscosity={1.0}
            minZoom={4}
          >
            <FitUS />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> &copy; <a href="https://carto.com">CARTO</a>'
            />
            {cityGroups.map(city => {
              const dominant = getDominantCategory(city.tools);
              const color = getCategoryColor(dominant);
              const radius = getRadius(city.tools.length);
              const isSelected = selectedCity?.city === city.city;
              return (
                <CircleMarker
                  key={city.city}
                  center={[city.lat, city.lng]}
                  radius={radius}
                  pathOptions={{
                    color: isSelected ? '#1e293b' : 'white',
                    weight: isSelected ? 2.5 : 1.5,
                    fillColor: color,
                    fillOpacity: 0.85,
                  }}
                  eventHandlers={{ click: () => setSelectedCity(city) }}
                />
              );
            })}
          </MapContainer>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 rounded-lg px-3 py-2 text-xs shadow-md z-[1000] pointer-events-none">
            <div className="text-gray-400 mb-1.5">Dot size = number of tools &nbsp;|&nbsp; Color:</div>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {CATEGORIES.map(cat => (
                <span key={cat} className="flex items-center gap-1 text-gray-600">
                  <span className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: CATEGORY_COLORS[cat] }} />
                  {toTitleCase(cat)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* City detail panel */}
        {selectedCity && (
          <div className="w-80 border-l border-gray-200 flex flex-col bg-white flex-shrink-0 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-start flex-shrink-0">
              <div>
                <h2 className="font-bold text-gray-800">{selectedCity.city}, {selectedCity.state}</h2>
                <div className="text-xs text-gray-500 mt-0.5">Total Tools: {selectedCity.tools.length}</div>
              </div>
              <button
                onClick={() => setSelectedCity(null)}
                className="text-gray-400 hover:text-gray-700 text-xl leading-none ml-2 flex-shrink-0"
              >×</button>
            </div>
            <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
              {selectedCity.tools.map((tool, i) => (
                <div key={i} className="px-4 py-3">
                  <div className="font-semibold text-gray-800 text-sm leading-snug">
                    {tool.toolName || 'Unnamed Tool'}
                  </div>
                  {tool.vendor && (
                    <div className="text-xs text-gray-400 mt-0.5">{tool.vendor}</div>
                  )}
                  {tool.description && (
                    <div className="text-xs text-gray-600 mt-1.5 leading-relaxed">{tool.description}</div>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {[tool.category1, tool.category2, tool.category3].filter(Boolean).map(cat => (
                      <span
                        key={cat}
                        className="text-xs px-1.5 py-0.5 rounded-full text-white font-medium"
                        style={{ background: getCategoryColor(cat) }}
                      >
                        {cat.toUpperCase()}
                      </span>
                    ))}
                    {tool.domain && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-teal-50 text-teal-700 font-medium border border-teal-200">
                        {tool.domain.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                      tool.stage === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {(tool.stage || 'unknown').toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold" style={{ color: '#0097b2' }}>{value}</div>
      <div className="text-sm text-gray-500 mt-1 font-medium">{label}</div>
    </div>
  );
}

function FilterPill({ label, active, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 rounded-full border text-xs font-medium transition-all"
      style={
        active
          ? { background: color, borderColor: color, color: 'white' }
          : { background: 'white', borderColor: '#d1d5db', color: '#4b5563' }
      }
    >
      {label}
    </button>
  );
}
