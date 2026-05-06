import InteractiveMap from './InteractiveMap';

function Home() {
  return (
    <div className="flex-1 bg-[#f5f5f0] px-4 sm:px-6 py-10">
      <div className="mx-auto max-w-7xl flex flex-col gap-8">

        {/* Page Title */}
        <h1
          className="
            text-center font-bold text-gray-800
            text-[clamp(1.25rem,3.5vw,2.1rem)]
            leading-tight
            break-words
          "
        >
          Classifying real-world deployments of AI in the criminal justice system.
        </h1>

        {/* Interactive Map */}
        <div className="w-full max-w-7xl mx-auto">
          <InteractiveMap />
        </div>

        {/* Description */}
        <div className="max-w-5xl mx-auto text-gray-800 text-[1.05rem] leading-relaxed space-y-3">
          <p>
            The <strong>Justice and Artificial Intelligence Tracker (JAI-T)</strong> is a centralized resource that documents use cases of AI-driven technologies within the criminal justice system. Developed by the{" "}
            <a
              href="https://evidenceforjustice.georgetown.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600"
            >
              Evidence for Justice Lab at Georgetown University
            </a>,
            JAI-T tracks how law enforcement agencies, court systems, and correctional institutions are exploring and applying AI tools—from facial recognition to public-facing chatbots.
          </p>

          <p>
            JAI-T promotes transparency, enhances public understanding, and spotlights real-world justice technology deployments.
          </p>
          <div className="max-w-5xl mx-auto text-gray-800 text-[1.05rem] leading-relaxed space-y-3">
            <p>This is the <strong>January 2026 version </strong>of the JAI-T Tracker. Updates with new use cases and expanded details will be released over time - so stay tuned!</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
