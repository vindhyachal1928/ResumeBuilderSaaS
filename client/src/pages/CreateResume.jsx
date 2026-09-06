import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CreateResume() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);

  // Track whether the user has made unsaved changes
  const [isDirty, setIsDirty] = useState(false);

  // Store validation errors
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    projects: "",
    certificates: "",
    linkedin: "",
    github: "",
    portfolio: "",
    template: "professional",
  });

  // Fetch existing resume when editing
  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    const fetchResume = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/resumes/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to fetch resume");
          navigate("/dashboard");
          return;
        }

        const resume = data.resume;

        setFormData({
          fullName: resume.fullName || "",
          jobTitle: resume.jobTitle || "",
          email: resume.email || "",
          phone: resume.phone || "",
          location: resume.location || "",
          summary: resume.summary || "",
          skills: resume.skills || "",
          experience: resume.experience || "",
          education: resume.education || "",
          projects: resume.projects || "",
          certificates: resume.certificates || "",
          linkedin: resume.linkedin || "",
          github: resume.github || "",
          portfolio: resume.portfolio || "",
          template: resume.template || "professional",
        });
      } catch (error) {
        console.error("Fetch resume error:", error);
        alert("Something went wrong");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id, isEditMode, navigate]);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    // Mark form as changed
    setIsDirty(true);

    // Remove error for the field user is currently editing
    if (errors[name]) {
      setErrors((previousErrors) => {
        const updatedErrors = { ...previousErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  // Handle leaving the form
  const handleCancel = () => {
    // Do nothing while resume is being saved
    if (saving) {
      return;
    }

    // Ask for confirmation if there are unsaved changes
    if (isDirty) {
      const confirmLeave = window.confirm(
        "Are you sure you want to leave? Your unsaved changes will be lost."
      );

      if (!confirmLeave) {
        return;
      }
    }

    navigate("/dashboard");
  };

  // Validate resume form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Please enter your professional title.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    if (formData.summary.trim().length < 50) {
      newErrors.summary =
        "Professional Summary should be at least 50 characters.";
    }

    if (!formData.skills.trim()) {
      newErrors.skills = "Please enter at least one skill.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Save resume
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prevent another submission while already saving
    if (saving) {
      return;
    }

    // Validate form before saving
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const url = isEditMode
        ? `http://localhost:5000/api/resumes/${id}`
        : "http://localhost:5000/api/resumes";

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to save resume");
        return;
      }

      alert(
        isEditMode
          ? "Resume updated successfully"
          : "Resume created successfully"
      );

      // Changes are now saved
      setIsDirty(false);

      navigate(`/resume/${data.resume?._id || id}`);
    } catch (error) {
      console.error("Save resume error:", error);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading resume...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Page Header */}
        <div className="mb-8">
          <button
            onClick={handleCancel}
            disabled={saving}
            className="mb-4 text-sm text-blue-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Back to Dashboard
          </button>

          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? "Edit Resume" : "Create Resume"}
          </h1>

          <p className="mt-2 text-gray-600">
            Fill in your information to create a professional resume.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Personal Information */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add the basic information that employers need to contact you.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Vindhyachal Gupta"
                  className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600 ${
                    errors.fullName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Professional Title */}
              <div>
                <label className="mb-2 block font-medium text-gray-800">
                  Professional Title{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g. Java Developer"
                  className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600 ${
                    errors.jobTitle
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.jobTitle && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.jobTitle}
                  </p>
                )}

                <p className="mt-1 text-xs text-gray-500">
                  Example: Java Developer, Software Engineer, Full Stack
                  Developer
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block font-medium text-gray-800">
                  Email <span className="text-red-500">*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. yourname@gmail.com"
                  className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600 ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block font-medium text-gray-800">
                  Phone{" "}
                  <span className="text-gray-400 font-normal">
                    (Optional)
                  </span>
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 9876543210"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <label className="mb-2 block font-medium text-gray-800">
                  Location{" "}
                  <span className="text-gray-400 font-normal">
                    (Optional)
                  </span>
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Greater Noida, Uttar Pradesh, India"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </section>

          {/* Professional Summary */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Professional Summary
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Write 2–4 lines describing your experience, strengths, and
              career goals.
            </p>

            <div>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows="5"
                maxLength={500}
                placeholder="Example: Motivated Java Developer with experience in building web applications using Java, Spring Boot, REST APIs and MySQL. Strong problem-solving skills with a passion for developing scalable software solutions."
                className={`mt-5 w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600 ${
                  errors.summary
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />

              {errors.summary && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.summary}
                </p>
              )}

              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>
                  Keep your summary concise and focused.
                </span>

                <span>
                  {formData.summary.length} / 500
                </span>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Skills
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Separate each skill using a comma.
            </p>

            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Java, Spring Boot, SQL, MongoDB, React, Git"
              className={`mt-5 w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600 ${
                errors.skills
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />

            {errors.skills && (
              <p className="mt-1 text-sm text-red-500">
                {errors.skills}
              </p>
            )}

            <p className="mt-2 text-xs text-gray-500">
              These skills will automatically appear as separate items in
              the resume.
            </p>
          </section>

          {/* Experience */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Experience
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add your internships, jobs, or other relevant professional
              experience.
            </p>

            <div>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows="8"
                maxLength={1500}
                placeholder={`Example:

Java Developer Intern | ABC Technologies
June 2025 - August 2025

• Developed REST APIs using Java and Spring Boot
• Worked with MySQL and Git
• Improved application performance and fixed bugs`}
                className="mt-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 whitespace-pre-line"
              />

              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>
                  Focus on your role, responsibilities, and achievements.
                </span>

                <span>
                  {formData.experience.length} / 1500
                </span>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Education
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add your degree, university, graduation year, and other
              relevant details.
            </p>

            <textarea
              name="education"
              value={formData.education}
              onChange={handleChange}
              rows="6"
              placeholder={`Example:

B.Tech in Computer Science Engineering
Sharda University
2023 - 2027

CGPA: 8.3/10`}
              className="mt-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 whitespace-pre-line"
            />
          </section>

          {/* Projects */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Projects
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add projects that demonstrate your technical skills.
            </p>

            <div>
              <textarea
                name="projects"
                value={formData.projects}
                onChange={handleChange}
                rows="8"
                maxLength={1500}
                placeholder={`Example:

Resume Builder SaaS

• Built a full-stack resume builder using React and Node.js
• Implemented JWT authentication and MongoDB
• Added multiple professional resume templates
• Implemented resume creation, editing and deletion`}
                className="mt-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 whitespace-pre-line"
              />

              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>
                  Highlight what you built, technologies used, and your
                  impact.
                </span>

                <span>
                  {formData.projects.length} / 1500
                </span>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Certifications
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add relevant certifications, courses, or training programs.
            </p>

            <textarea
              name="certificates"
              value={formData.certificates}
              onChange={handleChange}
              rows="5"
              placeholder={`Example:

Java Programming Certificate - Udemy
Full Stack Web Development - Udemy`}
              className="mt-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 whitespace-pre-line"
            />
          </section>

          {/* Social Links */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Social & Portfolio Links
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add links that employers can use to learn more about you.
            </p>

            <div className="mt-5 space-y-5">

              {/* LinkedIn */}
              <div>
                <label className="mb-2 block font-medium text-gray-800">
                  LinkedIn{" "}
                  <span className="text-gray-400 font-normal">
                    (Optional)
                  </span>
                </label>

                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://www.linkedin.com/in/yourname"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              {/* GitHub */}
              <div>
                <label className="mb-2 block font-medium text-gray-800">
                  GitHub{" "}
                  <span className="text-gray-400 font-normal">
                    (Optional)
                  </span>
                </label>

                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/yourusername"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              {/* Portfolio */}
              <div>
                <label className="mb-2 block font-medium text-gray-800">
                  Portfolio{" "}
                  <span className="text-gray-400 font-normal">
                    (Optional)
                  </span>
                </label>

                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

            </div>
          </section>

          {/* Template Selection */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Choose Template
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Select the design you want to use for your resume.
            </p>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Professional */}
              <label
                className={`cursor-pointer rounded-lg border-2 p-4 ${
                  formData.template === "professional"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="template"
                  value="professional"
                  checked={formData.template === "professional"}
                  onChange={handleChange}
                  className="mr-2"
                />

                <span className="font-medium">
                  Professional
                </span>

                <p className="mt-2 text-xs text-gray-500">
                  Clean and ATS-friendly
                </p>
              </label>

              {/* Modern */}
              <label
                className={`cursor-pointer rounded-lg border-2 p-4 ${
                  formData.template === "modern"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="template"
                  value="modern"
                  checked={formData.template === "modern"}
                  onChange={handleChange}
                  className="mr-2"
                />

                <span className="font-medium">
                  Modern
                </span>

                <p className="mt-2 text-xs text-gray-500">
                  Modern and clean design
                </p>
              </label>

              {/* Minimal */}
              <label
                className={`cursor-pointer rounded-lg border-2 p-4 ${
                  formData.template === "minimal"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="template"
                  value="minimal"
                  checked={formData.template === "minimal"}
                  onChange={handleChange}
                  className="mr-2"
                />

                <span className="font-medium">
                  Minimal
                </span>

                <p className="mt-2 text-xs text-gray-500">
                  Simple and elegant
                </p>
              </label>

            </div>
          </section>

          {/* Submit */}
          <div className="flex justify-end gap-3 pb-10">

            {/* Cancel Button */}
            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="px-6 py-3 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            {/* Save Button */}
            <button
              type="submit"
              disabled={saving}
              className={`px-6 py-3 rounded-lg font-medium text-white transition ${
                saving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {saving
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                ? "Update Resume"
                : "Create Resume"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateResume;