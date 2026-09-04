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

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">
          Loading resume...
        </p>
      </div>
    );
  }

  // Resume not found
  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">
          Resume not found
        </p>
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

      {/* Top Buttons */}
      <div className="max-w-[794px] mx-auto mb-6 flex justify-end gap-3 print-hidden">

        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
        >
          ← Dashboard
        </button>

        <button
          onClick={() => navigate(`/edit-resume/${resume._id}`)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Edit Resume
        </button>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Print / Save PDF
        </button>

      </div>

      {/* Selected Resume Template */}
      {renderTemplate()}

    </div>
  );
}

export default ResumePreview;