import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Papa from 'papaparse';
import './DownloadModal.css';

// Initialize EmailJS here
emailjs.init('TuBuPBcdF9zZd2Haw');

function DownloadModal({ isOpen, onClose, onDownload }) {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization is required';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Use emailjs.sendForm to send the form DOM node
    emailjs.sendForm(
      'service_puyofwf',
      'template_x1yd4mj',
      formRef.current,
      'TuBuPBcdF9zZd2Haw'
    ).then(() => {
      // Send data to Google Sheets via Apps Script Web App
      fetch('https://script.google.com/macros/s/AKfycbxvWB_Kr4-RiSLOOrHQOxsN44Kqd3l4Ft8Pa4BizTdUsn_ab8J4QaT6Tgb6zG23mXB7/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          formType: 'download_csv',
          name: formData.name,
          email: formData.email,
          organization: formData.organization
        }).toString()
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));

      // Fetch the CSV, transform it, and trigger download
      const csvUrl = `${import.meta.env.BASE_URL}jait-data.csv?t=${Date.now()}`;
      fetch(csvUrl)
        .then(res => res.text())
        .then(csvText => {
          const parsed = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) => header.trim(),
          });

          const downloadRows = parsed.data.map(row => {
            const categories = [
              row['Category 1'],
              row['Category 2'],
              row['Category 3']
            ].filter(Boolean).join(', ');

            const name = (row['Name of Tool'] || row['Type of Artificial Intelligence'] || '').trim();

            return {
              Name: name,
              City: row['City'] || '',
              State: row['State'] || '',
              Domain: row['Domain'] || '',
              Category: categories || '',
              Description: (row['Description of Tool in your own words'] || row['Description'] || '').trim(),
              Status: (row['Stage of Deployment  as of X date'] || '').trim(),
              'Last Searched': (row['Last Searched Date'] || '').trim(),
              Link: row['Link 1'] || ''
            };
          }).filter(row => row.Name && row.Name.trim() !== '' && row.Name !== 'N/A');

          const csvOutput = Papa.unparse(downloadRows);
          const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'jai-t_database_download.csv';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        })
        .catch(err => console.error('CSV download error:', err));

      // Reset form
      setFormData({ name: '', email: '', organization: '' });
      setErrors({});
      onClose();
    }, (error) => {
      alert('Failed to send email. Please try again later.');
      console.log(error);
    });
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      organization: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>&times;</button>
        
        <h2 className="modal-title">Retrieve JAI-T Database</h2>
        <p className="modal-description">
          Please provide your contact information to download the database.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="download-form">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email address"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="organization">Organization *</label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className={errors.organization ? 'error' : ''}
              placeholder="Enter your organization"
            />
            {errors.organization && <span className="error-message">{errors.organization}</span>}
          </div>

          <div className="modal-actions">
            <button type="button" onClick={handleClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-download">
              Download CSV
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DownloadModal;