import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateResume() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    projects: "",
  });

  // Handle input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Save Resume
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

      const response = await fetch(
        "http://localhost:5000/api/resumes",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log("Create Resume Response:", data);

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Resume created successfully!");

      // Go back to Dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Create resume error:", error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="mx-auto max-w-4xl">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800">
          Create Your Resume
        </h1>

        <p className="mt-2 text-gray-600">
          Enter your information to create your professional resume.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-8"
        >

          {/* Personal Information */}
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


          {/* Professional Summary */}
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


          {/* Education */}
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


          {/* Skills */}
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


          {/* Experience */}
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


          {/* Projects */}
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


          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Save Resume
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateResume;