import Papa from 'papaparse';

export const parseCSVData = (csvText) => {
  const results = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  if (!results.data || results.data.length === 0) {
    console.warn('No data found in CSV');
    return [];
  }

  return results.data.map((row, index) => {
    const categories = [
      row['Category 1'],
      row['Category 2'],
      row['Category 3'],
    ].filter(Boolean).join(', ');

    // New CSV has "Name of Tool"; fall back to "Type of Artificial Intelligence"
    const nameOfTool = (row['Name of Tool'] || '').trim();
    const typeOfAI   = (row['Type of Artificial Intelligence'] || '').trim();
    const name       = nameOfTool || typeOfAI;

    const vendor = (row['Vendor or Name of Tech (if applicable)'] || '').trim();
    const vendorLink = (row['Vendor Link'] || '').trim();

    // Actual description column from new CSV (header contains a newline)
    const description = (
      row['Description of Tool in your own words\n(1-2 sentences)'] ||
      row['Description'] ||
      ''
    ).trim();

    // Stage of Deployment → status
    const status = (row['Stage of Deployment'] || '').trim();

    const orgUse = (row['Individual vs. Organizational Use'] || '').trim();

    // Domain
    let domain = (row['Domain'] || '').trim();
    if (!domain) {
      if (row['Courts'] === '1' || row['Courts'] === 1) domain = 'Courts';
      else if (row['Law Enforcement'] === '1' || row['Law Enforcement'] === 1) domain = 'Law Enforcement';
      else if (row['Corrections'] === '1' || row['Corrections'] === 1) domain = 'Corrections';
    }

    // Links
    const link  = (row['Link']   || '').trim();
    const link2 = (row['Link 2'] || '').trim();
    const link3 = (row['Link 3'] || '').trim();
    const link4 = (row['Link 4'] || '').trim();

    // Citations
    const citation1 = (row['Citation 1'] || '').trim();
    const citation2 = (row['Citation 2'] || '').trim();
    const citation3 = (row['Citation 3'] || '').trim();
    const citation4 = (row['Citation 4'] || '').trim();
    const citations = [citation1, citation2, citation3, citation4].filter(Boolean);

    // Dates
    const lastSearched = (row['Last Searched Date'] || '').trim();
    const lastUpdated  = (row['Found Details OR Last Searched Date'] || row['Last Updated Per City'] || '').trim();

    const criminalJustice = (row['Criminal Justice or Safety-related?'] || '').trim();
    const uniqueCases     = (row['Unique Cases'] || '').trim();
    const newOrOldRAs     = (row['New or Old RAs?'] || '').trim();

    return {
      id: String(index),
      name,
      nameOfTool,
      typeOfAI,
      vendor,
      vendorLink,
      description,
      status,
      orgUse,
      city:   (row['City']  || '').trim(),
      state:  (row['State'] || '').trim(),
      domain: domain || 'N/A',
      category: categories || 'N/A',
      link,
      link2,
      link3,
      link4,
      citations,
      lastSearched,
      lastUpdated,
      criminalJustice,
      uniqueCases,
      newOrOldRAs,
    };
  }).filter(row => row.name && row.name.trim() !== '' && row.name !== 'N/A');
};
