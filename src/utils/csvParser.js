import Papa from 'papaparse';

export const parseCSVData = (csvText) => {
  const results = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header, index) => {
      const trimmed = header.trim();
      // Handle empty headers by giving them a unique name
      if (!trimmed) {
        return `_empty_${index}`;
      }
      return trimmed;
    },
  });

  if (!results.data || results.data.length === 0) {
    console.warn('No data found in CSV');
    return [];
  }

  // Suppress duplicate header warnings - empty columns are handled by transformHeader

  return results.data.map((row, index) => {
    // Combine categories (Category 1, Category 2, Category 3)
    const categories = [
      row['Category 1'],
      row['Category 2'],
      row['Category 3']
    ].filter(Boolean).join(', ');

    // Get technology name from "Type of Artificial Intelligence"
    const technologyName = (row['Type of Artificial Intelligence'] || row['Type of Artificial Intelligence '] || '').trim();

    // Get domain - prioritize the Domain column, but also check the sector columns
    let domain = row['Domain'] || '';
    if (!domain || domain.trim() === '') {
      // Check if it's in Courts, Law Enforcement, or Corrections
      if (row['Courts'] === '1' || row['Courts'] === 1 || row['Courts'] === '1.0') domain = 'Courts';
      else if (row['Law Enforcement'] === '1' || row['Law Enforcement'] === 1 || row['Law Enforcement'] === '1.0') domain = 'Law Enforcement';
      else if (row['Corrections'] === '1' || row['Corrections'] === 1 || row['Corrections'] === '1.0') domain = 'Corrections';
    }

    // Create description from available data
    const vendor = row['Vendor or Name of Tech (if applicable)'] || '';
    const description = vendor 
      ? `${technologyName}${vendor ? ` - ${vendor}` : ''}`
      : technologyName;

    // Parse last updated date
    let lastUpdated = row['Last Updated Per City'] || '';
    if (lastUpdated) {
      // Convert MM/DD/YYYY to YYYY-MM-DD format
      const dateParts = lastUpdated.split('/');
      if (dateParts.length === 3) {
        const month = dateParts[0].padStart(2, '0');
        const day = dateParts[1].padStart(2, '0');
        const year = dateParts[2];
        lastUpdated = `${year}-${month}-${day}`;
      }
    }

    return {
      id: String(index),
      name: technologyName,
      state: row['State'] || '',
      city: row['City'] || '',
      domain: domain || 'N/A',
      category: categories || 'N/A',
      description: description,
      lastUpdated: lastUpdated,
      link: row['Link'] || '',
      otherLinks: row['Other Links'] || '',
      vendor: vendor,
      typeOfAI: technologyName,
    };
  }).filter(row => {
    // Only filter out rows that are completely empty or have no technology name
    // Allow "N/A" as a valid value since some entries might legitimately have this
    return row.name && row.name.trim() !== '';
  });
};

