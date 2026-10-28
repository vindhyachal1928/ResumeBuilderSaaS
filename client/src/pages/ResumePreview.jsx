import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Template1 from "../components/Template1";
import Template2 from "../components/Template2";
import API_URL from "../config/api";

function ResumePreview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // FETCH RESUME
  // =========================================================

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `${API_URL}/api/resumes/${id}`,
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

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-lg font-medium text-gray-700">
            Loading resume...
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Please wait
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // RESUME NOT FOUND
  // =========================================================

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-xl font-semibold text-red-500">
            Resume not found
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // SELECT TEMPLATE
  // =========================================================

  const renderTemplate = () => {
    /*
      New template system:

      Template 1
      Template 2

      Old template names are also handled safely.
    */

    if (resume.template === "Template 2") {
      return <Template2 resume={resume} />;
    }

    return <Template1 resume={resume} />;
  };

  const handleDownloadResume = () => {
    window.print();
  };

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 print:bg-white print:p-0">

      {/* ================================================= */}
      {/* TOP ACTION BAR */}
      {/* ================================================= */}

      <div className="max-w-[900px] mx-auto mb-6 print:hidden">

        <div className="flex flex-wrap items-center justify-between gap-4">

          {/* PAGE TITLE */}

          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Resume Preview
            </h1>

            <p className="text-sm text-gray-500">
              Review your resume before downloading
            </p>
          </div>

          {/* BUTTONS */}

          <div className="flex flex-wrap gap-2">

            {/* DASHBOARD */}

            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 transition"
            >
              ← Dashboard
            </button>

            {/* EDIT */}

            <button
              onClick={() =>
                navigate(`/edit-resume/${resume._id}`)
              }
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Edit Resume
            </button>

            {/* DOWNLOAD */}

            <button
              onClick={handleDownloadResume}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              Print / Save PDF
            </button>

          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* RESUME */}
      {/* ================================================= */}

      <main className="flex justify-center print:block">

        <div className="w-full max-w-[794px] mx-auto print:max-w-none">
          {renderTemplate()}
        </div>

      </main>

    </div>
  );
}

export default ResumePreview;