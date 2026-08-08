import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold">
            AI Resume Builder
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Build professional resumes using AI in minutes.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Get Started
            </button>

            <button className="border px-6 py-3 rounded-lg">
              Watch Demo
            </button>
          </div>
        </div>
      </section>
    </>
  );
}


export default Home;