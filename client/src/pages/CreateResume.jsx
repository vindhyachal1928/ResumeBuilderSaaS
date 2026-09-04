import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

function CreateResume() {
  const navigate = useNavigate();

  // Get resume ID from URL
  const { id } = useParams();

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

  const [loading, setLoading] = useState(false);

  // Load existing resume when editing
  useEffect(() => {
    if (!id) {
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
          "http://localhost:5000/api/resumes",
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("Resume data:", data);

        if (!response.ok) {
          alert(data.message);
          return;
        }

        // Find the resume we want to edit
        const resume = data.resumes.find(
          (item) => item._id === id
        );

        if (!resume) {
          alert("Resume not found");
          navigate("/dashboard");
          return;
        }

        // Put existing resume data into form
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
        alert("Unable to load resume");
      }
    };

    fetchResume();

  }, [id, navigate]);


  // Handle input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  // Create / Update Resume
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // Check login
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      setLoading(true);

      // Create or Update
      const url = id
        ? `http://localhost:5000/api/resumes/${id}`
        : "http://localhost:5000/api/resumes";

      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log("Resume response:", data);

      if (!response.ok) {
        alert(data.message);
        return;
      }

      if (id) {
        alert("Resume updated successfully!");
      } else {
        alert("Resume created successfully!");
      }

      // Go back to Dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Resume error:", error);
      alert("Unable to connect to server");

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="mx-auto max-w-4xl">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800">
          {id ? "Edit Your Resume" : "Create Your Resume"}
        </h1>

        <p className="mt-2 text-gray-600">
          {id
            ? "Update your resume information."
            : "Enter your information to create your professional resume."
          }
        </p>


        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-8"
        >

          {/* ==================================
              Personal Information
          ================================== */}

          <section className="rounded-xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              Personal Information
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">

              {/* Full Name */}
              <div>

                <label className="mb-2 block font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
                />

              </div>


              {/* Professional Title */}
              <div>

                <label className="mb-2 block font-medium">
                  Professional Title
                </label>

                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g. Full Stack Developer"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Example: Software Engineer, Java Developer, Frontend Developer
                </p>

              </div>


              {/* Email */}
              <div>

                <label className="mb-2 block font-medium">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
                />

              </div>


              {/* Phone */}
              <div>

                <label className="mb-2 block font-medium">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
                />

              </div>


              {/* Location */}
              <div>

                <label className="mb-2 block font-medium">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
                />

              </div>

            </div>

          </section>


          {/* ==================================
              Professional Summary
          ================================== */}

          <section className="rounded-xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              Professional Summary
            </h2>

            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Write a short professional summary"
              rows="5"
              className="mt-5 w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            />

          </section>


          {/* ==================================
              Education
          ================================== */}

          <section className="rounded-xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              Education
            </h2>

            <textarea
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="Example: B.Tech in Computer Science, Sharda University, 2023-2027"
              rows="5"
              className="mt-5 w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            />

          </section>


          {/* ==================================
              Skills
          ================================== */}

          <section className="rounded-xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              Skills
            </h2>

            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Example: Java, React, Node.js, MongoDB"
              rows="4"
              className="mt-5 w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            />

          </section>


          {/* ==================================
              Experience
          ================================== */}

          <section className="rounded-xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              Experience
            </h2>

            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Describe your internship or work experience"
              rows="6"
              className="mt-5 w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            />

          </section>


          {/* ==================================
              Projects
          ================================== */}

          <section className="rounded-xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              Projects
            </h2>

            <textarea
              name="projects"
              value={formData.projects}
              onChange={handleChange}
              placeholder="Describe your projects"
              rows="6"
              className="mt-5 w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            />

          </section>


          {/* ==================================
              Certificates
          ================================== */}

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Certificates
            </h2>

            <textarea
              name="certificates"
              value={formData.certificates}
              onChange={handleChange}
              placeholder={`Example:
AWS Cloud Practitioner
Java Programming Certificate
Web Development Certificate`}
              rows="6"
              className="w-full px-5 py-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            />

          </div>


          {/* ==================================
              Social Links
          ================================== */}

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Social & Portfolio Links
            </h2>

            <div className="space-y-4">

              {/* LinkedIn */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn
                </label>

                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourname"
                  className="w-full px-5 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* GitHub */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub
                </label>

                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/yourusername"
                  className="w-full px-5 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* Portfolio */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio
                </label>

                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                  className="w-full px-5 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

          </div>


          {/* ==================================
              Resume Template
          ================================== */}

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Choose Resume Template
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Professional Template */}
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    template: "professional",
                  })
                }
                className={`p-5 rounded-xl border-2 text-left transition ${
                  formData.template === "professional"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >

                <div className="h-32 bg-white border border-gray-200 rounded-lg p-3 mb-4 shadow-sm">

                  <div className="h-3 w-24 bg-gray-800 rounded mb-3 mx-auto"></div>

                  <div className="h-2 w-full bg-gray-300 rounded mb-2"></div>

                  <div className="h-2 w-5/6 bg-gray-300 rounded mb-2"></div>

                  <div className="h-2 w-full bg-gray-300 rounded"></div>

                </div>

                <h3 className="font-semibold text-gray-900">
                  Professional
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Clean and professional design
                </p>

                {formData.template === "professional" && (
                  <p className="text-sm text-blue-600 font-medium mt-3">
                    ✓ Selected
                  </p>
                )}

              </button>


              {/* Modern Template */}
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    template: "modern",
                  })
                }
                className={`p-5 rounded-xl border-2 text-left transition ${
                  formData.template === "modern"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >

                <div className="h-32 bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4 shadow-sm">

                  <div className="h-5 w-20 bg-blue-600 rounded mb-3"></div>

                  <div className="h-2 w-32 bg-gray-400 rounded mb-2"></div>

                  <div className="h-2 w-full bg-gray-300 rounded mb-2"></div>

                  <div className="h-2 w-4/5 bg-gray-300 rounded"></div>

                </div>

                <h3 className="font-semibold text-gray-900">
                  Modern
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Modern and stylish design
                </p>

                {formData.template === "modern" && (
                  <p className="text-sm text-blue-600 font-medium mt-3">
                    ✓ Selected
                  </p>
                )}

              </button>


              {/* Minimal Template */}
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    template: "minimal",
                  })
                }
                className={`p-5 rounded-xl border-2 text-left transition ${
                  formData.template === "minimal"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >

                <div className="h-32 bg-white border border-gray-200 rounded-lg p-3 mb-4 shadow-sm">

                  <div className="h-3 w-28 bg-gray-600 rounded mb-4"></div>

                  <div className="h-px w-full bg-gray-300 mb-3"></div>

                  <div className="h-2 w-full bg-gray-200 rounded mb-2"></div>

                  <div className="h-2 w-3/4 bg-gray-200 rounded mb-3"></div>

                  <div className="h-px w-full bg-gray-300"></div>

                </div>

                <h3 className="font-semibold text-gray-900">
                  Minimal
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Simple and elegant design
                </p>

                {formData.template === "minimal" && (
                  <p className="text-sm text-blue-600 font-medium mt-3">
                    ✓ Selected
                  </p>
                )}

              </button>

            </div>

          </div>


          {/* ==================================
              Submit
          ================================== */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : id
                ? "Update Resume"
                : "Save Resume"
            }
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateResume;