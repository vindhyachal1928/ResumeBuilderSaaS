function ModernTemplate({ resume }) {
  return (
    <div className="resume-page w-full max-w-[794px] min-h-[1123px] mx-auto bg-white shadow-xl px-10 py-10 md:px-14 md:py-12">

      {/* ================= HEADER ================= */}
      <header className="pb-6 border-b-2 border-gray-800">

        {/* Name */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          {resume.fullName}
        </h1>

        {/* Professional Title */}
        {resume.jobTitle && (
          <p className="mt-1 text-base font-medium text-gray-500 tracking-wide">
            {resume.jobTitle}
          </p>
        )}

        {/* Contact Information */}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600">

          {resume.email && (
            <span>
              {resume.email}
            </span>
          )}

          {resume.phone && (
            <>
              <span>•</span>

              <span>
                {resume.phone}
              </span>
            </>
          )}

          {resume.location && (
            <>
              <span>•</span>

              <span>
                {resume.location}
              </span>
            </>
          )}

        </div>

        {/* Social Links */}
        {(resume.linkedin ||
          resume.github ||
          resume.portfolio) && (
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">

            {resume.linkedin && (
              <a
                href={resume.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
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
                  className="text-blue-700 hover:underline"
                >
                  GitHub
                </a>
              </>
            )}

            {resume.portfolio && (
              <>
                {(resume.linkedin || resume.github) && (
                  <span>•</span>
                )}

                <a
                  href={resume.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  Portfolio
                </a>
              </>
            )}

          </div>
        )}

      </header>

      {/* ================= SUMMARY ================= */}
      {resume.summary && (
        <section className="mt-6">

          <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wider border-b border-blue-200 pb-1">
            Professional Summary
          </h2>

          <p className="mt-3 text-sm text-gray-700 leading-6 whitespace-pre-line">
            {resume.summary}
          </p>

        </section>
      )}

      {/* ================= EDUCATION ================= */}
      {resume.education && (
        <section className="mt-6">

          <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wider border-b border-blue-200 pb-1">
            Education
          </h2>

          <div className="mt-3 text-sm text-gray-700 leading-6 whitespace-pre-line">
            {resume.education}
          </div>

        </section>
      )}

      {/* ================= SKILLS ================= */}
      {resume.skills && (
        <section className="mt-6">

          <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wider border-b border-blue-200 pb-1">
            Skills
          </h2>

          <div className="mt-3 text-sm text-gray-700 leading-6">

            {resume.skills
              .split(",")
              .map((skill, index) => (
                <span key={index}>
                  {skill.trim()}

                  {index <
                    resume.skills.split(",").length - 1 &&
                    "  •  "}
                </span>
              ))}

          </div>

        </section>
      )}

      {/* ================= EXPERIENCE ================= */}
      {resume.experience && (
        <section className="mt-6">

          <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wider border-b border-blue-200 pb-1">
            Experience
          </h2>

          <div className="mt-3 text-sm text-gray-700 leading-6 whitespace-pre-line">
            {resume.experience}
          </div>

        </section>
      )}

      {/* ================= PROJECTS ================= */}
      {resume.projects && (
        <section className="mt-6">

          <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wider border-b border-blue-200 pb-1">
            Projects
          </h2>

          <div className="mt-3 text-sm text-gray-700 leading-6 whitespace-pre-line">
            {resume.projects}
          </div>

        </section>
      )}

      {/* ================= CERTIFICATIONS ================= */}
      {resume.certificates && (
        <section className="mt-6">

          <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wider border-b border-blue-200 pb-1">
            Certifications
          </h2>

          <div className="mt-3 text-sm text-gray-700 leading-6 whitespace-pre-line">
            {resume.certificates}
          </div>

        </section>
      )}

    </div>
  );
}

export default ModernTemplate;