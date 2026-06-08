import './News.css';

function News() {
  const newsItems = [
    {
      imageSource: 'University of Chicago Library',
      source: 'University of Chicago Library',
      title: "D\u2019Angelo Law Library Emerging Technologies Update",
      date: 'February 27, 2026',
      description:
        "JAI-T is featured on the University of Chicago\u2019s D\u2019Angelo Law Library website as a resource for researchers, students, and practitioners interested in AI technologies being used or tested in the criminal justice system.",
      link: 'https://www.lib.uchicago.edu/about/news/february-2026-dangelo-law-library-emerging-technologies-update/',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/University_of_Chicago%2C_Harper_Library.jpg'
    },
    {
      imageSource: 'StateScoop',
      source: 'by Sophia Fox-Sowell',
      title: "New \u2018Justice AI Tracker\u2019 watches how police, courts are using AI",
      date: 'January 30, 2026',
      description:
        'A direct feature on JAI-T that frames the tracker as a transparency tool for following how artificial intelligence is being deployed across the justice system.',
      link: 'https://statescoop.com/justice-ai-tracker-police-courts-corrections-ai/',
      imageUrl: 'https://statescoop.com/wp-content/uploads/sites/6/2026/01/GettyImages-2254732804.jpg',
      imagePosition: 'center 22%'
    },
    {
      imageSource: 'Bloomberg Center for Cities at Harvard University',
      source: 'Data-Smart City Solutions',
      title: 'The Promise and Peril of AI in Criminal Justice Systems',
      date: 'April 22, 2026',
      description:
        'Listen to Dr. Andrea Headley, Faculty Director of the Evidence for Justice Lab at Georgetown University, and Dr. Stephen Goldsmith, professor of urban policy at the Bloomberg Center for Cities at Harvard University, discuss the promise and peril of AI in the justice system on the Data-Smart City Pod.',
      link: 'https://datasmart.hks.harvard.edu/promise-peril-justice-ai',
      imageUrl: 'https://datasmart.hks.harvard.edu/sites/g/files/omnuum10826/files/styles/hwp_16_9__960x540/public/datasmart/files/podcast_microphone.jpg'
    },
    {
      imageSource: 'Bloomberg Center for Cities at Harvard University',
      source: 'Data-Smart City Solutions',
      title: 'How Can Data and Analytics Be Used to Enhance City Operations?',
      date: 'January 27, 2026',
      description:
        'Data-Smart City Solutions, housed at the Bloomberg Center for Cities at Harvard University, maintains "A Catalog of Civic Data Use Cases," an ongoing, regularly updated resource documenting how cities have used data and analytics to enhance municipal operations. The catalog covers areas ranging from public safety to infrastructure, and includes the Justice and AI Tracker (JAI-T) as an example of how residents can monitor AI use in policing and public safety.',
      link: 'https://datasmart.hks.harvard.edu/how-can-data-and-analytics-be-used-to-enhance-city-operations-723',
      imageUrl: 'https://datasmart.hks.harvard.edu/sites/g/files/omnuum10826/files/styles/hwp_16_9__960x540/public/2026-04/AdobeStock_536328162.jpg'
    }
  ];

  const sortedNewsItems = [...newsItems].sort(
    (firstItem, secondItem) => new Date(secondItem.date) - new Date(firstItem.date)
  );

  return (
    <div className="news-container">
      <div className="news-content">
        <h1 className="news-title">JAI-T Database In The News</h1>
        <p className="news-description">
         Explore these recent articles to see how JAI-T is being referenced in conversations about transparency, public understanding, and the overall justice AI landscape.
        </p>

        <div className="news-grid">
          {sortedNewsItems.map((item) => (
            <a
              key={item.link}
              href={item.link}
              className="news-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="news-image-wrapper">
                <img 
                  src={item.imageUrl} 
                  alt={item.imageSource}
                  className="news-image"
                  style={{ objectPosition: item.imagePosition ?? 'center center' }}
                />
                <span className="news-image-source">{item.imageSource ?? item.source}</span>
              </div>
              <div className="news-card-content">
                <h3 className="news-card-title">{item.title}</h3>
                <p className="news-card-source">{item.source}</p>
                <p className="news-card-date">{item.date}</p>
                <p className="news-card-description">{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;
