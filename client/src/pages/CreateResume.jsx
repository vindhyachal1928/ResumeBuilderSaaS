import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { User, Briefcase, Trash2 } from "lucide-react";
import Template1 from "../components/Template1";
import Template2 from "../components/Template2";
import API_URL from "../config/api";

function CreateResume() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  // =========================================
  // 1. FORM DATA
  // =========================================

  const [formData, setFormData] = useState({
    title: location.state?.resumeTitle || "",
    fullName: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
    linkedin: "",
    github: "",
    portfolio: "",
    photo: "",
    summary: "",
    skills: "",
  });


  // =========================================
  // 2. STATES
  // =========================================

  const [errors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingResume, setIsLoadingResume] = useState(isEditing);

  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(2);
  const [showTemplates, setShowTemplates] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    const parseArray = (value) => {
      if (Array.isArray(value)) {
        return value;
      }

      if (!value) {
        return [];
      }

      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    };

    const loadResume = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `${API_URL}/api/resumes/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to load resume.");
          navigate("/dashboard");
          return;
        }

        const resume = data.resume;
        const savedSkills = resume.skills
          ? String(resume.skills)
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean)
          : [];

        setFormData({
          title: resume.title || "",
          fullName: resume.fullName || "",
          email: resume.email || "",
          phone: resume.phone || "",
          location: resume.location || "",
          jobTitle: resume.jobTitle || "",
          linkedin: resume.linkedin || "",
          github: resume.github || "",
          portfolio: resume.portfolio || "",
          photo: resume.photo || "",
          summary: resume.summary || "",
          skills: "",
        });
        setSkills(savedSkills);
        setExperiences(
          parseArray(resume.experience).map((experience) => ({
            companyName: experience.companyName || experience.company || "",
            jobTitle: experience.jobTitle || "",
            startDate: experience.startDate || "",
            endDate:
              experience.endDate === "Present"
                ? ""
                : experience.endDate || "",
            currentlyWorking: experience.endDate === "Present",
            description: experience.description || "",
          }))
        );
        setProjects(
          parseArray(resume.projects).map((project) => ({
            projectName: project.projectName || project.name || "",
            projectType: project.projectType || project.technologies || "",
            description: project.description || "",
          }))
        );
        setEducation(
          parseArray(resume.education).map((entry) => ({
            institution: entry.institution || "",
            degree: entry.degree || "",
            field: entry.field || entry.details || "",
            graduationDate: entry.graduationDate || entry.endDate || "",
            gpa: entry.gpa || "",
          }))
        );
        setSelectedTemplate(resume.template === "Template 1" ? 1 : 2);
      } catch (error) {
        console.error("Load resume error:", error);
        alert("Unable to load resume. Please try again.");
        navigate("/dashboard");
      } finally {
        setIsLoadingResume(false);
      }
    };

    loadResume();
  }, [id, navigate]);


  // =========================================
  // 3. HANDLE INPUT CHANGE
  // =========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  // =========================================
  // 4. HANDLE PHOTO CHANGE
  // =========================================

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((previous) => ({
        ...previous,
        photo: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };


  // =========================================
  // 5. EXPERIENCE
  // =========================================

  const handleAddExperience = () => {
    setExperiences((previous) => [
      ...previous,
      {
        companyName: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
      },
    ]);
  };

  const updateExperience = (index, field, value) => {
    setExperiences((previous) =>
      previous.map((experience, experienceIndex) =>
        experienceIndex === index
          ? { ...experience, [field]: value }
          : experience
      )
    );
  };

  const removeExperience = (index) => {
    setExperiences((previous) =>
      previous.filter((_, experienceIndex) => experienceIndex !== index)
    );
  };


  // =========================================
  // 6. PROJECTS
  // =========================================

  const handleAddProject = () => {
    setProjects((previous) => [
      ...previous,
      {
        projectName: "",
        projectType: "",
        description: "",
      },
    ]);
  };

  const updateProject = (index, field, value) => {
    setProjects((previous) =>
      previous.map((project, projectIndex) =>
        projectIndex === index
          ? { ...project, [field]: value }
          : project
      )
    );
  };

  const removeProject = (index) => {
    setProjects((previous) =>
      previous.filter((_, projectIndex) => projectIndex !== index)
    );
  };


  // =========================================
  // 7. SKILLS
  // =========================================

  const handleAddSkill = () => {
    const skillInput = formData.skills.trim();

    if (!skillInput) {
      return;
    }

    setSkills((previous) => [...previous, skillInput]);

    setFormData((previous) => ({
      ...previous,
      skills: "",
    }));
  };


  // =========================================
  // 8. EDUCATION
  // =========================================

  const handleAddEducation = () => {
    setEducation((previous) => [
      ...previous,
      {
        institution: "",
        degree: "",
        field: "",
        graduationDate: "",
        gpa: "",
      },
    ]);
  };

  const updateEducation = (index, field, value) => {
    setEducation((previous) =>
      previous.map((entry, entryIndex) =>
        entryIndex === index
          ? { ...entry, [field]: value }
          : entry
      )
    );
  };

  const removeEducation = (index) => {
    setEducation((previous) =>
      previous.filter((_, entryIndex) => entryIndex !== index)
    );
  };


  // =========================================
  // 9. TEMPLATE PREVIEW DATA
  // =========================================

  const resumeData = {
    ...formData,
    professionalTitle: formData.jobTitle,
    skills: skills.length ? skills.join(", ") : formData.skills || "",
    experience: JSON.stringify(
      experiences
        .filter((experience) =>
          Object.values(experience).some((value) =>
            typeof value === "boolean"
              ? value
              : String(value ?? "").trim() !== ""
          )
        )
        .map((experience) => ({
          jobTitle: experience.jobTitle || "",
          company: experience.companyName || "",
          companyName: experience.companyName || "",
          startDate: experience.startDate || "",
          endDate: experience.currentlyWorking
            ? "Present"
            : experience.endDate || "",
          description: experience.description || "",
        }))
    ),
    projects: JSON.stringify(
      projects
        .filter((project) =>
          Object.values(project).some(
            (value) => String(value ?? "").trim() !== ""
          )
        )
        .map((project) => ({
          name: project.projectName || "",
          projectName: project.projectName || "",
          technologies: project.projectType || "",
          projectType: project.projectType || "",
          description: project.description || "",
        }))
    ),
    education: JSON.stringify(
      education
        .filter((entry) =>
          Object.values(entry).some(
            (value) => String(value ?? "").trim() !== ""
          )
        )
        .map((entry) => ({
          degree: entry.degree || "",
          institution: entry.institution || "",
          startDate: "",
          endDate: entry.graduationDate || "",
          graduationDate: entry.graduationDate || "",
          field: entry.field || "",
          gpa: entry.gpa || "",
          details: entry.field
            ? `${entry.field}${entry.gpa ? ` | GPA: ${entry.gpa}` : ""}`
            : entry.gpa
            ? `GPA: ${entry.gpa}`
            : "",
        }))
    ),
  };

  // =========================================
  // 9. SAVE RESUME
  // =========================================

  const handleSaveResume = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    if (!formData.fullName.trim() || !formData.email.trim()) {
      alert("Full name and email are required before saving.");
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        title: formData.title,
        fullName: formData.fullName,
        jobTitle: formData.jobTitle,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        summary: formData.summary,
        education: resumeData.education,
        skills: skills.length ? skills.join(", ") : formData.skills || "",
        experience: resumeData.experience,
        projects: resumeData.projects,
        certificates: "",
        linkedin: formData.linkedin,
        github: formData.github,
        portfolio: formData.portfolio,
        photo: formData.photo,
        template: selectedTemplate === 2 ? "Template 2" : "Template 1",
      };

      const response = await fetch(
        isEditing
          ? `${API_URL}/api/resumes/${id}`
          : `${API_URL}/api/resumes`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to save resume.");
        return;
      }

      alert(
        isEditing
          ? "Resume updated successfully!"
          : "Resume saved successfully!"
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Save resume error:", error);
      alert("Unable to connect to server. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadResume = () => {
    if (!formData.fullName.trim() || !formData.email.trim()) {
      alert("Add your name and email before printing.");
      return;
    }

    window.print();
  };

  if (isLoadingResume) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading resume...</p>
      </div>
    );
  }


  // =========================================
  // 10. PAGE
  // =========================================

  return (

    <div className="min-h-screen bg-slate-50">


      {/* =====================================
          HEADER
      ====================================== */}

      <header className="bg-white border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-6 py-5">

          <h1 className="text-2xl font-bold text-slate-900">
            Create Resume
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Build your professional resume
          </p>

        </div>

      </header>



      {/* =====================================
          BACK TO DASHBOARD
      ====================================== */}

      <div className="max-w-7xl mx-auto px-6 pt-5">

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="
            group
            flex
            items-center
            gap-2
            text-slate-500
            text-base
            font-medium
            hover:text-slate-900
            transition-all
            duration-200
          "
        >

          <span
            className="
              text-xl
              leading-none
              transition-transform
              duration-200
              group-hover:-translate-x-1
            "
          >
            ←
          </span>

          <span>
            Back to Dashboard
          </span>

        </button>

      </div>



      {/* =====================================
          MAIN CONTENT
      ====================================== */}

      <main className="max-w-7xl mx-auto px-6 py-6">

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">


          {/* =================================
              LEFT SIDE
          ================================= */}

          <div className="w-full print-hidden">


            {/* =================================
                EDITOR CARD
            ================================== */}

            <div className="w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">


              {/* =================================
                  TEMPLATE + PREVIOUS + NEXT
              ================================== */}

              <div className="flex items-center justify-between mb-5">


                {/* TEMPLATE */}

                <div className="relative">

                  <button
                    type="button"
                    onClick={() => setShowTemplates(!showTemplates)}
                    className="
                      flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                      text-base
                      font-medium
                      hover:bg-blue-100
                      transition-colors
                    "
                  >
                    <span className="text-lg">
                      ▣
                    </span>

                    Template
                  </button>

                  {showTemplates && (
                    <div
                      className="
                        absolute
                        left-0
                        top-full
                        mt-3
                        z-50
                        w-[430px]
                        bg-white
                        border
                        border-slate-200
                        rounded-2xl
                        shadow-xl
                        p-4
                      "
                    >

                      {/* CLASSIC */}

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTemplate(1);
                          setShowTemplates(false);
                        }}
                        className={`
                          w-full
                          flex
                          items-center
                          gap-4
                          p-4
                          rounded-xl
                          border
                          text-left
                          transition-all
                          ${
                            selectedTemplate === 1
                              ? "border-blue-500 bg-blue-50"
                              : "border-slate-200 hover:border-blue-300"
                          }
                        `}
                      >

                        <div className="w-20 h-24 shrink-0 bg-slate-100 border border-slate-200 rounded-lg flex flex-col items-center justify-center gap-1 p-2">
                          <div className="w-10 h-1.5 bg-slate-700 rounded" />
                          <div className="w-7 h-1 bg-slate-400 rounded" />
                          <div className="w-14 h-1 bg-slate-300 rounded" />
                          <div className="w-12 h-1 bg-slate-300 rounded" />
                          <div className="w-14 h-1 bg-slate-300 rounded" />
                          <div className="w-10 h-1 bg-slate-300 rounded" />
                          <div className="w-12 h-1 bg-slate-300 rounded" />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-slate-900">
                            Classic
                          </h3>

                          <p className="text-sm text-slate-500 mt-2 leading-5">
                            A clean, traditional resume format with clear
                            sections and professional typography
                          </p>
                        </div>

                        <div
                          className={`
                            w-5
                            h-5
                            rounded-full
                            border-2
                            shrink-0
                            flex
                            items-center
                            justify-center
                            ${
                              selectedTemplate === 1
                                ? "border-blue-500"
                                : "border-slate-300"
                            }
                          `}
                        >
                          {selectedTemplate === 1 && (
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                          )}
                        </div>

                      </button>

                      {/* MODERN */}

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTemplate(2);
                          setShowTemplates(false);
                        }}
                        className={`
                          w-full
                          flex
                          items-center
                          gap-4
                          p-4
                          rounded-xl
                          border
                          text-left
                          transition-all
                          mt-3
                          ${
                            selectedTemplate === 2
                              ? "border-blue-500 bg-blue-50"
                              : "border-slate-200 hover:border-blue-300"
                          }
                        `}
                      >

                        <div className="w-20 h-24 shrink-0 bg-slate-100 border border-slate-200 rounded-lg overflow-hidden flex">

                          <div className="w-6 bg-slate-700 flex flex-col items-center pt-3 gap-2">
                            <div className="w-3 h-3 rounded-full bg-white" />
                            <div className="w-4 h-1 bg-slate-300 rounded" />
                            <div className="w-4 h-1 bg-slate-300 rounded" />
                            <div className="w-4 h-1 bg-slate-300 rounded" />
                          </div>

                          <div className="flex-1 p-2 space-y-2">
                            <div className="w-8 h-1.5 bg-slate-700 rounded" />
                            <div className="w-full h-1 bg-slate-300 rounded" />
                            <div className="w-10 h-1 bg-slate-300 rounded" />
                            <div className="w-full h-1 bg-slate-300 rounded" />
                            <div className="w-8 h-1 bg-slate-300 rounded" />
                          </div>

                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-slate-900">
                            Modern
                          </h3>

                          <p className="text-sm text-slate-500 mt-2 leading-5">
                            Sleek design with strategic use of color and
                            modern font choices
                          </p>
                        </div>

                        <div
                          className={`
                            w-5
                            h-5
                            rounded-full
                            border-2
                            shrink-0
                            flex
                            items-center
                            justify-center
                            ${
                              selectedTemplate === 2
                                ? "border-blue-500"
                                : "border-slate-300"
                            }
                          `}
                        >
                          {selectedTemplate === 2 && (
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                          )}
                        </div>

                      </button>

                    </div>
                  )}

                </div>

                {/* PREVIOUS + NEXT */}
                <div className="flex items-center gap-2">
                  {/* PREVIOUS */}
                  <button
                    type="button"
                    onClick={() => {
                      if (currentStep > 1) {
                        setCurrentStep(currentStep - 1);
                      }
                    }}
                    disabled={currentStep === 1}
                    className="
                      flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                      text-base
                      font-medium
                      hover:bg-blue-100
                      transition-colors
                      disabled:opacity-40
                      disabled:cursor-not-allowed
                    "
                  >
                    <span className="text-xl leading-none">
                      ←
                    </span>
                    Previous
                  </button>
                  {/* NEXT */}
                  <button
                    type="button"
                    onClick={() => {
                      if (currentStep < 6) {
                        setCurrentStep(currentStep + 1);
                      }
                    }}
                    disabled={currentStep === 6}
                    className="
                      flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                      text-base
                      font-medium
                      hover:bg-blue-100
                      transition-colors
                      disabled:opacity-40
                      disabled:cursor-not-allowed
                    "
                  >
                    Next
                    <span className="text-xl leading-none">
                      →
                    </span>
                  </button>
                </div>
              </div>

              {/* =================================
                  STEP 1 — PERSONAL INFORMATION
              ================================== */}

              {currentStep === 1 && (
                <>

                  <div className="flex items-center gap-4 mb-5">

                    <div>

                      <h2 className="text-xl font-semibold text-slate-900">
                        Personal Information
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        Basic information shown at the top of your resume.
                      </p>

                    </div>

                  </div>

                  {/* PROFILE PHOTO */}

                  <div className="mb-5">

                    <div className="flex items-center gap-5">

                      <label
                        className="
                          w-12
                          h-14
                          shrink-0
                          border
                          border-dashed
                          border-slate-700
                          rounded-2xl
                          bg-slate-900
                          flex
                          items-center
                          justify-center
                          cursor-pointer
                          hover:bg-slate-800
                          transition
                          overflow-hidden
                        "
                      >

                        {formData.photo ? (

                          <img
                            src={formData.photo}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />

                        ) : (

                          <User className="w-7 h-7 text-white" />

                        )}

                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          className="hidden"
                          onChange={handlePhotoChange}
                        />

                      </label>
                      <div>

                        <p className="text-base font-medium text-slate-800">
                          Upload user image.
                        </p>

                        <p className="text-sm text-slate-400 mt-1">
                          JPG, PNG or WEBP · Maximum 2MB
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* FORM GRID */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">


                    {/* FULL NAME */}

                    <div>

                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Full Name
                        <span className="ml-1 text-red-500">*</span>
                      </label>

                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`
                          w-full
                          h-10
                          px-3
                          rounded-xl
                          border
                          bg-white
                          text-sm
                          text-slate-800
                          placeholder:text-slate-400
                          outline-none
                          transition-all
                          duration-200
                          focus:border-blue-500
                          focus:ring-2
                          focus:ring-blue-100
                          ${
                            errors.fullName
                              ? "border-red-500"
                              : "border-slate-200"
                          }
                        `}
                      />

                      {errors.fullName && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.fullName}
                        </p>
                      )}

                    </div>


                    {/* PROFESSIONAL TITLE */}

                    <div>

                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Professional Title
                        <span className="ml-1 text-red-500">*</span>
                      </label>

                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="Software Engineer"
                        className={`
                          w-full
                          h-10
                          px-3
                          rounded-xl
                          border
                          bg-white
                          text-sm
                          text-slate-800
                          placeholder:text-slate-400
                          outline-none
                          transition-all
                          duration-200
                          focus:border-blue-500
                          focus:ring-2
                          focus:ring-blue-100
                          ${
                            errors.jobTitle
                              ? "border-red-500"
                              : "border-slate-200"
                          }
                        `}
                      />

                      {errors.jobTitle && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.jobTitle}
                        </p>
                      )}

                    </div>


                    {/* EMAIL */}

                    <div>

                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Email
                        <span className="ml-1 text-red-500">*</span>
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`
                          w-full
                          h-10
                          px-3
                          rounded-xl
                          border
                          bg-white
                          text-sm
                          text-slate-800
                          placeholder:text-slate-400
                          outline-none
                          transition-all
                          duration-200
                          focus:border-blue-500
                          focus:ring-2
                          focus:ring-blue-100
                          ${
                            errors.email
                              ? "border-red-500"
                              : "border-slate-200"
                          }
                        `}
                      />

                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.email}
                        </p>
                      )}

                    </div>


                    {/* PHONE */}

                    <div>

                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Phone
                        <span className="ml-2 text-xs font-normal text-slate-400">
                          Optional
                        </span>
                      </label>

                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        className="
                          w-full
                          h-10
                          px-3
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          text-sm
                          text-slate-800
                          placeholder:text-slate-400
                          outline-none
                          transition-all
                          duration-200
                          focus:border-blue-500
                          focus:ring-2
                          focus:ring-blue-100
                        "
                      />

                    </div>


                    {/* LOCATION */}

                    <div>

                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Location
                        <span className="ml-2 text-xs font-normal text-slate-400">
                          Optional
                        </span>
                      </label>

                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Greater Noida, India"
                        className="
                          w-full
                          h-10
                          px-3
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          text-sm
                          text-slate-800
                          placeholder:text-slate-400
                          outline-none
                          transition-all
                          duration-200
                          focus:border-blue-500
                          focus:ring-2
                          focus:ring-blue-100
                        "
                      />

                    </div>


                    {/* LINKEDIN */}

                    <div>

                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        LinkedIn
                        <span className="ml-2 text-xs font-normal text-slate-400">
                          Optional
                        </span>
                      </label>

                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="linkedin.com/in/yourname"
                        className="
                          w-full
                          h-10
                          px-3
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          text-sm
                          text-slate-800
                          placeholder:text-slate-400
                          outline-none
                          transition-all
                          duration-200
                          focus:border-blue-500
                          focus:ring-2
                          focus:ring-blue-100
                        "
                      />

                    </div>


                    {/* GITHUB */}

                    <div>

                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        GitHub
                        <span className="ml-2 text-xs font-normal text-slate-400">
                          Optional
                        </span>
                      </label>

                      <input
                        type="url"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        placeholder="github.com/yourname"
                        className="
                          w-full
                          h-10
                          px-3
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          text-sm
                          text-slate-800
                          placeholder:text-slate-400
                          outline-none
                          transition-all
                          duration-200
                          focus:border-blue-500
                          focus:ring-2
                          focus:ring-blue-100
                        "
                      />

                    </div>


                    {/* PORTFOLIO */}

                    <div>

                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Portfolio
                        <span className="ml-2 text-xs font-normal text-slate-400">
                          Optional
                        </span>
                      </label>

                      <input
                        type="url"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        placeholder="yourportfolio.com"
                        className="
                          w-full
                          h-10
                          px-3
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          text-sm
                          text-slate-800
                          placeholder:text-slate-400
                          outline-none
                          transition-all
                          duration-200
                          focus:border-blue-500
                          focus:ring-2
                          focus:ring-blue-100
                        "
                      />

                    </div>


                    {/* SAVE CHANGES */}

                    <button
                      type="button"
                      onClick={handleSaveResume}
                      disabled={isSaving}
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        px-4
                        py-2
                        rounded-xl
                        bg-green-100
                        text-green-800
                        text-base
                        font-medium
                        hover:bg-green-200
                        transition-colors
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                      "
                    >
                      {isSaving ? "Saving..." : "Save Changes"}

                      <span className="text-xl leading-none">
                        →
                      </span>

                    </button>

                  </div>

                </>
              )}



              {/* =================================
                  STEP 2 — PROFESSIONAL SUMMARY
              ================================== */}

              {currentStep === 2 && (
                <>

                  <div className="mb-5">

                    <h2 className="text-xl font-semibold text-slate-900">
                      Professional Summary
                    </h2>

                    <p className="text-base text-slate-500 mt-1">
                      Add summary for your resume here
                    </p>

                  </div>


                  <div className="mt-10">

                    <textarea
                      name="summary"
                      value={formData.summary}
                      onChange={handleChange}
                      placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
                      rows="8"
                      className="
                        w-full
                        px-5
                        py-4
                        rounded-xl
                        border
                        border-slate-300
                        bg-white
                        text-base
                        text-slate-700
                        placeholder:text-slate-400
                        outline-none
                        resize-none
                        transition-all
                        duration-200
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100
                      "
                    />

                    <p className="text-sm text-slate-500 text-center mt-3 px-8">
                      Tip: Keep it concise (3-4 sentences) and focus on your
                      most relevant achievements and skills.
                    </p>

                  </div>


                  <div className="mt-8">

                    <button
                      type="button"
                      onClick={handleSaveResume}
                      disabled={isSaving}
                      className="
                        flex
                        items-center
                        justify-center
                        px-7
                        py-3
                        rounded-xl
                        bg-green-100
                        text-green-800
                        text-base
                        font-medium
                        hover:bg-green-200
                        transition-colors
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                      "
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>

                  </div>

                </>
              )}



              {/* =================================
                  STEP 3 — PROFESSIONAL EXPERIENCE
              ================================== */}

              {currentStep === 3 && (
                <>

                  <div className="flex items-start justify-between mb-5">

                    <div>

                      <h2 className="text-xl font-semibold text-slate-900">
                        Professional Experience
                      </h2>

                      <p className="text-base text-slate-500 mt-1">
                        Add your job experience
                      </p>

                    </div>


                    <button
                      type="button"
                      onClick={handleAddExperience}
                      className="
                        flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-xl
                        bg-green-100
                        text-green-700
                        text-base
                        font-medium
                        hover:bg-green-200
                        transition-colors
                      "
                    >

                      <span className="text-xl leading-none">
                        +
                      </span>

                      Add Experience

                    </button>

                  </div>


                  {experiences.length === 0 ? (

                    <div className="flex flex-col items-center justify-center py-20">

                      <Briefcase className="w-14 h-14 text-slate-300 mb-5" />

                      <p className="text-lg text-slate-500 text-center">
                        No work experience added yet.
                      </p>

                      <p className="text-base text-slate-500 text-center mt-1">
                        Click "Add Experience" to get started.
                      </p>

                    </div>

                  ) : (

                    <div className="space-y-5">

                      {experiences.map((experience, index) => (

                        <div
                          key={index}
                          className="
                            border
                            border-slate-200
                            rounded-xl
                            p-5
                            bg-white
                          "
                        >

                          <div className="flex items-center justify-between mb-5">

                            <h3 className="text-lg font-medium text-slate-900">
                              Experience #{index + 1}
                            </h3>

                            <button
                              type="button"
                              onClick={() => removeExperience(index)}
                              className="
                                text-red-500
                                hover:text-red-600
                                transition-colors
                              "
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>

                          </div>


                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <input
                              type="text"
                              value={experience.companyName}
                              onChange={(e) =>
                                updateExperience(index, "companyName", e.target.value)
                              }
                              placeholder="Company Name"
                              className="
                                w-full
                                h-12
                                px-4
                                rounded-xl
                                border
                                border-slate-300
                                bg-white
                                text-base
                                text-slate-700
                                placeholder:text-slate-400
                                outline-none
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-100
                              "
                            />

                            <input
                              type="text"
                              value={experience.jobTitle}
                              onChange={(e) =>
                                updateExperience(index, "jobTitle", e.target.value)
                              }
                              placeholder="Job Title"
                              className="
                                w-full
                                h-12
                                px-4
                                rounded-xl
                                border
                                border-slate-300
                                bg-white
                                text-base
                                text-slate-700
                                placeholder:text-slate-400
                                outline-none
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-100
                              "
                            />

                          </div>


                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                            <input
                              type="month"
                              value={experience.startDate}
                              onChange={(e) =>
                                updateExperience(index, "startDate", e.target.value)
                              }
                              className="
                                w-full
                                h-12
                                px-4
                                rounded-xl
                                border
                                border-slate-300
                                bg-white
                                text-base
                                text-slate-700
                                outline-none
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-100
                              "
                            />

                            <input
                              type="month"
                              value={experience.endDate}
                              disabled={experience.currentlyWorking}
                              onChange={(e) =>
                                updateExperience(index, "endDate", e.target.value)
                              }
                              className="
                                w-full
                                h-12
                                px-4
                                rounded-xl
                                border
                                border-slate-300
                                bg-white
                                text-base
                                text-slate-700
                                outline-none
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-100
                              "
                            />

                          </div>


                          <label className="flex items-center gap-3 mt-5 cursor-pointer">

                            <input
                              type="checkbox"
                              checked={experience.currentlyWorking}
                              onChange={(e) =>
                                updateExperience(
                                  index,
                                  "currentlyWorking",
                                  e.target.checked
                                )
                              }
                              className="w-4 h-4"
                            />

                            <span className="text-base text-slate-700">
                              Currently working here
                            </span>

                          </label>


                          <div className="mt-5">

                            <label className="block text-base font-semibold text-slate-800 mb-3">
                              Job Description
                            </label>

                            <textarea
                              rows="5"
                              value={experience.description}
                              onChange={(e) =>
                                updateExperience(index, "description", e.target.value)
                              }
                              placeholder="Describe your key responsibilities and achievements..."
                              className="
                                w-full
                                px-4
                                py-4
                                rounded-xl
                                border
                                border-slate-300
                                bg-white
                                text-base
                                text-slate-700
                                placeholder:text-slate-400
                                outline-none
                                resize-none
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-100
                              "
                            />

                          </div>

                        </div>

                      ))}

                    </div>

                  )}


                  <div className="mt-8">

                    <button
                      type="button"
                      onClick={handleSaveResume}
                      disabled={isSaving}
                      className="
                        flex
                        items-center
                        justify-center
                        px-7
                        py-3
                        rounded-xl
                        bg-green-100
                        text-green-800
                        text-base
                        font-medium
                        hover:bg-green-200
                        transition-colors
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                      "
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>

                  </div>

                </>
              )}



              {/* =================================
                  STEP 4 — EDUCATION
              ================================== */}

              {currentStep === 4 && (
                <>

                  <div className="flex items-start justify-between mb-5">

                    <div>

                      <h2 className="text-xl font-semibold text-slate-900">
                        Education
                      </h2>

                      <p className="text-base text-slate-500 mt-1">
                        Add your education details
                      </p>

                    </div>


                    <button
                      type="button"
                      onClick={handleAddEducation}
                      className="
                        flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-xl
                        bg-green-100
                        text-green-700
                        text-base
                        font-medium
                        hover:bg-green-200
                        transition-colors
                      "
                    >

                      <span className="text-xl leading-none">
                        +
                      </span>

                      Add Education

                    </button>

                  </div>


                  {education.length === 0 ? (

                    <div className="flex flex-col items-center justify-center py-20">

                      <div className="text-6xl text-slate-300 mb-5">
                        🎓
                      </div>

                      <p className="text-lg text-slate-500 text-center">
                        No education added yet.
                      </p>

                      <p className="text-base text-slate-500 text-center mt-1">
                        Click "Add Education" to get started.
                      </p>

                    </div>

                  ) : (

                    <div className="space-y-5">
                      {education.map((entry, index) => (
                        <div
                          key={index}
                          className="
                            border
                            border-slate-200
                            rounded-xl
                            p-5
                            bg-white
                          "
                        >

                          <div className="flex items-center justify-between mb-5">

                            <h3 className="text-lg font-medium text-slate-900">
                              Education #{index + 1}
                            </h3>

                            <button
                              type="button"
                              onClick={() => removeEducation(index)}
                              className="
                                text-red-500
                                hover:text-red-600
                                transition-colors
                              "
                            >

                              <Trash2 className="w-5 h-5" />

                            </button>

                          </div>


                          {/* INSTITUTION + DEGREE */}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <input
                              type="text"
                              value={entry.institution}
                              onChange={(e) =>
                                updateEducation(index, "institution", e.target.value)
                              }
                              placeholder="Institution Name"
                              className="
                                w-full
                                h-12
                                px-4
                                rounded-xl
                                border
                                border-slate-300
                                bg-white
                                text-base
                                text-slate-700
                                placeholder:text-slate-400
                                outline-none
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-100
                          "
                            />


                            <input
                              type="text"
                              value={entry.degree}
                              onChange={(e) =>
                                updateEducation(index, "degree", e.target.value)
                              }
                              placeholder="Degree (e.g., Bachelor's, Master's)"
                              className="
                                w-full
                                h-12
                                px-4
                                rounded-xl
                                border
                                border-slate-300
                                bg-white
                                text-base
                                text-slate-700
                                placeholder:text-slate-400
                                outline-none
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-100
                          "
                            />

                          </div>


                          {/* FIELD + GRADUATION DATE */}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                            <input
                              type="text"
                              value={entry.field}
                              onChange={(e) =>
                                updateEducation(index, "field", e.target.value)
                              }
                              placeholder="Field of Study"
                              className="
                                w-full
                                h-12
                                px-4
                                rounded-xl
                                border
                                border-slate-300
                                bg-white
                                text-base
                                text-slate-700
                                placeholder:text-slate-400
                                outline-none
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-100
                          "
                            />


                            <input
                              type="month"
                              value={entry.graduationDate}
                              onChange={(e) =>
                                updateEducation(index, "graduationDate", e.target.value)
                              }
                              className="
                                w-full
                                h-12
                                px-4
                                rounded-xl
                                border
                                border-slate-300
                                bg-white
                                text-base
                                text-slate-700
                                outline-none
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-100
                          "
                            />

                          </div>


                          {/* GPA */}

                          <div className="mt-4">

                            <input
                              type="text"
                              value={entry.gpa}
                              onChange={(e) =>
                                updateEducation(index, "gpa", e.target.value)
                              }
                              placeholder="GPA (optional)"
                              className="
                                w-full
                                md:w-1/2
                                h-12
                                px-4
                                rounded-xl
                                border
                                border-slate-300
                                bg-white
                                text-base
                                text-slate-700
                                placeholder:text-slate-400
                                outline-none
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-100
                          "
                            />

                          </div>

                        </div>
                      ))}
                    </div>

                  )}


                  <div className="mt-8">

                    <button
                      type="button"
                      onClick={handleSaveResume}
                      disabled={isSaving}
                      className="
                        flex
                        items-center
                        justify-center
                        px-7
                        py-3
                        rounded-xl
                        bg-green-100
                        text-green-800
                        text-base
                        font-medium
                        hover:bg-green-200
                        transition-colors
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                      "
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>

                  </div>

                </>
              )}



              {/* =================================
                  STEP 5 — SKILLS
              ================================== */}

              {currentStep === 5 && (
                <>

                  {/* HEADER */}

                  <div className="mb-6">

                    <h2 className="text-xl font-semibold text-slate-900">
                      Skills
                    </h2>

                    <p className="text-base text-slate-500 mt-1">
                      Add your technical and soft skills
                    </p>

                  </div>


                  {/* SKILL INPUT + ADD */}

                  <div className="flex items-center gap-3">

                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      onKeyDown={(e) => {

                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddSkill();
                        }

                      }}
                      placeholder="Enter a skill (e.g., JavaScript, Project Management)"
                      className="
                        flex-1
                        h-12
                        px-4
                        rounded-xl
                        border
                        border-slate-300
                        bg-white
                        text-base
                        text-slate-700
                        placeholder:text-slate-400
                        outline-none
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100
                      "
                    />


                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="
                        flex
                        items-center
                        gap-2
                        h-12
                        px-5
                        rounded-xl
                        bg-blue-600
                        text-white
                        text-base
                        font-medium
                        hover:bg-blue-700
                        transition-colors
                      "
                    >

                      <span className="text-xl leading-none">
                        +
                      </span>

                      Add

                    </button>

                  </div>


                  {/* SKILLS LIST */}

                  {skills.length === 0 ? (

                    <div className="flex flex-col items-center justify-center py-12">

                      <div className="text-5xl text-slate-300 mb-5">
                        ✨
                      </div>

                      <p className="text-lg text-slate-500 text-center">
                        No skills added yet.
                      </p>

                      <p className="text-base text-slate-500 text-center mt-1">
                        Add your technical and soft skills above.
                      </p>

                    </div>

                  ) : (

                    <div className="flex flex-wrap gap-3 mt-8">

                      {skills.map((skill, index) => (

                        <div
                          key={index}
                          className="
                            flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-full
                            bg-blue-50
                            text-blue-700
                            text-sm
                            font-medium
                          "
                        >

                          <span>
                            {skill}
                          </span>

                          <button
                            type="button"
                            onClick={() => {

                              const updatedSkills = skills.filter(
                                (_, skillIndex) => skillIndex !== index
                              );

                              setSkills(updatedSkills);

                            }}
                            className="
                              text-blue-500
                              hover:text-red-500
                              transition-colors
                            "
                          >

                            ×

                          </button>

                        </div>

                      ))}

                    </div>

                  )}


                  {/* TIP */}

                  <div
                    className="
                      mt-8
                      p-4
                      rounded-xl
                      bg-blue-50
                      text-blue-800
                      text-base
                      leading-6
                    "
                  >

                    <span className="font-semibold">
                      Tip:
                    </span>{" "}

                    Add 8-12 relevant skills. Include both technical skills
                    (programming languages, tools) and soft skills
                    (leadership, communication).

                  </div>


                  {/* SAVE CHANGES */}

                  <div className="mt-8">

                    <button
                      type="button"
                      onClick={handleSaveResume}
                      disabled={isSaving}
                      className="
                        flex
                        items-center
                        justify-center
                        px-7
                        py-3
                        rounded-xl
                        bg-green-100
                        text-green-800
                        text-base
                        font-medium
                        hover:bg-green-200
                        transition-colors
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                      "
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>

                  </div>

                </>
              )}



              {/* =================================
                  STEP 6 — PROJECTS
              ================================== */}

              {currentStep === 6 && (
                <>

                  {/* HEADER */}

                  <div className="flex items-start justify-between mb-5">

                    <div>

                      <h2 className="text-xl font-semibold text-slate-900">
                        Projects
                      </h2>

                      <p className="text-base text-slate-500 mt-1">
                        Add your projects
                      </p>

                    </div>


                    {/* ADD PROJECT */}

                    <button
                      type="button"
                      onClick={handleAddProject}
                      className="
                        flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-xl
                        bg-green-100
                        text-green-700
                        text-base
                        font-medium
                        hover:bg-green-200
                        transition-colors
                      "
                    >

                      <span className="text-xl leading-none">
                        +
                      </span>

                      Add Project

                    </button>

                  </div>


                  {/* PROJECT CONTENT */}

                  {projects.length === 0 ? (

                    <div className="flex flex-col items-center justify-center py-20">

                      <div className="text-6xl text-slate-300 mb-5">
                        💼
                      </div>

                      <p className="text-lg text-slate-500 text-center">
                        No projects added yet.
                      </p>

                      <p className="text-base text-slate-500 text-center mt-1">
                        Click "Add Project" to get started.
                      </p>

                    </div>

                  ) : (

                    <div className="space-y-5">
                      {projects.map((project, index) => (
                        <div
                          key={index}
                          className="border border-slate-200 rounded-xl p-5 bg-white"
                        >

                          {/* PROJECT HEADER */}

                          <div className="flex items-center justify-between mb-5">

                            <h3 className="text-lg font-medium text-slate-900">
                              Project #{index + 1}
                            </h3>


                            {/* DELETE PROJECT */}

                            <button
                              type="button"
                              onClick={() => removeProject(index)}
                              className="
                                text-red-500
                                hover:text-red-600
                                transition-colors
                              "
                            >

                              <Trash2 className="w-5 h-5" />

                            </button>

                          </div>


                          {/* PROJECT NAME */}

                          <input
                            type="text"
                            value={project.projectName}
                            onChange={(e) =>
                              updateProject(index, "projectName", e.target.value)
                            }
                            placeholder="Project Name"
                            className="
                              w-full
                              h-12
                              px-4
                              rounded-xl
                              border
                              border-slate-300
                              bg-white
                              text-base
                              text-slate-700
                              placeholder:text-slate-400
                              outline-none
                              focus:border-blue-500
                              focus:ring-2
                              focus:ring-blue-100
                            "
                          />


                          {/* PROJECT TYPE */}

                          <input
                            type="text"
                            value={project.projectType}
                            onChange={(e) =>
                              updateProject(index, "projectType", e.target.value)
                            }
                            placeholder="Project Type"
                            className="
                              w-full
                              h-12
                              px-4
                              mt-4
                              rounded-xl
                              border
                              border-slate-300
                              bg-white
                              text-base
                              text-slate-700
                              placeholder:text-slate-400
                              outline-none
                              focus:border-blue-500
                              focus:ring-2
                              focus:ring-blue-100
                            "
                          />


                          {/* PROJECT DESCRIPTION */}

                          <textarea
                            value={project.description}
                            onChange={(e) =>
                              updateProject(index, "description", e.target.value)
                            }
                            placeholder="Describe your project..."
                            rows="5"
                            className="
                              w-full
                              px-4
                              py-4
                              mt-4
                              rounded-xl
                              border
                              border-slate-300
                              bg-white
                              text-base
                              text-slate-700
                              placeholder:text-slate-400
                              outline-none
                              resize-none
                              focus:border-blue-500
                              focus:ring-2
                              focus:ring-blue-100
                            "
                          />

                        </div>
                      ))}
                    </div>

                  )}


                  {/* SAVE CHANGES */}

                  <div className="mt-8">

                    <button
                      type="button"
                      onClick={handleSaveResume}
                      disabled={isSaving}
                      className="
                        flex
                        items-center
                        justify-center
                        px-7
                        py-3
                        rounded-xl
                        bg-green-100
                        text-green-800
                        text-base
                        font-medium
                        hover:bg-green-200
                        transition-colors
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                      "
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>

                  </div>

                </>
              )}

            </div>

          </div>



          {/* =================================
              RIGHT SIDE — LIVE PREVIEW
          ================================== */}

          <div className="w-full">

            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Live Preview
              </h2>

              <button
                type="button"
                onClick={handleDownloadResume}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-4
                  py-2
                  rounded-xl
                  bg-blue-600
                  text-white
                  text-sm
                  font-medium
                  hover:bg-blue-700
                  transition-colors
                  print-hidden
                "
              >
                Print / Save PDF
              </button>
            </div>

            <div className="w-full flex justify-center overflow-hidden pb-4">

              {selectedTemplate === 1 ? (
                <Template1 resume={resumeData} />
              ) : (
                <Template2 resume={resumeData} />
              )}

            </div>

          </div>     

        </div>

      </main>

    </div>

  );
}

export default CreateResume;