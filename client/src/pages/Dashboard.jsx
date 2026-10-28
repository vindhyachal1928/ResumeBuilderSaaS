import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

function Dashboard() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Create Resume Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");

  // =========================================================
  // FETCH RESUMES
  // =========================================================

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `${API_URL}/api/resumes`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("Resume response:", data);

        if (!response.ok) {
          alert(data.message || "Failed to fetch resumes");
          return;
        }

        setResumes(data.resumes || []);
      } catch (error) {
        console.error("Fetch resumes error:", error);
        alert("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [navigate]);

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // =========================================================
  // OPEN CREATE RESUME MODAL
  // =========================================================

  const handleCreateResume = () => {
    setResumeTitle("");
    setShowCreateModal(true);
  };

  // =========================================================
  // CREATE RESUME FROM MODAL
  // =========================================================

  const handleCreateResumeSubmit = (event) => {
    event.preventDefault();

    const title = resumeTitle.trim();

    if (!title) {
      alert("Please enter a resume title.");
      return;
    }

    // Pass the title to the Resume Editor
    navigate("/create-resume", {
      state: {
        resumeTitle: title,
      },
    });

    setShowCreateModal(false);
  };

  // =========================================================
  // DELETE RESUME
  // =========================================================

  const handleDeleteResume = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/resumes/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Delete response:", data);

      if (!response.ok) {
        alert(data.message || "Failed to delete resume");
        return;
      }

      setResumes((currentResumes) =>
        currentResumes.filter(
          (resume) => resume._id !== id
        )
      );

      alert("Resume deleted successfully!");
    } catch (error) {
      console.error("Delete resume error:", error);
      alert("Unable to connect to server");
    }
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "Not available";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================================================
  // GET TEMPLATE NAME
  // =========================================================

  const getTemplateName = (template) => {
    if (template === "Template 2") {
      return "Template 2";
    }

    return "Template 1";
  };

  // =========================================================
  // SEARCH RESUMES
  // =========================================================

  const filteredResumes = resumes.filter((resume) => {
    const search = searchTerm
      .toLowerCase()
      .trim();

    if (!search) {
      return true;
    }

    const fullName = (
      resume.fullName || ""
    ).toLowerCase();

    const title = (
      resume.title || ""
    ).toLowerCase();

    const email = (
      resume.email || ""
    ).toLowerCase();

    const jobTitle = (
      resume.jobTitle ||
      resume.professionalTitle ||
      ""
    ).toLowerCase();

    const location = (
      resume.location || ""
    ).toLowerCase();

    return (
      fullName.includes(search) ||
      title.includes(search) ||
      email.includes(search) ||
      jobTitle.includes(search) ||
      location.includes(search)
    );
  });

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">

          {/* Logo */}

          <button
            onClick={() => navigate("/dashboard")}
            className="text-2xl font-bold text-blue-600"
          >
            ResumeAI
          </button>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>

        </div>
      </nav>

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-10">

        {/* ================================================= */}
        {/* WELCOME SECTION */}
        {/* ================================================= */}

        <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Dashboard
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Welcome Back 👋
              </h1>

              <p className="mt-2 max-w-xl text-gray-600">
                Create, edit, and manage all your professional resumes from one place.
              </p>
            </div>

            <button
              onClick={handleCreateResume}
              className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 md:w-auto"
            >
              + Create New Resume
            </button>

          </div>

        </section>

        {/* ================================================= */}
        {/* STATS */}
        {/* ================================================= */}

        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* Total Resumes */}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Resumes
            </p>

            <div className="mt-3 flex items-end justify-between">
              <h2 className="text-4xl font-bold text-gray-900">
                {resumes.length}
              </h2>

              <span className="text-3xl">
                📄
              </span>
            </div>
          </div>

          {/* Latest Resume */}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Latest Resume
            </p>

            <h2 className="mt-3 truncate text-xl font-bold text-gray-900">
              {resumes.length > 0
                ? resumes[0].fullName
                : "None"}
            </h2>

            {resumes.length > 0 && (
              <p className="mt-1 text-sm text-gray-500">
                Updated {formatDate(resumes[0].updatedAt)}
              </p>
            )}
          </div>

          {/* Account Status */}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:col-span-2 lg:col-span-1">
            <p className="text-sm font-medium text-gray-500">
              Account Status
            </p>

            <div className="mt-3 flex items-center gap-3">
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                Free
              </span>

              <span className="text-sm text-gray-500">
                Current plan
              </span>
            </div>
          </div>

        </section>

        {/* ================================================= */}
        {/* MY RESUMES */}
        {/* ================================================= */}

        <section className="mt-10">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                My Resumes
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage your saved resumes
              </p>
            </div>

            {resumes.length > 0 && (
              <p className="text-sm text-gray-500">
                {filteredResumes.length}{" "}
                {filteredResumes.length === 1
                  ? "resume"
                  : "resumes"}{" "}
                found
              </p>
            )}

          </div>

          {/* ================================================= */}
          {/* SEARCH BAR */}
          {/* ================================================= */}

          {!loading && resumes.length > 0 && (
            <div className="mt-5">

              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400">
                  🔍
                </span>

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  placeholder="Search resumes by name, email, title or location..."
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </div>
          )}

          {/* ================================================= */}
          {/* LOADING */}
          {/* ================================================= */}

          {loading ? (

            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

              <p className="mt-4 font-medium text-gray-700">
                Loading your resumes...
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Please wait
              </p>

            </div>

          ) : resumes.length === 0 ? (

            /* ================================================= */
            /* EMPTY STATE */
            /* ================================================= */

            <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl">
                📄
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                No resumes yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-gray-500">
                You haven't created a resume yet. Start building your professional resume today.
              </p>

              <button
                onClick={handleCreateResume}
                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Create Your First Resume
              </button>

            </div>

          ) : filteredResumes.length === 0 ? (

            /* ================================================= */
            /* NO SEARCH RESULTS */
            /* ================================================= */

            <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
                🔍
              </div>

              <h3 className="mt-4 text-xl font-bold text-gray-900">
                No resumes found
              </h3>

              <p className="mt-2 text-gray-500">
                No resume matches{" "}
                <span className="font-semibold text-gray-700">
                  "{searchTerm}"
                </span>
              </p>

              <button
                onClick={() => setSearchTerm("")}
                className="mt-5 rounded-lg bg-gray-800 px-5 py-2.5 font-semibold text-white transition hover:bg-gray-900"
              >
                Clear Search
              </button>

            </div>

          ) : (

            /* ================================================= */
            /* RESUME CARDS */
            /* ================================================= */

            <div className="mt-6 grid gap-6 lg:grid-cols-2">

              {filteredResumes.map((resume) => (

                <article
                  key={resume._id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >

                  {/* Card Header */}

                  <div className="p-6">

                    <div className="flex items-start justify-between gap-4">

                      <div className="min-w-0">

                        <h3 className="truncate text-xl font-bold text-gray-900">
                          {resume.title || resume.fullName || "Untitled Resume"}
                        </h3>

                        <p className="mt-1 truncate text-sm text-gray-500">
                          {resume.email || "No email provided"}
                        </p>

                      </div>

                      <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {getTemplateName(resume.template)}
                      </span>

                    </div>

                    {/* Resume Details */}

                    <div className="mt-5 grid gap-3 text-sm text-gray-600 sm:grid-cols-2">

                      {resume.phone && (
                        <div className="flex items-center gap-2">
                          <span>📞</span>

                          <span className="truncate">
                            {resume.phone}
                          </span>
                        </div>
                      )}

                      {resume.location && (
                        <div className="flex items-center gap-2">
                          <span>📍</span>

                          <span className="truncate">
                            {resume.location}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <span>📅</span>

                        <span>
                          Created {formatDate(resume.createdAt)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span>🔄</span>

                        <span>
                          Updated {formatDate(resume.updatedAt)}
                        </span>
                      </div>

                    </div>

                  </div>

                  {/* Card Actions */}

                  <div className="border-t border-gray-100 bg-gray-50 p-4">

                    <div className="grid grid-cols-3 gap-2">

                      {/* View */}

                      <button
                        onClick={() =>
                          navigate(`/resume/${resume._id}`)
                        }
                        className="rounded-lg bg-gray-800 px-3 py-2 text-sm font-semibold text-white transition hover:bg-gray-900"
                      >
                        View
                      </button>

                      {/* Edit */}

                      <button
                        onClick={() =>
                          navigate(`/edit-resume/${resume._id}`)
                        }
                        className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      {/* Delete */}

                      <button
                        onClick={() =>
                          handleDeleteResume(resume._id)
                        }
                        className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

      </main>

      {/* ===================================================== */}
      {/* CREATE RESUME MODAL */}
      {/* ===================================================== */}

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">

            {/* Modal Header */}

            <div className="flex items-start justify-between gap-4">

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Create a Resume
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Give your resume a title to get started.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-2xl leading-none text-gray-400 transition hover:text-gray-700"
                aria-label="Close"
              >
                ×
              </button>

            </div>

            {/* Modal Form */}

            <form
              onSubmit={handleCreateResumeSubmit}
              className="mt-6"
            >

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Resume Title
              </label>

              <input
                type="text"
                value={resumeTitle}
                onChange={(event) =>
                  setResumeTitle(event.target.value)
                }
                placeholder="Enter resume title"
                autoFocus
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {/* Buttons */}

              <div className="mt-6 flex gap-3">

                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Create Resume
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Dashboard;