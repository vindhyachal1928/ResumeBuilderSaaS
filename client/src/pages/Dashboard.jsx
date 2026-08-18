import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
        <div className="flex items-center justify-between">

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

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Resumes
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              0
            </h3>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Resumes Created
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              0
            </h3>
          </div>

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

        </section>

      </main>

    </div>
  );
}

export default Dashboard;