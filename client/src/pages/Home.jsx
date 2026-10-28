import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";

import {
  Sparkles,
  FileText,
  Target,
  Eye,
  BarChart3,
  ArrowRight,
  Check,
} from "lucide-react";

import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="relative isolate overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50"
      >
        <div className="pointer-events-none absolute -right-24 -top-28 -z-10 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-36 left-1/4 -z-10 h-80 w-80 rounded-full bg-green-100/70 blur-3xl" />

        <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              <Sparkles size={16} />
              Your next opportunity starts here
            </div>

            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl">
              Make your next
              <span className="block text-blue-600">move stand out.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 lg:mx-0">
              Build a polished, professional resume with simple tools,
              modern templates, and a live preview.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                to="/Signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

              <a
                href="/#templates"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                Watch Demo
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-gray-600 lg:justify-start">
              {["Professional templates", "Live preview", "Print to PDF"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check size={16} className="text-green-600" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -left-5 top-12 h-24 w-24 rounded-3xl bg-green-200/70 blur-2xl" />
            <div className="absolute -right-5 bottom-10 h-32 w-32 rounded-full bg-blue-200/80 blur-2xl" />

            <div className="relative rotate-1 rounded-3xl border border-white/80 bg-white/70 p-4 shadow-2xl shadow-blue-900/10 backdrop-blur sm:p-6">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-5">
                  <div>
                    <div className="h-3 w-32 rounded-full bg-blue-600 sm:w-40" />
                    <div className="mt-3 h-2.5 w-24 rounded-full bg-gray-300" />
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <FileText size={27} />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-[1fr_1.5fr] gap-5">
                  <div className="space-y-5">
                    <div>
                      <div className="mb-3 h-2 w-16 rounded-full bg-green-500" />
                      <div className="space-y-2">
                        <div className="h-2 w-full rounded-full bg-gray-200" />
                        <div className="h-2 w-4/5 rounded-full bg-gray-200" />
                        <div className="h-2 w-5/6 rounded-full bg-gray-200" />
                      </div>
                    </div>
                    <div>
                      <div className="mb-3 h-2 w-14 rounded-full bg-green-500" />
                      <div className="flex flex-wrap gap-1.5">
                        <span className="h-5 w-12 rounded-md bg-blue-50" />
                        <span className="h-5 w-14 rounded-md bg-blue-50" />
                        <span className="h-5 w-10 rounded-md bg-blue-50" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <div className="mb-3 h-2 w-20 rounded-full bg-blue-600" />
                      <div className="space-y-2">
                        <div className="h-2 w-5/6 rounded-full bg-gray-200" />
                        <div className="h-2 w-full rounded-full bg-gray-200" />
                        <div className="h-2 w-4/5 rounded-full bg-gray-200" />
                      </div>
                    </div>
                    <div>
                      <div className="mb-3 h-2 w-16 rounded-full bg-blue-600" />
                      <div className="space-y-2">
                        <div className="h-2 w-full rounded-full bg-gray-200" />
                        <div className="h-2 w-5/6 rounded-full bg-gray-200" />
                        <div className="h-2 w-4/5 rounded-full bg-gray-200" />
                      </div>
                    </div>
                    <div>
                      <div className="mb-3 h-2 w-14 rounded-full bg-blue-600" />
                      <div className="space-y-2">
                        <div className="h-2 w-full rounded-full bg-gray-200" />
                        <div className="h-2 w-3/4 rounded-full bg-gray-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:-left-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <Check size={21} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Looking sharp</p>
                <p className="text-xs text-gray-500">Your resume is ready to shine</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="templates" className="scroll-mt-6 bg-gray-50 px-8 py-20">

        <div className="mx-auto max-w-6xl">

          <div className="mb-12 text-center">

            <h2 className="text-4xl font-bold">
              Resume Templates
            </h2>

            <p className="mt-4 text-gray-600">
              Choose a professional design and build a resume that fits your goals.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <FeatureCard
              icon={<FileText size={32} />}
              title="Classic Template"
              description="A clean, traditional layout with clear sections and professional typography."
            />

            <FeatureCard
              icon={<Sparkles size={32} />}
              title="Modern Template"
              description="A contemporary design with a strong visual hierarchy and a polished profile."
            />

          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold">Everything You Need</h3>
            <p className="mt-3 text-gray-600">
              Create your resume with a live preview and tools to help present your experience.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
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

      <section id="pricing" className="scroll-mt-6 px-8 py-20">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-3xl font-bold">Simple, Free Resume Building</h2>
          <p className="mt-4 text-gray-600">
            Get started with professional templates, resume editing, live preview, and print-to-PDF tools.
          </p>
          <p className="mt-6 text-4xl font-bold text-blue-600">Free</p>
          <Link
            to="/Signup"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </section>

      <section id="about" className="scroll-mt-6 bg-gray-50 px-8 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">About ResumeBuilder</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            ResumeBuilder helps you organize your experience and create a polished,
            professional resume. Choose a template, add your details, and review
            your changes with a live preview.
          </p>
        </div>
      </section>

      <section id="contact" className="scroll-mt-6 px-8 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">Contact</h2>
          <p className="mt-4 text-lg text-gray-600">
            Have questions or feedback? We’d love to hear from you.
          </p>
          <p className="mt-2 text-gray-600">
            Get started with ResumeBuilder and let us know how we can help improve your resume-building experience.
          </p>
          <Link
            to="/Signup"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;