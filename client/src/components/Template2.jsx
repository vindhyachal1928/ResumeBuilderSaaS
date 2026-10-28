import {
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

function Template2({ resume }) {
  // --------------------------------------------------
  // Format text and bullet points
  // --------------------------------------------------

  const formatContent = (content) => {
    if (content === null || content === undefined) {
      return [];
    }

    const text = String(content).trim();

    // Do not display empty values
    if (
      text === "" ||
      text === "[]" ||
      text === "{}" ||
      text === "null"
    ) {
      return [];
    }

    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")
      .map((line) => {
        const isBullet =
          line.startsWith("-") ||
          line.startsWith("•") ||
          line.startsWith("*");

        if (isBullet) {
          return {
            type: "bullet",
            text: line.substring(1).trim(),
          };
        }

        return {
          type: "text",
          text: line,
        };
      });
  };

  // --------------------------------------------------
  // Render content
  // --------------------------------------------------

  const renderContent = (content) => {
    const items = formatContent(content);

    return (
      <div className="space-y-1">
        {items.map((item, index) =>
          item.type === "bullet" ? (
            <div
              key={index}
              className="flex gap-2 text-sm leading-6 text-gray-800"
            >
              <span className="font-bold">
                •
              </span>

              <span>{item.text}</span>
            </div>
          ) : (
            <p
              key={index}
              className="text-sm leading-6 text-gray-800"
            >
              {item.text}
            </p>
          )
        )}
      </div>
    );
  };

  // --------------------------------------------------
  // Safe URL
  // --------------------------------------------------

  const getSafeUrl = (url) => {
    if (!url || !String(url).trim()) return "#";

    const trimmedUrl = String(url).trim();

    if (
      trimmedUrl.startsWith("http://") ||
      trimmedUrl.startsWith("https://")
    ) {
      return trimmedUrl;
    }

    return `https://${trimmedUrl}`;
  };

  // --------------------------------------------------
  // Skills
  // --------------------------------------------------

  const skills = resume.skills
    ? String(resume.skills)
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "")
    : [];

  // --------------------------------------------------
  // Parse structured data
  // --------------------------------------------------

  const parseArray = (value) => {
    if (!value) return [];

    if (Array.isArray(value)) {
      return value;
    }

    try {
      const parsed = JSON.parse(value);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const experienceEntries = parseArray(
    resume.experience
  );

  const projectEntries = parseArray(
    resume.projects
  );

  const educationEntries = parseArray(
    resume.education
  );

  // --------------------------------------------------
  // Check actual content
  // --------------------------------------------------

  const hasStructuredExperience =
    experienceEntries.some(
      (experience) =>
        experience &&
        (
          experience.jobTitle ||
          experience.company ||
          experience.startDate ||
          experience.endDate ||
          experience.description
        )
    );

  const hasStructuredProjects =
    projectEntries.some(
      (project) =>
        project &&
        (
          project.name ||
          project.technologies ||
          project.description
        )
    );

  const structuredEducation = educationEntries.filter(
    (item) =>
      item &&
      (
        item.degree ||
        item.institution ||
        item.startDate ||
        item.endDate ||
        item.graduationDate ||
        item.details ||
        item.field ||
        item.gpa ||
        item.grade
      )
  );

  // --------------------------------------------------
  // Raw text fallback
  // --------------------------------------------------

  const hasRawExperience =
    !Array.isArray(resume.experience) &&
    resume.experience &&
    String(resume.experience).trim() !== "" &&
    String(resume.experience).trim() !== "[]" &&
    String(resume.experience).trim() !== "{}" &&
    String(resume.experience).trim() !== "null";

  const hasRawProjects =
    !Array.isArray(resume.projects) &&
    resume.projects &&
    String(resume.projects).trim() !== "" &&
    String(resume.projects).trim() !== "[]" &&
    String(resume.projects).trim() !== "{}" &&
    String(resume.projects).trim() !== "null";

  const hasRawEducation =
    !Array.isArray(resume.education) &&
    resume.education &&
    String(resume.education).trim() !== "" &&
    String(resume.education).trim() !== "[]" &&
    String(resume.education).trim() !== "{}" &&
    String(resume.education).trim() !== "null";

  // --------------------------------------------------
  // Photo
  // --------------------------------------------------

  const photoUrl =
    resume.photo ||
    resume.photoUrl ||
    "";

  return (
    <div
      id="resume-template"
      className="bg-white text-gray-900 w-[794px] min-h-[1123px] mx-auto px-12 py-10 shadow-lg"
    >

      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="pb-6 border-b-2 border-gray-900">
        <div className="flex items-start justify-between gap-8">

          {/* LEFT SIDE */}
          <div className="flex-1 min-w-0">

            {/* NAME */}
            <h1 className="text-[30px] font-bold uppercase tracking-[1.5px] text-gray-900 leading-tight">
              {resume.fullName || "YOUR NAME"}
            </h1>

            {/* PROFESSIONAL TITLE */}
            {(resume.professionalTitle || resume.jobTitle) && (
              <p className="mt-2 text-[15px] font-medium text-gray-600 tracking-wide">
                {resume.professionalTitle || resume.jobTitle}
              </p>
            )}

            {/* CONTACT INFORMATION */}
            {(resume.email ||
              resume.phone ||
              resume.location) && (
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-[11px] text-gray-700">

                {resume.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail size={13} strokeWidth={1.8} />
                    <span>{resume.email}</span>
                  </div>
                )}

                {resume.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone size={13} strokeWidth={1.8} />
                    <span>{resume.phone}</span>
                  </div>
                )}

                {resume.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} strokeWidth={1.8} />
                    <span>{resume.location}</span>
                  </div>
                )}

              </div>
            )}

            {/* SOCIAL LINKS */}
            {(resume.linkedin ||
              resume.github ||
              resume.portfolio) && (
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-2.5 text-[11px]">

                {resume.linkedin && (
                  <a
                    href={getSafeUrl(resume.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <span className="font-bold text-[10px] border border-gray-400 rounded px-1.5 py-0.5">
                      in
                    </span>

                    <span>LinkedIn</span>
                  </a>
                )}

                {resume.github && (
                  <a
                    href={getSafeUrl(resume.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <span className="font-bold text-[9px] border border-gray-400 rounded px-1 py-0.5">
                      GH
                    </span>

                    <span>GitHub</span>
                  </a>
                )}

                {resume.portfolio && (
                  <a
                    href={getSafeUrl(resume.portfolio)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Globe
                      size={13}
                      strokeWidth={1.8}
                    />

                    <span>Portfolio</span>
                  </a>
                )}

              </div>
            )}

          </div>

          {/* RIGHT SIDE - PHOTO */}
          <div className="shrink-0">

            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Profile"
                className="w-[110px] h-[130px] object-cover border border-gray-400"
              />
            ) : (
              <div className="w-[110px] h-[130px] border border-gray-400 flex items-center justify-center text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                Photo
              </div>
            )}

          </div>

        </div>
      </header>

      {/* ==================================================
          PROFESSIONAL SUMMARY
      ================================================== */}

      {resume.summary && (
        <section className="mt-5">

          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1">
            Professional Summary
          </h2>

          <div className="mt-2">
            {renderContent(
              resume.summary
            )}
          </div>

        </section>
      )}

      {/* ==================================================
          SKILLS
      ================================================== */}

      {skills.length > 0 && (
        <section className="mt-5">

          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1">
            Skills
          </h2>

          <div className="mt-2 grid grid-cols-2 gap-x-8">

            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex gap-2 text-sm leading-6 text-gray-800"
              >

                <span className="font-bold">
                  •
                </span>

                <span>{skill}</span>

              </div>
            ))}

          </div>

        </section>
      )}

      {/* ==================================================
          INTERNSHIPS / EXPERIENCE
      ================================================== */}

      {(hasStructuredExperience ||
        hasRawExperience) && (
        <section className="mt-5">

          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1">
            Internships / Experience
          </h2>

          <div className="mt-2 space-y-4">

            {hasStructuredExperience ? (
              experienceEntries.map(
                (experience, index) => {
                  const hasData =
                    experience?.jobTitle ||
                    experience?.company ||
                    experience?.startDate ||
                    experience?.endDate ||
                    experience?.description;

                  if (!hasData) {
                    return null;
                  }

                  return (
                    <div key={index}>

                      <div className="flex justify-between gap-5">

                        <div>

                          {experience.jobTitle && (
                            <div className="font-semibold text-sm">
                              {experience.jobTitle}
                            </div>
                          )}

                          {experience.company && (
                            <div className="text-sm">
                              {experience.company}
                            </div>
                          )}

                        </div>

                        {(experience.startDate ||
                          experience.endDate) && (
                          <div className="text-sm text-gray-600 whitespace-nowrap">
                            {experience.startDate}

                            {experience.startDate &&
                              experience.endDate &&
                              " - "}

                            {experience.endDate}
                          </div>
                        )}

                      </div>

                      {experience.description && (
                        <div className="mt-2">
                          {renderContent(
                            experience.description
                          )}
                        </div>
                      )}

                    </div>
                  );
                }
              )
            ) : (
              hasRawExperience &&
              renderContent(
                resume.experience
              )
            )}

          </div>

        </section>
      )}

      {/* ==================================================
          PROJECTS
      ================================================== */}

      {(hasStructuredProjects ||
        hasRawProjects) && (
        <section className="mt-5">

          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1">
            Projects
          </h2>

          <div className="mt-2 space-y-4">

            {hasStructuredProjects ? (
              projectEntries.map(
                (project, index) => {
                  const hasData =
                    project?.name ||
                    project?.technologies ||
                    project?.description;

                  if (!hasData) {
                    return null;
                  }

                  return (
                    <div key={index}>

                      <div className="flex justify-between gap-5">

                        <div className="font-semibold text-sm">
                          {project.name}
                        </div>

                        {project.technologies && (
                          <div className="text-sm text-gray-600 text-right">
                            {project.technologies}
                          </div>
                        )}

                      </div>

                      {project.description && (
                        <div className="mt-1">
                          {renderContent(
                            project.description
                          )}
                        </div>
                      )}

                    </div>
                  );
                }
              )
            ) : (
              hasRawProjects &&
              renderContent(
                resume.projects
              )
            )}

          </div>

        </section>
      )}

      {/* ==================================================
          ACHIEVEMENTS
      ================================================== */}

      {resume.achievements &&
        String(resume.achievements).trim() !== "[]" && (
          <section className="mt-5">

            <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1">
              Achievements
            </h2>

            <div className="mt-2">
              {renderContent(
                resume.achievements
              )}
            </div>

          </section>
        )}

      {/* ==================================================
          EDUCATION
      ================================================== */}

      {(structuredEducation.length > 0 ||
        hasRawEducation) && (
        <section className="mt-5">

          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1">
            Education
          </h2>

          <div className="mt-2">

            {structuredEducation.length > 0 ? (
              <div className="space-y-4">
                {structuredEducation.map((education, index) => (
                  <div key={index}>
                    <div className="flex justify-between gap-5">
                      <div>
                        {education.degree && (
                          <div className="font-semibold text-sm">
                            {education.degree}
                          </div>
                        )}

                        {education.institution && (
                          <div className="text-sm">
                            {education.institution}
                          </div>
                        )}
                      </div>

                      {(education.startDate ||
                        education.endDate ||
                        education.graduationDate) && (
                        <div className="text-sm text-gray-600 whitespace-nowrap">
                          {education.startDate}
                          {(education.startDate &&
                            (education.endDate || education.graduationDate)) &&
                            " - "}
                          {education.endDate || education.graduationDate}
                        </div>
                      )}
                    </div>

                    {(education.details || education.field || education.gpa) && (
                      <div className="mt-2">
                        {renderContent(
                          education.details ||
                            `${education.field || ""}${
                              education.field && education.gpa ? " | " : ""
                            }${education.gpa ? `GPA: ${education.gpa}` : ""}`
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              hasRawEducation &&
              renderContent(
                resume.education
              )
            )}

          </div>

        </section>
      )}

      {/* ==================================================
          CERTIFICATIONS
      ================================================== */}

      {resume.certificates &&
        String(resume.certificates).trim() !== "[]" && (
          <section className="mt-5">

            <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1">
              Certifications
            </h2>

            <div className="mt-2">
              {renderContent(
                resume.certificates
              )}
            </div>

          </section>
        )}

    </div>
  );
}

export default Template2;