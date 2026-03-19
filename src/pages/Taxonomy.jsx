import React from 'react';

function Taxonomy() {
  return (
    <div className="flex-1 p-6 md:p-12 bg-[#f5f5f0] min-h-[calc(100vh-200px)]">
      <div className="max-w-[1000px] mx-auto mb-12 bg-white p-6 md:p-10 rounded-lg shadow-md text-center">
        <h1 className="font-['Source_Sans_3',sans-serif] text-3xl md:text-4xl font-bold text-[#333] mb-4">
          Taxonomy
        </h1>
        <p className="font-['Source_Sans_3',sans-serif] text-lg md:text-xl text-[#666] mb-0">
          The JAI-T Taxonomy organizes AI tools by their primary function within the criminal justice system, focusing on what each tool does for the specific use in each jurisdiction according to publicly available information.
        </p>
        <p className="font-['Source_Sans_3',sans-serif] text-base md:text-lg text-[#666] mt-5 text-center">
          Most tools are placed in a single category; however, tools that clearly perform multiple distinct functions, as indicated by the article, may appear in more than one category. Classification reflects how the tool is described as being used by that jurisdiction, recognizing that similar tools may be used differently across multiple jurisdictions elsewhere.
        </p>
      </div>

      <div className="w-full flex justify-center items-center mb-8">
        <img
          src="JAI-T Taxonomy.svg"
          alt="Visualization of taxonomy"
          className="max-w-full h-auto block"
        />
      </div>

      <div className="max-w-[900px] mx-auto mt-8 flex flex-col items-center gap-6">
        <div className="bg-white border-2 border-[#333] rounded-lg p-6 md:p-8 w-full shadow-md flex flex-col items-start">
          <div className="flex flex-col items-start sm:flex-row sm:items-center mb-2 gap-3">
            <div className="font-['Source_Sans_3',sans-serif] text-3xl font-bold text-[#333] bg-[#f5f5f0] border-2 border-[#333] rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
              1
            </div>
            <div className="font-['Source_Sans_3',sans-serif] text-2xl font-bold text-[#333]">
              Detection
            </div>
          </div>
          <div className="font-['Source_Sans_3',sans-serif] text-base md:text-lg text-[#333] leading-relaxed">
            Devices and methods identifying specific objects, materials, substances or physical items within an environment, often in real-time, with the use of artificial intelligence.
            <div className="mt-3 text-base md:text-lg text-[#555] italic">
              Examples: identifying weaponry, drugs, explosives, cars, etc.
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-[#333] rounded-lg p-6 md:p-8 w-full shadow-md flex flex-col items-start">
          <div className="flex flex-col items-start sm:flex-row sm:items-center mb-2 gap-3">
            <div className="font-['Source_Sans_3',sans-serif] text-3xl font-bold text-[#333] bg-[#f5f5f0] border-2 border-[#333] rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
              2
            </div>
            <div className="font-['Source_Sans_3',sans-serif] text-2xl font-bold text-[#333]">
              Surveillance
            </div>
          </div>
          <div className="font-['Source_Sans_3',sans-serif] text-base md:text-lg text-[#333] leading-relaxed">
            Collecting data and conducting ongoing, systematic observation and monitoring of people, actions and/or activities with the use of artificial intelligence. Surveillance tools gather intelligence on personal characteristics and behavior, such as speech, movement, features, engagement, biometrics, and physical interactions amongst groups and/or individuals. <strong>Note: </strong>Surveillance tools are distinguished by their ongoing monitoring of individuals over time, rather than one-time detection tied to a specific incident or object.
            <div className="mt-3 text-base md:text-lg text-[#555] italic">
              Examples: facial recognition, social media tracking, or phone call monitoring
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-[#333] rounded-lg p-6 md:p-8 w-full shadow-md flex flex-col items-start">
          <div className="flex flex-col items-start sm:flex-row sm:items-center mb-2 gap-3">
            <div className="font-['Source_Sans_3',sans-serif] text-3xl font-bold text-[#333] bg-[#f5f5f0] border-2 border-[#333] rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
              3
            </div>
            <div className="font-['Source_Sans_3',sans-serif] text-2xl font-bold text-[#333]">
              Prediction
            </div>
          </div>
          <div className="font-['Source_Sans_3',sans-serif] text-base md:text-lg text-[#333] leading-relaxed">
            Forecasting the likelihood that a person will commit a criminal offense or the location of criminal activity using artificial intelligence. This often entails analyzing past and present data to predict future behaviors or events.
            <div className="mt-3 text-base md:text-lg text-[#555] italic">
              Examples: identifying crime hot spots or predicting an officer's behavior in the field
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-[#333] rounded-lg p-6 md:p-8 w-full shadow-md flex flex-col items-start">
          <div className="flex flex-col items-start sm:flex-row sm:items-center mb-2 gap-3">
            <div className="font-['Source_Sans_3',sans-serif] text-3xl font-bold text-[#333] bg-[#f5f5f0] border-2 border-[#333] rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
              4
            </div>
            <div className="font-['Source_Sans_3',sans-serif] text-2xl font-bold text-[#333]">
              Forensic Analysis
            </div>
          </div>
          <div className="font-['Source_Sans_3',sans-serif] text-base md:text-lg text-[#333] leading-relaxed">
            Analyzing both digital and physical evidence as it relates to investigating a specific criminal incident with artificial intelligence.
            <div className="mt-3 text-base md:text-lg text-[#555] italic">
              Examples: AI used in DNA analysis
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-[#333] rounded-lg p-6 md:p-8 w-full shadow-md flex flex-col items-start">
          <div className="flex flex-col items-start sm:flex-row sm:items-center mb-2 gap-3">
            <div className="font-['Source_Sans_3',sans-serif] text-3xl font-bold text-[#333] bg-[#f5f5f0] border-2 border-[#333] rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
              5
            </div>
            <div className="font-['Source_Sans_3',sans-serif] text-2xl font-bold text-[#333]">
              Back-End Administration
            </div>
          </div>
          <div className="font-['Source_Sans_3',sans-serif] text-base md:text-lg text-[#333] leading-relaxed">
            Conducting administrative responsibilities and tasks with artificial intelligence that may impact internal functions or management operations regarding processes, time, labor, or other resources.
            <div className="mt-3 text-base md:text-lg text-[#555] italic">
              Examples: AI tools for drafting crime reports, organizing documentation, or virtual reality training
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-[#333] rounded-lg p-6 md:p-8 w-full shadow-md flex flex-col items-start">
          <div className="flex flex-col items-start sm:flex-row sm:items-center mb-2 gap-3">
            <div className="font-['Source_Sans_3',sans-serif] text-3xl font-bold text-[#333] bg-[#f5f5f0] border-2 border-[#333] rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
              6
            </div>
            <div className="font-['Source_Sans_3',sans-serif] text-2xl font-bold text-[#333]">
              Front-End Support
            </div>
          </div>
          <div className="font-['Source_Sans_3',sans-serif] text-base md:text-lg text-[#333] leading-relaxed">
            Interfacing with the public to assist them with their individual matters related to navigating the criminal justice system, often using artificial intelligence to act as a personal aid to the user.
            <div className="mt-3 text-base md:text-lg text-[#555] italic">
              Examples: jury chatbots, language translation or notifying clients
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto">
        <div className="bg-transparent p-0 rounded-none shadow-none mb-8"></div>
      </div>
    </div>
  );
}

export default Taxonomy;