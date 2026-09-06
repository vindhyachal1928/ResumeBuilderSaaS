function MinimalTemplate({ resume }) {
  return (
    <div className="resume-page w-full max-w-[794px] min-h-[1123px] mx-auto bg-white shadow-xl px-10 py-10 md:px-14 md:py-12">

      {/* Header */}
      <header className="pb-6 border-b border-gray-300">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-wide">
          {resume.fullName}
        </h1>

        {resume.jobTitle && (
          <p className="mt-1 text-sm font-medium text-gray-500">
            {resume.jobTitle}
          </p>
        )}

        {/* Contact Information */}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
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
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">

            {resume.linkedin && (
              <a
                href={resume.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 hover:underline"
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
                  className="text-gray-600 hover:text-gray-900 hover:underline"
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
                  className="text-gray-600 hover:text-gray-900 hover:underline"
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
        <section className="mt-6">
          <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-[0.15em]">
            Professional Summary
          </h2>

          <p className="mt-2 text-sm text-gray-600 leading-6 whitespace-pre-line">
            {resume.summary}
          </p>
        </section>
      )}

      {/* Education */}
      {resume.education && (
        <section className="mt-6">
          <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-[0.15em]">
            Education
          </h2>

          <div className="mt-2 text-sm text-gray-600 leading-6 whitespace-pre-line">
            {resume.education}
          </div>
        </section>
      )}

      {/* Skills */}
      {resume.skills && (
        <section className="mt-6">
          <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-[0.15em]">
            Skills
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {resume.skills.split(",").map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-md"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {resume.projects && (
        <section className="mt-6">
          <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-[0.15em]">
            Projects
          </h2>

          <div className="mt-3 text-sm text-gray-600 leading-7 whitespace-pre-line">
            {resume.projects}
          </div>
        </section>
      )}

      {/* Experience */}
      {/* Experience */}
      {resume.experience && (
        <section className="mt-6">
          <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-[0.15em]">
            Experience
          </h2>

          <div className="mt-3 text-sm text-gray-600 leading-7 whitespace-pre-line">
            {resume.experience}
          </div>
        </section>
      )}

      {/* Certifications */}
      {resume.certificates && (
        <section className="mt-6">
          <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-[0.15em]">
            Certifications
          </h2>

          <div className="mt-2 text-sm text-gray-600 leading-6 whitespace-pre-line">
            {resume.certificates}
          </div>
        </section>
      )}
    </div>
  );
}

export default MinimalTemplate;