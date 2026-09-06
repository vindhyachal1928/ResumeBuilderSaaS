function ProfessionalTemplate({ resume }) {
  return (
    <div className="resume-page w-full max-w-[794px] min-h-[1123px] mx-auto bg-white shadow-xl px-10 py-10 md:px-14 md:py-12">

      {/* Header */}
      <header className="text-center pb-5 border-b border-gray-700">
        <h1 className="text-4xl font-bold text-gray-900 tracking-wide">
          {resume.fullName}
        </h1>

        {resume.jobTitle && (
          <p className="mt-1 text-base font-medium text-gray-600">
            {resume.jobTitle}
          </p>
        )}

        {/* Contact Information */}
        <div className="mt-3 flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-sm text-gray-600">
          {resume.email && <span>{resume.email}</span>}

          {resume.phone && (
            <>
              <span>•</span>
              <span>{resume.phone}</span>
            </>
          )}

          {resume.location && (
            <>
              <span>•</span>
              <span>{resume.location}</span>
            </>
          )}
        </div>

        {/* Social Links */}
        {(resume.linkedin || resume.github || resume.portfolio) && (
          <div className="mt-2 flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-sm">

            {resume.linkedin && (
              <a
                href={resume.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 hover:underline"
              >
                LinkedIn
              </a>
            )}

            {resume.github && (
              <>
                {resume.linkedin && <span>•</span>}

                <a
                  href={resume.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900 hover:underline"
                >
                  GitHub
                </a>
              </>
            )}

            {resume.portfolio && (
              <>
                {(resume.linkedin || resume.github) && <span>•</span>}

                <a
                  href={resume.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900 hover:underline"
                >
                  Portfolio
                </a>
              </>
            )}
          </div>
        )}
      </header>

      {/* Professional Summary */}
      {resume.summary && (
        <section className="mt-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1">
            Professional Summary
          </h2>

          <p className="mt-2 text-sm text-gray-700 leading-6 whitespace-pre-line">
            {resume.summary}
          </p>
        </section>
      )}

      {/* Education */}
      {resume.education && (
        <section className="mt-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1">
            Education
          </h2>

          <div className="mt-2 text-sm text-gray-700 leading-6 whitespace-pre-line">
            {resume.education}
          </div>
        </section>
      )}

      {/* Skills */}
      {resume.skills && (
        <section className="mt-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1">
            Skills
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {resume.skills.split(",").map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded-md"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {resume.projects && (
        <section className="mt-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1">
            Projects
          </h2>

          <div className="mt-3 text-sm text-gray-700 leading-7 whitespace-pre-line">
            {resume.projects}
          </div>
        </section>
      )}

      {/* Experience */}
      {resume.experience && (
        <section className="mt-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1">
            Experience
          </h2>

          <div className="mt-3 text-sm text-gray-700 leading-7 whitespace-pre-line">
            {resume.experience}
          </div>
        </section>
      )}

      {/* Certifications */}
      {resume.certificates && (
        <section className="mt-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1">
            Certifications
          </h2>

          <div className="mt-2 text-sm text-gray-700 leading-6 whitespace-pre-line">
            {resume.certificates}
          </div>
        </section>
      )}

    </div>
  );
}

export default ProfessionalTemplate;