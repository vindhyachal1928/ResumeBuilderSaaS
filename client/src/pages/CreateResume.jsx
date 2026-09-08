import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Plus,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const defaultFormData = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  location: "",
  photo: "",
  summary: "",
  skills: "",
  experience: "",
  education: "",
  projects: "",
  certificates: "",
  linkedin: "",
  github: "",
  portfolio: "",
  template: "Template 1",
};

const createExperience = () => ({
  jobTitle: "",
  company: "",
  startDate: "",
  endDate: "",
  description: "",
});

const createProject = () => ({
  name: "",
  technologies: "",
  description: "",
});

const createEducation = () => ({
  degree: "",
  institution: "",
  startDate: "",
  endDate: "",
  grade: "",
});

function CreateResume() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);

  const [formData, setFormData] = useState(() => {
    if (!id) {
      try {
        const savedDraft = localStorage.getItem("resumeDraft");

        if (savedDraft) {
          const parsedDraft = JSON.parse(savedDraft);

          return {
            ...defaultFormData,
            ...parsedDraft,
            template:
              parsedDraft.template === "professional" ||
              parsedDraft.template === "modern" ||
              parsedDraft.template === "minimal"
                ? "Template 1"
                : parsedDraft.template || "Template 1",
          };
        }
      } catch (error) {
        console.error("Failed to restore resume draft:", error);
      }
    }

    return defaultFormData;
  });

  const [experiences, setExperiences] = useState([
    createExperience(),
  ]);

  const [projects, setProjects] = useState([
    createProject(),
  ]);

  const [educationEntries, setEducationEntries] = useState([
    createEducation(),
  ]);

  // =========================================================
  // RESTORE STRUCTURED DRAFT
  // =========================================================

  useEffect(() => {
    if (isEditMode) return;

    try {
      const savedStructuredData = localStorage.getItem(
        "resumeStructuredDraft"
      );

      if (!savedStructuredData) return;

      const parsedData = JSON.parse(savedStructuredData);

      if (
        Array.isArray(parsedData.experiences) &&
        parsedData.experiences.length > 0
      ) {
        setExperiences(parsedData.experiences);
      }

      if (
        Array.isArray(parsedData.projects) &&
        parsedData.projects.length > 0
      ) {
        setProjects(parsedData.projects);
      }

      if (
        Array.isArray(parsedData.educationEntries) &&
        parsedData.educationEntries.length > 0
      ) {
        setEducationEntries(parsedData.educationEntries);
      }
    } catch (error) {
      console.error(
        "Failed to restore structured draft:",
        error
      );
    }
  }, [isEditMode]);

  // =========================================================
  // CHECK DRAFT
  // =========================================================

  useEffect(() => {
    if (isEditMode) return;

    try {
      const savedDraft = localStorage.getItem("resumeDraft");
      const savedStructuredDraft = localStorage.getItem(
        "resumeStructuredDraft"
      );

      if (savedDraft || savedStructuredDraft) {
        setDraftRestored(true);
        setIsDirty(true);
      }
    } catch (error) {
      console.error("Failed to check saved draft:", error);
    }
  }, [isEditMode]);

  // =========================================================
  // FETCH EXISTING RESUME
  // =========================================================

  useEffect(() => {
    if (!isEditMode) return;

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

        const resume = data.resume;

        let selectedTemplate = resume.template;

        if (
          selectedTemplate === "professional" ||
          selectedTemplate === "modern" ||
          selectedTemplate === "minimal"
        ) {
          selectedTemplate = "Template 1";
        }

        if (
          selectedTemplate !== "Template 1" &&
          selectedTemplate !== "Template 2"
        ) {
          selectedTemplate = "Template 1";
        }

        setFormData({
          fullName: resume.fullName || "",
          jobTitle: resume.jobTitle || "",
          email: resume.email || "",
          phone: resume.phone || "",
          location: resume.location || "",
          photo: resume.photo || resume.photoUrl || "",
          summary: resume.summary || "",
          skills: resume.skills || "",
          experience: resume.experience || "",
          education: resume.education || "",
          projects: resume.projects || "",
          certificates: resume.certificates || "",
          linkedin: resume.linkedin || "",
          github: resume.github || "",
          portfolio: resume.portfolio || "",
          template: selectedTemplate,
        });

        if (resume.experience) {
          setExperiences([
            {
              ...createExperience(),
              description: resume.experience,
            },
          ]);
        }

        if (resume.projects) {
          setProjects([
            {
              ...createProject(),
              description: resume.projects,
            },
          ]);
        }

        if (resume.education) {
          setEducationEntries([
            {
              ...createEducation(),
              degree: resume.education,
            },
          ]);
        }
      } catch (error) {
        console.error("Fetch resume error:", error);

        alert("Something went wrong");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id, isEditMode, navigate]);

  // =========================================================
  // AUTO SAVE
  // =========================================================

  useEffect(() => {
    if (isEditMode || !isDirty) return;

    try {
      localStorage.setItem(
        "resumeDraft",
        JSON.stringify(formData)
      );
    } catch (error) {
      console.error("Failed to save resume draft:", error);
    }
  }, [formData, isDirty, isEditMode]);

  useEffect(() => {
    if (isEditMode || !isDirty) return;

    try {
      localStorage.setItem(
        "resumeStructuredDraft",
        JSON.stringify({
          experiences,
          projects,
          educationEntries,
        })
      );
    } catch (error) {
      console.error(
        "Failed to save structured draft:",
        error
      );
    }
  }, [
    experiences,
    projects,
    educationEntries,
    isDirty,
    isEditMode,
  ]);

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setIsDirty(true);

    if (errors[name]) {
      setErrors((previousErrors) => {
        const updatedErrors = {
          ...previousErrors,
        };

        delete updatedErrors[name];

        return updatedErrors;
      });
    }
  };

  // =========================================================
  // PROFILE PHOTO
  // =========================================================

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Photo size should be less than 2MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((previousData) => ({
        ...previousData,
        photo: reader.result,
      }));
      setIsDirty(true);
    };

    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setFormData((previousData) => ({
      ...previousData,
      photo: "",
    }));
    setIsDirty(true);
  };

  // =========================================================
  // EXPERIENCE
  // =========================================================

  const handleExperienceChange = (
    index,
    field,
    value
  ) => {
    setExperiences((previous) => {
      const updated = [...previous];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return updated;
    });

    setIsDirty(true);
  };

  const addExperience = () => {
    setExperiences((previous) => [
      ...previous,
      createExperience(),
    ]);

    setIsDirty(true);
  };

  const removeExperience = (index) => {
    if (experiences.length === 1) {
      setExperiences([createExperience()]);
    } else {
      setExperiences((previous) =>
        previous.filter((_, i) => i !== index)
      );
    }

    setIsDirty(true);
  };

  const duplicateExperience = (index) => {
    setExperiences((previous) => {
      const updated = [...previous];

      updated.splice(index + 1, 0, {
        ...previous[index],
      });

      return updated;
    });

    setIsDirty(true);
  };

  const moveExperienceUp = (index) => {
    if (index === 0) return;

    setExperiences((previous) => {
      const updated = [...previous];

      [updated[index - 1], updated[index]] = [
        updated[index],
        updated[index - 1],
      ];

      return updated;
    });

    setIsDirty(true);
  };

  const moveExperienceDown = (index) => {
    if (index === experiences.length - 1) return;

    setExperiences((previous) => {
      const updated = [...previous];

      [updated[index], updated[index + 1]] = [
        updated[index + 1],
        updated[index],
      ];

      return updated;
    });

    setIsDirty(true);
  };

  // =========================================================
  // PROJECTS
  // =========================================================

  const handleProjectChange = (
    index,
    field,
    value
  ) => {
    setProjects((previous) => {
      const updated = [...previous];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return updated;
    });

    setIsDirty(true);
  };

  const addProject = () => {
    setProjects((previous) => [
      ...previous,
      createProject(),
    ]);

    setIsDirty(true);
  };

  const removeProject = (index) => {
    if (projects.length === 1) {
      setProjects([createProject()]);
    } else {
      setProjects((previous) =>
        previous.filter((_, i) => i !== index)
      );
    }

    setIsDirty(true);
  };

  const duplicateProject = (index) => {
    setProjects((previous) => {
      const updated = [...previous];

      updated.splice(index + 1, 0, {
        ...previous[index],
      });

      return updated;
    });

    setIsDirty(true);
  };

  const moveProjectUp = (index) => {
    if (index === 0) return;

    setProjects((previous) => {
      const updated = [...previous];

      [updated[index - 1], updated[index]] = [
        updated[index],
        updated[index - 1],
      ];

      return updated;
    });

    setIsDirty(true);
  };

  const moveProjectDown = (index) => {
    if (index === projects.length - 1) return;

    setProjects((previous) => {
      const updated = [...previous];

      [updated[index], updated[index + 1]] = [
        updated[index + 1],
        updated[index],
      ];

      return updated;
    });

    setIsDirty(true);
  };

  // =========================================================
  // EDUCATION
  // =========================================================

  const handleEducationChange = (
    index,
    field,
    value
  ) => {
    setEducationEntries((previous) => {
      const updated = [...previous];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return updated;
    });

    setIsDirty(true);
  };

  const addEducation = () => {
    setEducationEntries((previous) => [
      ...previous,
      createEducation(),
    ]);

    setIsDirty(true);
  };

  const removeEducation = (index) => {
    if (educationEntries.length === 1) {
      setEducationEntries([createEducation()]);
    } else {
      setEducationEntries((previous) =>
        previous.filter((_, i) => i !== index)
      );
    }

    setIsDirty(true);
  };

  const duplicateEducation = (index) => {
    setEducationEntries((previous) => {
      const updated = [...previous];

      updated.splice(index + 1, 0, {
        ...previous[index],
      });

      return updated;
    });

    setIsDirty(true);
  };

  const moveEducationUp = (index) => {
    if (index === 0) return;

    setEducationEntries((previous) => {
      const updated = [...previous];

      [updated[index - 1], updated[index]] = [
        updated[index],
        updated[index - 1],
      ];

      return updated;
    });

    setIsDirty(true);
  };

  const moveEducationDown = (index) => {
    if (index === educationEntries.length - 1) {
      return;
    }

    setEducationEntries((previous) => {
      const updated = [...previous];

      [updated[index], updated[index + 1]] = [
        updated[index + 1],
        updated[index],
      ];

      return updated;
    });

    setIsDirty(true);
  };

  // =========================================================
  // TEMPLATE
  // =========================================================

  const handleTemplateChange = (templateName) => {
    setFormData((previous) => ({
      ...previous,
      template: templateName,
    }));

    setIsDirty(true);
  };

  // =========================================================
  // BUILD DATABASE STRINGS
  // =========================================================

  const buildExperienceText = () => {
    return experiences
      .map((experience) => {
        const parts = [];

        if (experience.jobTitle) {
          parts.push(experience.jobTitle);
        }

        if (experience.company) {
          parts.push(experience.company);
        }

        if (
          experience.startDate ||
          experience.endDate
        ) {
          parts.push(
            `${experience.startDate || ""}${
              experience.startDate ||
              experience.endDate
                ? " - "
                : ""
            }${experience.endDate || ""}`
          );
        }

        if (experience.description) {
          parts.push(experience.description);
        }

        return parts.join("\n");
      })
      .filter((item) => item.trim())
      .join("\n\n");
  };

  const buildProjectText = () => {
    return projects
      .map((project) => {
        const parts = [];

        if (project.name) {
          parts.push(project.name);
        }

        if (project.technologies) {
          parts.push(
            `Technologies: ${project.technologies}`
          );
        }

        if (project.description) {
          parts.push(project.description);
        }

        return parts.join("\n");
      })
      .filter((item) => item.trim())
      .join("\n\n");
  };

  const buildEducationText = () => {
    return educationEntries
      .map((education) => {
        const parts = [];

        if (education.degree) {
          parts.push(education.degree);
        }

        if (education.institution) {
          parts.push(education.institution);
        }

        if (
          education.startDate ||
          education.endDate
        ) {
          parts.push(
            `${education.startDate || ""}${
              education.startDate ||
              education.endDate
                ? " - "
                : ""
            }${education.endDate || ""}`
          );
        }

        if (education.grade) {
          parts.push(education.grade);
        }

        return parts.join("\n");
      })
      .filter((item) => item.trim())
      .join("\n\n");
  };

  // =========================================================
  // CLEAR DRAFT
  // =========================================================

  const handleClearDraft = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your saved draft?"
    );

    if (!confirmed) return;

    localStorage.removeItem("resumeDraft");
    localStorage.removeItem(
      "resumeStructuredDraft"
    );

    setFormData({
      ...defaultFormData,
    });

    setExperiences([createExperience()]);
    setProjects([createProject()]);
    setEducationEntries([createEducation()]);

    setErrors({});
    setIsDirty(false);
    setDraftRestored(false);
  };

  // =========================================================
  // CANCEL
  // =========================================================

  const handleCancel = () => {
    if (saving) return;

    if (isDirty) {
      const confirmed = window.confirm(
        "Are you sure you want to leave? Your unsaved changes will be lost."
      );

      if (!confirmed) return;
    }

    navigate("/dashboard");
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName =
        "Please enter your full name.";
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle =
        "Please enter your professional title.";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Please enter your email.";
    } else {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email)) {
        newErrors.email =
          "Please enter a valid email address.";
      }
    }

    if (formData.summary.trim().length < 50) {
      newErrors.summary =
        "Professional Summary should be at least 50 characters.";
    }

    if (!formData.skills.trim()) {
      newErrors.skills =
        "Please enter at least one skill.";
    }

    experiences.forEach((experience, index) => {
      const hasData =
        experience.jobTitle ||
        experience.company ||
        experience.startDate ||
        experience.endDate ||
        experience.description;

      if (!hasData) return;

      if (!experience.jobTitle.trim()) {
        newErrors[
          `experience-${index}-jobTitle`
        ] = "Please enter the job title or role.";
      }

      if (!experience.company.trim()) {
        newErrors[
          `experience-${index}-company`
        ] = "Please enter the company name.";
      }

      if (!experience.description.trim()) {
        newErrors[
          `experience-${index}-description`
        ] =
          "Please describe your responsibilities or achievements.";
      }
    });

    projects.forEach((project, index) => {
      const hasData =
        project.name ||
        project.technologies ||
        project.description;

      if (!hasData) return;

      if (!project.name.trim()) {
        newErrors[
          `project-${index}-name`
        ] = "Please enter the project name.";
      }

      if (!project.description.trim()) {
        newErrors[
          `project-${index}-description`
        ] = "Please describe your project.";
      }
    });

    educationEntries.forEach((education, index) => {
      const hasData =
        education.degree ||
        education.institution ||
        education.startDate ||
        education.endDate ||
        education.grade;

      if (!hasData) return;

      if (!education.degree.trim()) {
        newErrors[
          `education-${index}-degree`
        ] =
          "Please enter your degree or qualification.";
      }

      if (!education.institution.trim()) {
        newErrors[
          `education-${index}-institution`
        ] = "Please enter your institution.";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (saving) return;

    if (!validateForm()) return;

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const finalFormData = {
        ...formData,
        experience: buildExperienceText(),
        projects: buildProjectText(),
        education: buildEducationText(),
      };

      const url = isEditMode
        ? `http://localhost:5000/api/resumes/${id}`
        : "http://localhost:5000/api/resumes";

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message || "Failed to save resume"
        );
        return;
      }

      alert(
        isEditMode
          ? "Resume updated successfully"
          : "Resume created successfully"
      );

      if (!isEditMode) {
        localStorage.removeItem("resumeDraft");
        localStorage.removeItem(
          "resumeStructuredDraft"
        );
      }

      setIsDirty(false);
      setDraftRestored(false);

      const resumeId =
        data.resume?._id || id;

      navigate(`/resume/${resumeId}`);
    } catch (error) {
      console.error("Save resume error:", error);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // PREVIEW HELPERS
  // =========================================================

  const skillsList = formData.skills
    ? formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "")
    : [];

  const getSafeUrl = (url) => {
    if (!url || !url.trim()) return "#";

    const trimmedUrl = url.trim();

    if (
      trimmedUrl.startsWith("http://") ||
      trimmedUrl.startsWith("https://")
    ) {
      return trimmedUrl;
    }

    return `https://${trimmedUrl}`;
  };

  const formatContent = (content) => {
    if (!content || !content.trim()) return [];

    return content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")
      .map((line) => {
        const isBullet =
          line.startsWith("-") ||
          line.startsWith("•") ||
          line.startsWith("*");

        return {
          type: isBullet ? "bullet" : "text",
          text: isBullet
            ? line.substring(1).trim()
            : line,
        };
      });
  };

  const renderContentItems = (items) => {
    return (
      <div className="mt-3 space-y-1.5">
        {items.map((item, index) =>
          item.type === "bullet" ? (
            <div
              key={index}
              className="flex items-start gap-2 text-[11px] text-gray-700 leading-[1.6]"
            >
              <span>•</span>
              <span className="flex-1">
                {item.text}
              </span>
            </div>
          ) : (
            <p
              key={index}
              className="text-[11px] text-gray-700 leading-[1.6]"
            >
              {item.text}
            </p>
          )
        )}
      </div>
    );
  };

  const certificateItems = formatContent(
    formData.certificates
  );

  const isTemplate2 =
    formData.template === "Template 2";

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-gray-600">
            Loading resume...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* PAGE HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditMode
                ? "Edit Resume"
                : "Create Resume"}
            </h1>

            <p className="text-gray-600 mt-1">
              Build your professional resume
            </p>
          </div>

          <button
            type="button"
            onClick={handleCancel}
            disabled={saving}
            className="px-5 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* DRAFT */}

        {draftRestored && !isEditMode && (
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
            <div>
              <p className="font-medium text-blue-800">
                Draft restored
              </p>

              <p className="text-sm text-blue-700">
                Your previous resume draft has been restored automatically.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClearDraft}
              disabled={saving}
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              Clear Draft
            </button>
          </div>
        )}

        {/* MAIN */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* ================================================= */}
          {/* LEFT FORM */}
          {/* ================================================= */}

          <div className="bg-white rounded-xl shadow-md p-6">
            <form onSubmit={handleSubmit}>

              {/* BASIC INFORMATION */}

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-5">
                  Basic Information
                </h2>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name{" "}
                    <span className="text-red-500">
                      *
                    </span>

                    <span className="ml-2 text-xs text-gray-500">
                      Required
                    </span>
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Vindhyachal Gupta"
                    className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.fullName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Title{" "}
                    <span className="text-red-500">
                      *
                    </span>

                    <span className="ml-2 text-xs text-gray-500">
                      Required
                    </span>
                  </label>

                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="Java Developer"
                    className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.jobTitle
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {errors.jobTitle && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.jobTitle}
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email{" "}
                    <span className="text-red-500">
                      *
                    </span>

                    <span className="ml-2 text-xs text-gray-500">
                      Required
                    </span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone{" "}
                    <span className="ml-2 text-xs text-gray-500">
                      Optional
                    </span>
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location{" "}
                    <span className="ml-2 text-xs text-gray-500">
                      Optional
                    </span>
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Greater Noida, India"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* PROFILE PHOTO */}

                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Photo{" "}
                    <span className="ml-2 text-xs text-gray-500">
                      Optional
                    </span>
                  </label>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handlePhotoChange}
                    disabled={saving}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-white file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-medium"
                  />

                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG or WEBP. Maximum size: 2MB.
                  </p>

                  {formData.photo && (
                    <div className="mt-4 flex items-start gap-4">
                      <img
                        src={formData.photo}
                        alt="Profile Preview"
                        className="w-[100px] h-[120px] object-cover border border-gray-300 rounded-lg"
                      />

                      <button
                        type="button"
                        onClick={removePhoto}
                        disabled={saving}
                        className="px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Remove Photo
                      </button>
                    </div>
                  )}
                </div>
              </section>

              {/* SUMMARY */}

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-5">
                  Professional Summary
                </h2>

                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  rows="6"
                  maxLength="500"
                  placeholder="Write a short professional summary..."
                  className={`w-full rounded-lg border px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500 ${
                    errors.summary
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                <div className="flex justify-between mt-1">
                  <p className="text-xs text-gray-500">
                    Minimum 50 characters recommended.
                  </p>

                  <p className="text-xs text-gray-500">
                    {formData.summary.length}/500
                  </p>
                </div>

                {errors.summary && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.summary}
                  </p>
                )}
              </section>

              {/* SKILLS */}

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-5">
                  Skills
                </h2>

                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Java, JavaScript, React, Node.js, MongoDB"
                  className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.skills
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                <p className="text-xs text-gray-500 mt-1">
                  Separate skills using commas.
                </p>

                {errors.skills && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.skills}
                  </p>
                )}
              </section>

              {/* EDUCATION */}

              <section className="mb-8">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Education
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Add your educational qualifications.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addEducation}
                    disabled={saving}
                    className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    <Plus size={16} />
                    Add Education
                  </button>
                </div>

                <div className="space-y-5">
                  {educationEntries.map(
                    (education, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                      >
                        <div className="flex items-center justify-between mb-5">
                          <h3 className="font-semibold text-gray-800">
                            Education #{index + 1}
                          </h3>

                          <div className="flex gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                moveEducationUp(index)
                              }
                              disabled={
                                index === 0 ||
                                saving
                              }
                              className="p-2 rounded border bg-white disabled:opacity-30"
                            >
                              <ChevronUp size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                moveEducationDown(index)
                              }
                              disabled={
                                index ===
                                  educationEntries.length - 1 ||
                                saving
                              }
                              className="p-2 rounded border bg-white disabled:opacity-30"
                            >
                              <ChevronDown size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                duplicateEducation(index)
                              }
                              disabled={saving}
                              className="p-2 rounded border bg-white"
                            >
                              <Copy size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                removeEducation(index)
                              }
                              disabled={saving}
                              className="p-2 rounded border border-red-200 bg-white text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <input
                              type="text"
                              value={education.degree}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "degree",
                                  e.target.value
                                )
                              }
                              placeholder="B.Tech in Computer Science"
                              className={`w-full rounded-lg border px-4 py-3 outline-none ${
                                errors[
                                  `education-${index}-degree`
                                ]
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />

                            {errors[
                              `education-${index}-degree`
                            ] && (
                              <p className="mt-1 text-sm text-red-600">
                                {
                                  errors[
                                    `education-${index}-degree`
                                  ]
                                }
                              </p>
                            )}
                          </div>

                          <div>
                            <input
                              type="text"
                              value={education.institution}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "institution",
                                  e.target.value
                                )
                              }
                              placeholder="Sharda University"
                              className={`w-full rounded-lg border px-4 py-3 outline-none ${
                                errors[
                                  `education-${index}-institution`
                                ]
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />

                            {errors[
                              `education-${index}-institution`
                            ] && (
                              <p className="mt-1 text-sm text-red-600">
                                {
                                  errors[
                                    `education-${index}-institution`
                                  ]
                                }
                              </p>
                            )}
                          </div>

                          <input
                            type="text"
                            value={education.startDate}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "startDate",
                                e.target.value
                              )
                            }
                            placeholder="2023"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                          />

                          <input
                            type="text"
                            value={education.endDate}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "endDate",
                                e.target.value
                              )
                            }
                            placeholder="2027"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                          />

                          <input
                            type="text"
                            value={education.grade}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "grade",
                                e.target.value
                              )
                            }
                            placeholder="CGPA: 8.3/10"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none md:col-span-2"
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>

              {/* PROJECTS */}

              <section className="mb-8">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Projects
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Add projects that demonstrate your skills.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addProject}
                    disabled={saving}
                    className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    <Plus size={16} />
                    Add Project
                  </button>
                </div>

                <div className="space-y-5">
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                    >
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="font-semibold text-gray-800">
                          Project #{index + 1}
                        </h3>

                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              moveProjectUp(index)
                            }
                            disabled={
                              index === 0 ||
                              saving
                            }
                            className="p-2 rounded border bg-white disabled:opacity-30"
                          >
                            <ChevronUp size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              moveProjectDown(index)
                            }
                            disabled={
                              index === projects.length - 1 ||
                              saving
                            }
                            className="p-2 rounded border bg-white disabled:opacity-30"
                          >
                            <ChevronDown size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              duplicateProject(index)
                            }
                            disabled={saving}
                            className="p-2 rounded border bg-white"
                          >
                            <Copy size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              removeProject(index)
                            }
                            disabled={saving}
                            className="p-2 rounded border border-red-200 bg-white text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Resume Builder SaaS"
                        className={`w-full rounded-lg border px-4 py-3 outline-none mb-4 ${
                          errors[
                            `project-${index}-name`
                          ]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />

                      {errors[
                        `project-${index}-name`
                      ] && (
                        <p className="mb-3 text-sm text-red-600">
                          {
                            errors[
                              `project-${index}-name`
                            ]
                          }
                        </p>
                      )}

                      <input
                        type="text"
                        value={project.technologies}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "technologies",
                            e.target.value
                          )
                        }
                        placeholder="React, Node.js, Express, MongoDB"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none mb-4"
                      />

                      <textarea
                        value={project.description}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows="5"
                        placeholder="- Built a full-stack resume builder&#10;- Implemented JWT authentication&#10;- Added MongoDB database"
                        className={`w-full rounded-lg border px-4 py-3 outline-none resize-none ${
                          errors[
                            `project-${index}-description`
                          ]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />

                      {errors[
                        `project-${index}-description`
                      ] && (
                        <p className="mt-1 text-sm text-red-600">
                          {
                            errors[
                              `project-${index}-description`
                            ]
                          }
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* EXPERIENCE */}

              <section className="mb-8">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Experience
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Add internships, jobs, or professional experience.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addExperience}
                    disabled={saving}
                    className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    <Plus size={16} />
                    Add Experience
                  </button>
                </div>

                <div className="space-y-5">
                  {experiences.map(
                    (experience, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                      >
                        <div className="flex items-center justify-between mb-5">
                          <h3 className="font-semibold text-gray-800">
                            Experience #{index + 1}
                          </h3>

                          <div className="flex gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                moveExperienceUp(index)
                              }
                              disabled={
                                index === 0 ||
                                saving
                              }
                              className="p-2 rounded border bg-white disabled:opacity-30"
                            >
                              <ChevronUp size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                moveExperienceDown(index)
                              }
                              disabled={
                                index === experiences.length - 1 ||
                                saving
                              }
                              className="p-2 rounded border bg-white disabled:opacity-30"
                            >
                              <ChevronDown size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                duplicateExperience(index)
                              }
                              disabled={saving}
                              className="p-2 rounded border bg-white"
                            >
                              <Copy size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                removeExperience(index)
                              }
                              disabled={saving}
                              className="p-2 rounded border border-red-200 bg-white text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={experience.jobTitle}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "jobTitle",
                                e.target.value
                              )
                            }
                            placeholder="Job Title / Role"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                          />

                          <input
                            type="text"
                            value={experience.company}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "company",
                                e.target.value
                              )
                            }
                            placeholder="Company"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                          />

                          <input
                            type="text"
                            value={experience.startDate}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "startDate",
                                e.target.value
                              )
                            }
                            placeholder="Start Date"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                          />

                          <input
                            type="text"
                            value={experience.endDate}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "endDate",
                                e.target.value
                              )
                            }
                            placeholder="End Date / Present"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                          />

                          <textarea
                            value={experience.description}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            rows="5"
                            placeholder="Describe responsibilities and achievements. Start a line with - for bullet points."
                            className="md:col-span-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none resize-none"
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>

              {/* CERTIFICATIONS */}

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-5">
                  Certifications
                </h2>

                <textarea
                  name="certificates"
                  value={formData.certificates}
                  onChange={handleChange}
                  rows="5"
                  placeholder="AWS Cloud Practitioner&#10;- MongoDB Developer Certification"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none resize-none"
                />
              </section>

              {/* SOCIAL LINKS */}

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-5">
                  Social & Portfolio Links
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn{" "}
                      <span className="text-xs text-gray-500">
                        Optional
                      </span>
                    </label>

                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/yourname"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GitHub{" "}
                      <span className="text-xs text-gray-500">
                        Optional
                      </span>
                    </label>

                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      placeholder="https://github.com/yourname"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio{" "}
                      <span className="text-xs text-gray-500">
                        Optional
                      </span>
                    </label>

                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="https://yourportfolio.com"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
                    />
                  </div>
                </div>
              </section>

              {/* TEMPLATE SELECTION */}

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Choose Resume Template
                </h2>

                <p className="text-sm text-gray-500 mb-5">
                  Select a template. Your live preview will update immediately.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* TEMPLATE 1 */}

                  <button
                    type="button"
                    onClick={() =>
                      handleTemplateChange("Template 1")
                    }
                    className={`relative text-left rounded-xl border-2 p-4 transition ${
                      formData.template === "Template 1"
                        ? "border-blue-600 bg-blue-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-blue-300"
                    }`}
                  >
                    {formData.template === "Template 1" && (
                      <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        ✓
                      </div>
                    )}

                    <h3 className="font-semibold text-gray-900">
                      Template 1
                    </h3>

                    <div className="mt-3 h-32 border border-gray-200 rounded-md bg-white p-3">
                      <div className="text-center border-b border-gray-300 pb-2">
                        <div className="h-2 w-24 bg-gray-800 mx-auto rounded" />
                        <div className="h-1.5 w-20 bg-gray-300 mx-auto mt-2 rounded" />
                      </div>

                      <div className="mt-3">
                        <div className="h-1.5 w-20 bg-gray-700 rounded" />
                        <div className="h-1 w-full bg-gray-200 rounded mt-2" />
                        <div className="h-1 w-5/6 bg-gray-200 rounded mt-1" />
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-3">
                      Clean and ATS-friendly
                    </p>
                  </button>

                  {/* TEMPLATE 2 */}

                  <button
                    type="button"
                    onClick={() =>
                      handleTemplateChange("Template 2")
                    }
                    className={`relative text-left rounded-xl border-2 p-4 transition ${
                      formData.template === "Template 2"
                        ? "border-blue-600 bg-blue-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-blue-300"
                    }`}
                  >
                    {formData.template === "Template 2" && (
                      <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        ✓
                      </div>
                    )}

                    <h3 className="font-semibold text-gray-900">
                      Template 2
                    </h3>

                    <div className="mt-3 h-32 border border-gray-200 rounded-md bg-white p-3">
                      <div className="text-left border-b-2 border-gray-900 pb-2">
                        <div className="h-2 w-24 bg-gray-800 rounded" />
                        <div className="h-1.5 w-20 bg-gray-400 mt-2 rounded" />
                      </div>

                      <div className="mt-3">
                        <div className="h-1.5 w-16 bg-gray-700 rounded" />
                        <div className="h-1 w-full bg-gray-200 rounded mt-2" />
                        <div className="h-1 w-4/5 bg-gray-200 rounded mt-1" />
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-3">
                      Professional and structured
                    </p>
                  </button>
                </div>
              </section>

              {/* BUTTONS */}

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-lg bg-blue-600 text-white px-6 py-3 font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving
                    ? isEditMode
                      ? "Updating..."
                      : "Creating..."
                    : isEditMode
                    ? "Update Resume"
                    : "Create Resume"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* ================================================= */}
          {/* RIGHT LIVE PREVIEW */}
          {/* ================================================= */}

          <div className="xl:sticky xl:top-6 xl:self-start">

            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Live Preview
                </h2>

                <p className="text-sm text-gray-500">
                  {formData.template}
                </p>
              </div>

              <div className="hidden md:block text-xs text-gray-500">
                A4 Preview
              </div>
            </div>

            {/* FIXED PREVIEW CONTAINER */}

            <div className="w-full flex justify-center overflow-hidden pb-4">

              {/* A4 PAGE */}

              <div
                className={`resume-page w-[794px] min-h-[1123px] shrink-0 bg-white shadow-xl px-[60px] py-[55px] ${
                  isTemplate2
                    ? "border-t-[5px] border-gray-900"
                    : ""
                }`}
                style={{
                  zoom: "0.82",
                }}
              >

                {/* HEADER */}

                <header
                  className={
                    isTemplate2
                      ? "text-left border-b-2 border-gray-900 pb-5"
                      : "text-center border-b border-gray-400 pb-5"
                  }
                >
                  {isTemplate2 ? (
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1 min-w-0">
                        <h1 className="text-[30px] font-bold tracking-tight text-gray-900 uppercase">
                          {formData.fullName || "Your Name"}
                        </h1>

                        <p className="text-[16px] text-gray-600 mt-2">
                          {formData.jobTitle || "Professional Title"}
                        </p>
                      </div>

                      <div className="shrink-0">
                        {formData.photo ? (
                          <img
                            src={formData.photo}
                            alt="Profile Preview"
                            className="w-[100px] h-[115px] object-cover border border-gray-400"
                          />
                        ) : (
                          <div className="w-[100px] h-[115px] border-2 border-gray-400 flex items-center justify-center text-[9px] font-semibold text-gray-500 uppercase">
                            Photo
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-[30px] font-bold tracking-tight text-gray-900">
                        {formData.fullName || "Your Name"}
                      </h1>

                      <p className="text-[16px] text-gray-600 mt-2">
                        {formData.jobTitle || "Professional Title"}
                      </p>
                    </>
                  )}

                  {/* CONTACT */}

                  {(formData.email ||
                    formData.phone ||
                    formData.location) && (
                    <div
                      className={`flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-[10px] text-gray-600 ${
                        isTemplate2
                          ? "justify-start"
                          : "justify-center"
                      }`}
                    >
                      {formData.email && (
                        <div className="flex items-center gap-1.5">
                          <Mail size={12} />
                          <span>
                            {formData.email}
                          </span>
                        </div>
                      )}

                      {formData.phone && (
                        <div className="flex items-center gap-1.5">
                          <Phone size={12} />
                          <span>
                            {formData.phone}
                          </span>
                        </div>
                      )}

                      {formData.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} />
                          <span>
                            {formData.location}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* SOCIAL LINKS */}

                  {(formData.linkedin ||
                    formData.github ||
                    formData.portfolio) && (
                    <div
                      className={`flex flex-wrap items-center gap-4 mt-3 text-[10px] ${
                        isTemplate2
                          ? "justify-start"
                          : "justify-center"
                      }`}
                    >
                      {formData.linkedin && (
                        <a
                          href={getSafeUrl(
                            formData.linkedin
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 hover:underline"
                        >
                          <span className="font-bold border border-gray-500 rounded px-1">
                            in
                          </span>

                          <span>
                            LinkedIn
                          </span>
                        </a>
                      )}

                      {formData.github && (
                        <a
                          href={getSafeUrl(
                            formData.github
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 hover:underline"
                        >
                          <span className="font-bold border border-gray-500 rounded px-1">
                            GH
                          </span>

                          <span>
                            GitHub
                          </span>
                        </a>
                      )}

                      {formData.portfolio && (
                        <a
                          href={getSafeUrl(
                            formData.portfolio
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 hover:underline"
                        >
                          <Globe size={12} />

                          <span>
                            Portfolio
                          </span>
                        </a>
                      )}
                    </div>
                  )}
                </header>

                {/* ================================================= */}
                {/* TEMPLATE 2 */}
                {/* ================================================= */}

                {isTemplate2 ? (
                  <>
                    {/* SUMMARY */}

                    {formData.summary.trim() && (
                      <section className="mt-7">
                        <h2 className="text-[12px] font-bold uppercase tracking-[1px] border-b border-gray-500 pb-1">
                          Professional Summary
                        </h2>

                        {renderContentItems(
                          formatContent(
                            formData.summary
                          )
                        )}
                      </section>
                    )}

                    {/* SKILLS */}

                    {skillsList.length > 0 && (
                      <section className="mt-7">
                        <h2 className="text-[12px] font-bold uppercase tracking-[1px] border-b border-gray-500 pb-1">
                          Skills
                        </h2>

                        <div className="mt-3 space-y-1">
                          {skillsList.map(
                            (skill, index) => (
                              <p
                                key={index}
                                className="text-[11px] text-gray-700"
                              >
                                • {skill}
                              </p>
                            )
                          )}
                        </div>
                      </section>
                    )}

                    {/* EXPERIENCE */}

                    {experiences.some(
                      (experience) =>
                        experience.jobTitle ||
                        experience.company ||
                        experience.startDate ||
                        experience.endDate ||
                        experience.description
                    ) && (
                      <section className="mt-7">
                        <h2 className="text-[12px] font-bold uppercase tracking-[1px] border-b border-gray-500 pb-1">
                          Internships / Experience
                        </h2>

                        {experiences.map(
                          (experience, index) => {
                            const hasData =
                              experience.jobTitle ||
                              experience.company ||
                              experience.startDate ||
                              experience.endDate ||
                              experience.description;

                            if (!hasData) {
                              return null;
                            }

                            return (
                              <div
                                key={index}
                                className="mt-4"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    {experience.jobTitle && (
                                      <p className="text-[12px] font-semibold">
                                        {
                                          experience.jobTitle
                                        }
                                      </p>
                                    )}

                                    {experience.company && (
                                      <p className="text-[11px] text-gray-700 mt-1">
                                        {
                                          experience.company
                                        }
                                      </p>
                                    )}
                                  </div>

                                  {(experience.startDate ||
                                    experience.endDate) && (
                                    <p className="text-[10px] text-gray-500 whitespace-nowrap">
                                      {
                                        experience.startDate
                                      }

                                      {" - "}

                                      {
                                        experience.endDate
                                      }
                                    </p>
                                  )}
                                </div>

                                {experience.description &&
                                  renderContentItems(
                                    formatContent(
                                      experience.description
                                    )
                                  )}
                              </div>
                            );
                          }
                        )}
                      </section>
                    )}

                    {/* PROJECTS */}

                    {projects.some(
                      (project) =>
                        project.name ||
                        project.technologies ||
                        project.description
                    ) && (
                      <section className="mt-7">
                        <h2 className="text-[12px] font-bold uppercase tracking-[1px] border-b border-gray-500 pb-1">
                          Projects
                        </h2>

                        {projects.map(
                          (project, index) => {
                            const hasData =
                              project.name ||
                              project.technologies ||
                              project.description;

                            if (!hasData) {
                              return null;
                            }

                            return (
                              <div
                                key={index}
                                className="mt-4"
                              >
                                {project.name && (
                                  <p className="text-[12px] font-semibold">
                                    {project.name}
                                  </p>
                                )}

                                {project.technologies && (
                                  <p className="text-[10px] text-gray-500 mt-1">
                                    Technologies:{" "}
                                    {
                                      project.technologies
                                    }
                                  </p>
                                )}

                                {project.description &&
                                  renderContentItems(
                                    formatContent(
                                      project.description
                                    )
                                  )}
                              </div>
                            );
                          }
                        )}
                      </section>
                    )}

                    {/* ACHIEVEMENTS / CERTIFICATIONS */}

                    {certificateItems.length > 0 && (
                      <section className="mt-7">
                        <h2 className="text-[12px] font-bold uppercase tracking-[1px] border-b border-gray-500 pb-1">
                          Achievements / Certifications
                        </h2>

                        {renderContentItems(
                          certificateItems
                        )}
                      </section>
                    )}

                    {/* EDUCATION */}

                    {educationEntries.some(
                      (education) =>
                        education.degree ||
                        education.institution ||
                        education.startDate ||
                        education.endDate ||
                        education.grade
                    ) && (
                      <section className="mt-7">
                        <h2 className="text-[12px] font-bold uppercase tracking-[1px] border-b border-gray-500 pb-1">
                          Education
                        </h2>

                        {educationEntries.map(
                          (education, index) => {
                            const hasData =
                              education.degree ||
                              education.institution ||
                              education.startDate ||
                              education.endDate ||
                              education.grade;

                            if (!hasData) {
                              return null;
                            }

                            return (
                              <div
                                key={index}
                                className="mt-4"
                              >
                                {education.degree && (
                                  <p className="text-[12px] font-semibold">
                                    {
                                      education.degree
                                    }
                                  </p>
                                )}

                                {education.institution && (
                                  <p className="text-[11px] text-gray-700 mt-1">
                                    {
                                      education.institution
                                    }
                                  </p>
                                )}

                                {(education.startDate ||
                                  education.endDate) && (
                                  <p className="text-[10px] text-gray-500 mt-1">
                                    {
                                      education.startDate
                                    }

                                    {" - "}

                                    {
                                      education.endDate
                                    }
                                  </p>
                                )}

                                {education.grade && (
                                  <p className="text-[10px] text-gray-600 mt-1">
                                    {
                                      education.grade
                                    }
                                  </p>
                                )}
                              </div>
                            );
                          }
                        )}
                      </section>
                    )}
                  </>
                ) : (
                  <>
                    {/* ================================================= */}
                    {/* TEMPLATE 1 */}
                    {/* ================================================= */}

                    {/* SUMMARY */}

                    {formData.summary.trim() && (
                      <section className="mt-7">
                        <h2 className="text-[12px] font-bold uppercase tracking-[1px] border-b border-gray-400 pb-1">
                          Professional Summary
                        </h2>

                        {renderContentItems(
                          formatContent(
                            formData.summary
                          )
                        )}
                      </section>
                    )}

                    {/* SKILLS */}

                    {skillsList.length > 0 && (
                      <section className="mt-7">
                        <h2 className="text-[12px] font-bold uppercase tracking-[1px] border-b border-gray-400 pb-1">
                          Skills
                        </h2>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {skillsList.map(
                            (skill, index) => (
                              <span
                                key={index}
                                className="border border-gray-300 rounded px-2.5 py-1 text-[10px] text-gray-700"
                              >
                                {skill}
                              </span>
                            )
                          )}
                        </div>
                      </section>
                    )}

                    {/* PROJECTS */}

                    {projects.some(
                      (project) =>
                        project.name ||
                        project.technologies ||
                        project.description
                    ) && (
                      <section className="mt-7">
                        <h2 className="text-[12px] font-bold uppercase tracking-[1px] border-b border-gray-400 pb-1">
                          Projects
                        </h2>

                        {projects.map(
                          (project, index) => {
                            const hasData =
                              project.name ||
                              project.technologies ||
                              project.description;

                            if (!hasData) {
                              return null;
                            }

                            return (
                              <div
                                key={index}
                                className="mt-4"
                              >
                                {project.name && (
                                  <p className="text-[12px] font-semibold">
                                    {project.name}
                                  </p>
                                )}

                                {project.technologies && (
                                  <p className="text-[10px] text-gray-500 mt-1">
                                    Technologies:{" "}
                                    {
                                      project.technologies
                                    }
                                  </p>
                                )}

                                {project.description &&
                                  renderContentItems(
                                    formatContent(
                                      project.description
                                    )
                                  )}
                              </div>
                            );
                          }
                        )}
                      </section>
                    )}

                    {/* EDUCATION */}

                    {educationEntries.some(
                      (education) =>
                        education.degree ||
                        education.institution ||
                        education.startDate ||
                        education.endDate ||
                        education.grade
                    ) && (
                      <section className="mt-7">
                        <h2 className="text-[12px] font-bold uppercase tracking-[1px] border-b border-gray-400 pb-1">
                          Education
                        </h2>

                        {educationEntries.map(
                          (education, index) => {
                            const hasData =
                              education.degree ||
                              education.institution ||
                              education.startDate ||
                              education.endDate ||
                              education.grade;

                            if (!hasData) {
                              return null;
                            }

                            return (
                              <div
                                key={index}
                                className="mt-4"
                              >
                                {education.degree && (
                                  <p className="text-[12px] font-semibold">
                                    {
                                      education.degree
                                    }
                                  </p>
                                )}

                                {education.institution && (
                                  <p className="text-[11px] text-gray-700 mt-1">
                                    {
                                      education.institution
                                    }
                                  </p>
                                )}

                                {(education.startDate ||
                                  education.endDate) && (
                                  <p className="text-[10px] text-gray-500 mt-1">
                                    {
                                      education.startDate
                                    }

                                    {" - "}

                                    {
                                      education.endDate
                                    }
                                  </p>
                                )}

                                {education.grade && (
                                  <p className="text-[10px] text-gray-600 mt-1">
                                    {
                                      education.grade
                                    }
                                  </p>
                                )}
                              </div>
                            );
                          }
                        )}
                      </section>
                    )}

                    {/* EXPERIENCE */}

                    {experiences.some(
                      (experience) =>
                        experience.jobTitle ||
                        experience.company ||
                        experience.startDate ||
                        experience.endDate ||
                        experience.description
                    ) && (
                      <section className="mt-7">
                        <h2 className="text-[12px] font-bold uppercase tracking-[1px] border-b border-gray-400 pb-1">
                          Experience
                        </h2>

                        {experiences.map(
                          (experience, index) => {
                            const hasData =
                              experience.jobTitle ||
                              experience.company ||
                              experience.startDate ||
                              experience.endDate ||
                              experience.description;

                            if (!hasData) {
                              return null;
                            }

                            return (
                              <div
                                key={index}
                                className="mt-4"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    {experience.jobTitle && (
                                      <p className="text-[12px] font-semibold">
                                        {
                                          experience.jobTitle
                                        }
                                      </p>
                                    )}

                                    {experience.company && (
                                      <p className="text-[11px] text-gray-700 mt-1">
                                        {
                                          experience.company
                                        }
                                      </p>
                                    )}
                                  </div>

                                  {(experience.startDate ||
                                    experience.endDate) && (
                                    <p className="text-[10px] text-gray-500 whitespace-nowrap">
                                      {
                                        experience.startDate
                                      }

                                      {" - "}

                                      {
                                        experience.endDate
                                      }
                                    </p>
                                  )}
                                </div>

                                {experience.description &&
                                  renderContentItems(
                                    formatContent(
                                      experience.description
                                    )
                                  )}
                              </div>
                            );
                          }
                        )}
                      </section>
                    )}

                    {/* CERTIFICATIONS */}

                    {certificateItems.length > 0 && (
                      <section className="mt-7">
                        <h2 className="text-[12px] font-bold uppercase tracking-[1px] border-b border-gray-400 pb-1">
                          Certifications
                        </h2>

                        {renderContentItems(
                          certificateItems
                        )}
                      </section>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateResume;