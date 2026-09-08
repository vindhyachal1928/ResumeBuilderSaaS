import {
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

function Template2({ resume }) {
  // Convert text content into normal lines and bullet points
  const formatContent = (content) => {
    if (!content || !content.trim()) return [];

    return content
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

  // Render text and bullet points
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
              <span className="font-bold">•</span>

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

  // Make social links clickable
  const getSafeUrl = (url) => {
    if (!url || !url.trim()) return "#";

    const trimmedUrl = url.trim();

    if (
      trimmedUrl.startsWith("http://") ||
      trimmedUrl.startsWith("https://")
    ) {
      return trimmedUrl;
    }

    return `https://${trimmedUrl}`;
  };

  // Convert comma-separated skills into array
  const skills = resume.skills
    ? resume.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "")
    : [];

  // Photo support
  const photoUrl = resume.photo || resume.photoUrl || "";

  return (
    <div
      id="resume-template"
      className="bg-white text-gray-900 w-[794px] min-h-[1123px] mx-auto px-12 py-10 shadow-lg"
    >
      {/* ================= HEADER ================= */}

      <header className="pb-5 border-b-2 border-gray-900">
        <div className="flex items-start justify-between gap-8">
          
          {/* LEFT SIDE - NAME AND CONTACT */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold uppercase tracking-wide text-gray-900">
              {resume.fullName || "YOUR NAME"}
            </h1>

            <p className="mt-1 text-base font-medium text-gray-700">
              {resume.professionalTitle || "Professional Title"}
            </p>

            {/* Contact Information */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-sm text-gray-700">
              {resume.email && (
                <div className="flex items-center gap-1.5">
                  <Mail size={14} />

                  <span>{resume.email}</span>
                </div>
              )}

              {resume.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone size={14} />

                  <span>{resume.phone}</span>
                </div>
              )}

              {resume.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} />

                  <span>{resume.location}</span>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-5 mt-2 text-sm">
              {resume.linkedin && (
                <a
                  href={getSafeUrl(resume.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-gray-700 hover:text-blue-600"
                >
                  <span className="font-bold text-xs border border-gray-500 rounded px-1">
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
                  className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900"
                >
                  <span className="font-bold text-xs border border-gray-500 rounded px-1">
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
                  className="flex items-center gap-1.5 text-gray-700 hover:text-blue-600"
                >
                  <Globe size={14} />

                  <span>Portfolio</span>
                </a>
              )}
            </div>
          </div>

          {/* RIGHT SIDE - PHOTO */}
          <div className="shrink-0">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Profile"
                className="w-[115px] h-[135px] object-cover border border-gray-400"
              />
            ) : (
              <div className="w-[115px] h-[135px] border-2 border-gray-400 flex items-center justify-center text-xs font-semibold text-gray-500 uppercase">
                Photo
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= PROFESSIONAL SUMMARY ================= */}

      {resume.summary && (
        <section className="mt-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1">
            Professional Summary
          </h2>

          <div className="mt-2">
            {renderContent(resume.summary)}
          </div>
        </section>
      )}

      {/* ================= SKILLS ================= */}

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
                <span className="font-bold">•</span>

                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= INTERNSHIPS / EXPERIENCE ================= */}

      {resume.experience && (
        <section className="mt-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1">
            Internships / Experience
          </h2>

          <div className="mt-2">
            {renderContent(resume.experience)}
          </div>
        </section>
      )}

      {/* ================= PROJECTS ================= */}

      {resume.projects && (
        <section className="mt-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1">
            Projects
          </h2>

          <div className="mt-2">
            {renderContent(resume.projects)}
          </div>
        </section>
      )}

      {/* ================= ACHIEVEMENTS ================= */}

      {resume.achievements && (
        <section className="mt-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1">
            Achievements
          </h2>

          <div className="mt-2">
            {renderContent(resume.achievements)}
          </div>
        </section>
      )}

      {/* ================= EDUCATION ================= */}

      {resume.education && (
        <section className="mt-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1">
            Education
          </h2>

          <div className="mt-2">
            {renderContent(resume.education)}
          </div>
        </section>
      )}

      {/* ================= CERTIFICATIONS ================= */}

      {resume.certificates && (
        <section className="mt-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1">
            Certifications
          </h2>

          <div className="mt-2">
            {renderContent(resume.certificates)}
          </div>
        </section>
      )}
    </div>
  );
}

export default Template2;