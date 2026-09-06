import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProfessionalTemplate from "../components/ProfessionalTemplate";
import ModernTemplate from "../components/ModernTemplate";
import MinimalTemplate from "../components/MinimalTemplate";

function ResumePreview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

        setResume(data.resume);
      } catch (error) {
        console.error("Fetch resume error:", error);
        alert("Something went wrong");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id, navigate]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">
            Loading resume...
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Please wait
          </p>
        </div>
      </div>
    );
  }

  // Resume not found
  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-xl font-semibold text-red-500">
            Resume not found
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Select template
  const renderTemplate = () => {
    if (resume.template === "modern") {
      return <ModernTemplate resume={resume} />;
    }

    if (resume.template === "minimal") {
      return <MinimalTemplate resume={resume} />;
    }

    return <ProfessionalTemplate resume={resume} />;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">

      {/* Top Action Bar */}
      <div className="max-w-[794px] mx-auto mb-6 print-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3">

          {/* Page Title */}
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Resume Preview
            </h1>

            <p className="text-sm text-gray-500">
              Review your resume before downloading
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2">

            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800"
            >
              ← Dashboard
            </button>

            <button
              onClick={() => navigate(`/edit-resume/${resume._id}`)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit Resume
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              Print / Save PDF
            </button>

          </div>
        </div>
      </div>

      {/* Resume */}
      <main>
        {renderTemplate()}
      </main>

    </div>
  );
}

export default ResumePreview;