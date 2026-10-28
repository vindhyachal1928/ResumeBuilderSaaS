function Template1({ resume }) {
  const parseArray = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;

    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const formatBullets = (content) => {
    if (!content) return [];

    return String(content)
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => line.replace(/^[-•*]\s*/, ""));
  };

  const getSafeUrl = (url) => {
    if (!url || !String(url).trim()) return "#";

    const value = String(url).trim();

    return value.startsWith("http://") || value.startsWith("https://")
      ? value
      : `https://${value}`;
  };

  const skills = resume.skills
    ? String(resume.skills)
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  const experienceEntries = parseArray(resume.experience);
  const projectEntries = parseArray(resume.projects);
  const educationEntries = parseArray(resume.education).filter((education) =>
    Object.values(education || {}).some(
      (value) => String(value ?? "").trim() !== ""
    )
  );

  return (
    <div
      id="resume-template"
      className="bg-white text-gray-900 w-[794px] min-h-[1123px] mx-auto px-10 py-6 shadow-lg font-sans"
    >
      {/* HEADER */}
      <header className="text-center">
        <h1 className="text-[24px] font-bold leading-tight">
          {resume.fullName || "Your Name"}
        </h1>

        {(resume.email ||
          resume.phone ||
          resume.linkedin ||
          resume.github ||
          resume.portfolio) && (
          <div className="mt-1.5 text-[11px] leading-5 text-gray-800">
            {resume.phone && <span>{resume.phone}</span>}

            {resume.phone && resume.email && <span> · </span>}

            {resume.email && <span>{resume.email}</span>}

            {(resume.linkedin ||
              resume.github ||
              resume.portfolio) && (
              <>
                <br />

                {resume.linkedin && (
                  <a
                    href={getSafeUrl(resume.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    LinkedIn
                  </a>
                )}

                {resume.linkedin && resume.github && <span> · </span>}

                {resume.github && (
                  <a
                    href={getSafeUrl(resume.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    GitHub
                  </a>
                )}

                {(resume.linkedin || resume.github) &&
                  resume.portfolio && <span> · </span>}

                {resume.portfolio && (
                  <a
                    href={getSafeUrl(resume.portfolio)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Portfolio
                  </a>
                )}
              </>
            )}
          </div>
        )}
      </header>

      {/* PROFESSIONAL SUMMARY */}
      {resume.summary && (
        <section className="mt-4">
          <h2 className="text-[12px] font-bold uppercase tracking-wide border-b border-gray-500 pb-1">
            Professional Summary
          </h2>

          <p className="mt-1.5 text-[10.5px] leading-[1.4] text-gray-800 text-justify">
            {resume.summary}
          </p>
        </section>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <section className="mt-3">
          <h2 className="text-[12px] font-bold uppercase tracking-wide border-b border-gray-500 pb-1">
            Skills
          </h2>

          <div className="mt-1.5 text-[10.5px] leading-[1.45] text-gray-800">
            {skills.map((skill, index) => (
              <span key={index}>
                {skill}
                {index < skills.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* EXPERIENCE */}
      {experienceEntries.length > 0 && (
        <section className="mt-3">
          <h2 className="text-[12px] font-bold uppercase tracking-wide border-b border-gray-500 pb-1">
            Internships
          </h2>

          <div className="mt-1.5 space-y-2.5">
            {experienceEntries.map((experience, index) => {
              const bullets = formatBullets(experience.description);

              return (
                <div key={index}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-[11px] font-bold leading-4">
                        {experience.company || "Company Name"}
                      </h3>

                      <p className="text-[10.5px] font-medium leading-4">
                        {experience.jobTitle || "Job Title"}
                      </p>
                    </div>

                    {(experience.startDate || experience.endDate) && (
                      <p className="text-[10px] font-medium whitespace-nowrap">
                        {experience.startDate}
                        {experience.startDate &&
                          experience.endDate &&
                          "–"}
                        {experience.endDate}
                      </p>
                    )}
                  </div>

                  {bullets.length > 0 && (
                    <ul className="mt-1 ml-4 list-disc space-y-0.5 text-[10px] leading-[1.35] text-gray-800">
                      {bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {projectEntries.length > 0 && (
        <section className="mt-3">
          <h2 className="text-[12px] font-bold uppercase tracking-wide border-b border-gray-500 pb-1">
            Projects
          </h2>

          <div className="mt-1.5 space-y-2.5">
            {projectEntries.map((project, index) => {
              const bullets = formatBullets(project.description);

              return (
                <div key={index}>
                  <h3 className="text-[11px] font-bold leading-4">
                    {project.name || "Project Name"}
                  </h3>

                  {project.technologies && (
                    <p className="text-[10px] font-medium leading-4">
                      {project.technologies}
                    </p>
                  )}

                  {bullets.length > 0 && (
                    <ul className="mt-1 ml-4 list-disc space-y-0.5 text-[10px] leading-[1.35] text-gray-800">
                      {bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {educationEntries.length > 0 && (
        <section className="mt-3">
          <h2 className="text-[12px] font-bold uppercase tracking-wide border-b border-gray-500 pb-1">
            Education
          </h2>

          <div className="mt-1.5 space-y-2.5">
            {educationEntries.map((education, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-4"
              >
                <div>
                  {education.degree && (
                    <h3 className="text-[11px] font-bold leading-4">
                      {education.degree}
                    </h3>
                  )}

                  {education.institution && (
                    <p className="text-[10.5px] leading-4">
                      {education.institution}
                    </p>
                  )}

                  {(education.field || education.details) && (
                    <p className="text-[10px] text-gray-700 leading-4">
                      {education.field || education.details}
                    </p>
                  )}

                  {education.gpa && (
                    <p className="text-[10px] text-gray-700 leading-4">
                      CGPA: {education.gpa}
                    </p>
                  )}
                </div>

                {(education.graduationDate || education.endDate) && (
                  <p className="text-[10px] font-medium whitespace-nowrap">
                    {education.graduationDate || education.endDate}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Template1;