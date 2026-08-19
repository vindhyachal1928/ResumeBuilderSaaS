import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch resumes from backend
  useEffect(() => {
    const fetchResumes = async () => {
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

        console.log("Resume response:", data);

        if (!response.ok) {
          alert(data.message);
          return;
        }

        setResumes(data.resumes);

      } catch (error) {
        console.error("Fetch resumes error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [navigate]);


  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };


  // Create Resume
  const handleCreateResume = () => {
    navigate("/create-resume");
  };


  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="border-b bg-white">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <h1 className="text-2xl font-bold text-blue-600">
            ResumeAI
          </h1>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
          >
            Logout
          </button>

        </div>

      </nav>


      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* Welcome Section */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>

            <h2 className="text-3xl font-bold text-gray-800">
              Welcome Back 👋
            </h2>

            <p className="mt-2 text-gray-600">
              Create and manage your professional resumes.
            </p>

          </div>


          <button
            onClick={handleCreateResume}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white shadow hover:bg-blue-700"
          >
            + Create New Resume
          </button>

        </div>


        {/* Stats */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {/* Total Resumes */}
          <div className="rounded-xl bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Total Resumes
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {resumes.length}
            </h3>

          </div>


          {/* Latest Resume */}
          <div className="rounded-xl bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Latest Resume
            </p>

            <h3 className="mt-2 truncate text-xl font-bold">
              {resumes.length > 0
                ? resumes[0].fullName
                : "None"}
            </h3>

          </div>


          {/* Account Status */}
          <div className="rounded-xl bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Account Status
            </p>

            <h3 className="mt-2 text-xl font-bold text-green-600">
              Free
            </h3>

          </div>

        </div>


        {/* My Resumes */}
        <section className="mt-10">

          <h2 className="text-2xl font-bold text-gray-800">
            My Resumes
          </h2>


          {loading ? (

            // Loading
            <div className="mt-5 rounded-xl bg-white p-10 text-center shadow-sm">

              <p className="text-gray-500">
                Loading your resumes...
              </p>

            </div>

          ) : resumes.length === 0 ? (

            // No Resumes
            <div className="mt-5 rounded-xl bg-white p-10 text-center shadow-sm">

              <div className="text-5xl">
                📄
              </div>

              <h3 className="mt-4 text-xl font-semibold">
                No resumes yet
              </h3>

              <p className="mt-2 text-gray-500">
                Create your first resume and start building your career.
              </p>

              <button
                onClick={handleCreateResume}
                className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Create Your First Resume
              </button>

            </div>

          ) : (

            // Resumes
            <div className="mt-5 grid gap-6 md:grid-cols-2">

              {resumes.map((resume) => (

                <div
                  key={resume._id}
                  className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
                >

                  {/* Resume Header */}
                  <div className="flex items-start justify-between">

                    <div>

                      <h3 className="text-xl font-bold text-gray-800">
                        {resume.fullName}
                      </h3>

                      <p className="mt-1 text-gray-500">
                        {resume.email}
                      </p>

                    </div>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      Resume
                    </span>

                  </div>


                  {/* Resume Information */}
                  <div className="mt-5 space-y-2 text-sm text-gray-600">

                    {resume.phone && (
                      <p>
                        📞 {resume.phone}
                      </p>
                    )}

                    {resume.location && (
                      <p>
                        📍 {resume.location}
                      </p>
                    )}

                    <p>
                      📅 Created:{" "}
                      {new Date(
                        resume.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>


                  {/* Buttons */}
                  <div className="mt-6 flex gap-3 border-t pt-5">

                    <button
                      onClick={() => {
                        alert("Edit feature coming soon!");
                      }}
                      className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        alert("Delete feature coming soon!");
                      }}
                      className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Dashboard;