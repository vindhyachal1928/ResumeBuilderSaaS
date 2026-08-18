function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">

      <nav className="bg-white shadow">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-600">
            ResumeAI
          </h1>

          <button className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
            Logout
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-10">

        <h2 className="text-3xl font-bold">
          Welcome to your Dashboard
        </h2>

        <p className="mt-2 text-gray-600">
          Create and manage your resumes from here.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-xl font-semibold">
              Create Resume
            </h3>

            <p className="mt-2 text-gray-600">
              Start building your professional resume.
            </p>

            <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">
              Create
            </button>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-xl font-semibold">
              My Resumes
            </h3>

            <p className="mt-2 text-gray-600">
              View and edit your saved resumes.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-xl font-semibold">
              ATS Checker
            </h3>

            <p className="mt-2 text-gray-600">
              Check how well your resume performs with ATS.
            </p>
          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;