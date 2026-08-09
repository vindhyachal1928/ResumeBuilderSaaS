import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";

import {
  Sparkles,
  FileText,
  Target,
  Eye,
  BarChart3,
} from "lucide-react";


function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="flex min-h-screen items-center justify-center">
        <div className="text-center">

          <h1 className="text-4xl font-bold md:text-5xl">
            AI Resume Builder
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Build professional resumes using AI in minutes.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">

            <button className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
              Get Started
            </button>

            <button className="rounded-lg border px-6 py-3">
              Watch Demo
            </button>

          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 px-8 py-20">

        <div className="mx-auto max-w-6xl">

          <div className="mb-12 text-center">

            <h2 className="text-4xl font-bold">
              Everything You Need
            </h2>

            <p className="mt-4 text-gray-600">
              Create a professional resume with powerful tools.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">

            <FeatureCard
              icon={<Sparkles size={32} />}
              title="AI-Powered"
              description="Generate professional resume content using AI."
            />

            <FeatureCard
              icon={<FileText size={32} />}
              title="Professional Templates"
              description="Choose from modern and professional resume templates."
            />

            <FeatureCard
              icon={<Target size={32} />}
              title="ATS Optimization"
              description="Improve your resume for Applicant Tracking Systems."
            />

            <FeatureCard
              icon={<Eye size={32} />}
              title="Live Preview"
              description="See your resume changes instantly while editing."
            />

            <FeatureCard
              icon={<BarChart3 size={32} />}
              title="Resume Analytics"
              description="Analyze your resume and get useful improvement suggestions."
            />

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Home;