import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

function Template1({ resume }) {
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
              <span>•</span>
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

  const skills = resume.skills
    ? resume.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "")
    : [];

  return (
    <div
      id="resume-template"
      className="bg-white text-gray-900 w-[794px] min-h-[1123px] mx-auto px-12 py-10 shadow-lg"
    >
      {/* ================= HEADER ================= */}
      <header className="text-center border-b border-gray-300 pb-5">
        <h1 className="text-3xl font-bold tracking-wide uppercase">
          {resume.fullName || "Your Name"}
        </h1>

        <p className="mt-1 text-base font-medium text-gray-700">
          {resume.professionalTitle || "Professional Title"}
        </p>

        {/* Contact Information */}
        <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 mt-4 text-sm text-gray-700">
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
        <div className="flex flex-wrap justify-center items-center gap-5 mt-2 text-sm">
          {/* LinkedIn */}
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

          {/* GitHub */}
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

          {/* Portfolio */}
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
      </header>

      {/* ================= PROFESSIONAL SUMMARY ================= */}
      {resume.summary && (
        <section className="mt-6">
          <h2 className="text-base font-bold uppercase tracking-wide border-b border-gray-400 pb-1">
            Professional Summary
          </h2>

          <div className="mt-3">
            {renderContent(resume.summary)}
          </div>
        </section>
      )}

      {/* ================= SKILLS ================= */}
      {skills.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-bold uppercase tracking-wide border-b border-gray-400 pb-1">
            Skills
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 border border-gray-400 rounded text-sm text-gray-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ================= PROJECTS ================= */}
      {resume.projects && (
        <section className="mt-6">
          <h2 className="text-base font-bold uppercase tracking-wide border-b border-gray-400 pb-1">
            Projects
          </h2>

          <div className="mt-3">
            {renderContent(resume.projects)}
          </div>
        </section>
      )}

      {/* ================= EDUCATION ================= */}
      {resume.education && (
        <section className="mt-6">
          <h2 className="text-base font-bold uppercase tracking-wide border-b border-gray-400 pb-1">
            Education
          </h2>

          <div className="mt-3">
            {renderContent(resume.education)}
          </div>
        </section>
      )}

      {/* ================= EXPERIENCE ================= */}
      {resume.experience && (
        <section className="mt-6">
          <h2 className="text-base font-bold uppercase tracking-wide border-b border-gray-400 pb-1">
            Experience
          </h2>

          <div className="mt-3">
            {renderContent(resume.experience)}
          </div>
        </section>
      )}

      {/* ================= CERTIFICATIONS ================= */}
      {resume.certificates && (
        <section className="mt-6">
          <h2 className="text-base font-bold uppercase tracking-wide border-b border-gray-400 pb-1">
            Certifications
          </h2>

          <div className="mt-3">
            {renderContent(resume.certificates)}
          </div>
        </section>
      )}
    </div>
  );
}

export default Template1;