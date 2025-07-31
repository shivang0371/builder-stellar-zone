import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  Download,
  FileText,
  Trash2,
  ChevronLeft,
  ChevronRight,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Check,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  summary: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

const steps = [
  { id: 1, name: "Personal", icon: User, description: "Contact details" },
  { id: 2, name: "Experience", icon: Briefcase, description: "Work history" },
  {
    id: 3,
    name: "Education",
    icon: GraduationCap,
    description: "Academic background",
  },
  { id: 4, name: "Skills", icon: Code, description: "Expertise & abilities" },
];

export default function Index() {
  const [currentStep, setCurrentStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    summary: "",
  });
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setExperiences([...experiences, newExp]);
  };

  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: any,
  ) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    );
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
    };
    setEducation([...education, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setEducation(
      education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    );
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: "Intermediate",
    };
    setSkills([...skills, newSkill]);
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    setSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill,
      ),
    );
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const exportResume = () => {
    window.print();
  };

  const getCompletionPercentage = () => {
    let completed = 0;
    let total = 4;

    if (personalInfo.fullName && personalInfo.email) completed++;
    if (experiences.length > 0) completed++;
    if (education.length > 0) completed++;
    if (skills.length > 0) completed++;

    return (completed / total) * 100;
  };

  const isStepComplete = (stepId: number) => {
    switch (stepId) {
      case 1:
        return personalInfo.fullName && personalInfo.email;
      case 2:
        return experiences.length > 0;
      case 3:
        return education.length > 0;
      case 4:
        return skills.length > 0;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                  Resume Builder
                </h1>
                <p className="text-sm text-gray-600">
                  Create your professional resume in minutes
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{Math.round(getCompletionPercentage())}% Complete</span>
              </div>
              <Button variant="outline" className="hidden md:flex">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button
                onClick={exportResume}
                disabled={getCompletionPercentage() < 50}
                className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 shadow-lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Build Your Resume
            </h2>
            <div className="text-sm text-gray-500">Step {currentStep} of 4</div>
          </div>
          <Progress
            value={getCompletionPercentage()}
            className="w-full h-3 mb-6"
          />

          {/* Step Navigation */}
          <div className="grid grid-cols-4 gap-2">
            {steps.map((step) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isComplete = isStepComplete(step.id);

              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={cn(
                    "flex flex-col items-center p-4 rounded-xl transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg transform scale-105"
                      : isComplete
                        ? "bg-green-50 text-green-700 hover:bg-green-100"
                        : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-200",
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center mb-2",
                      isActive
                        ? "bg-white/20"
                        : isComplete
                          ? "bg-green-100"
                          : "bg-gray-100",
                    )}
                  >
                    {isComplete && !isActive ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <StepIcon className="w-4 h-4" />
                    )}
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-sm">{step.name}</div>
                    <div className="text-xs opacity-80">{step.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-3 space-y-6">
            {currentStep === 1 && (
              <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-violet-50 to-blue-50 border-b">
                  <CardTitle className="flex items-center space-x-3">
                    <User className="w-6 h-6 text-violet-600" />
                    <span>Personal Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        value={personalInfo.fullName}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            fullName: e.target.value,
                          })
                        }
                        placeholder="Ravi Kumar Sharma"
                        className="h-12 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            email: e.target.value,
                          })
                        }
                        placeholder="ravi.sharma@email.com"
                        className="h-12 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={personalInfo.phone}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            phone: e.target.value,
                          })
                        }
                        placeholder="+91 98765 43210"
                        className="h-12 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-medium">
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={personalInfo.location}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            location: e.target.value,
                          })
                        }
                        placeholder="Mumbai, Maharashtra"
                        className="h-12 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website" className="text-sm font-medium">
                        Portfolio Website
                      </Label>
                      <Input
                        id="website"
                        value={personalInfo.website}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            website: e.target.value,
                          })
                        }
                        placeholder="https://ravikumar.dev"
                        className="h-12 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="text-sm font-medium">
                        LinkedIn Profile
                      </Label>
                      <Input
                        id="linkedin"
                        value={personalInfo.linkedin}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            linkedin: e.target.value,
                          })
                        }
                        placeholder="linkedin.com/in/ravikumarsharma"
                        className="h-12 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="summary" className="text-sm font-medium">
                      Professional Summary
                    </Label>
                    <Textarea
                      id="summary"
                      value={personalInfo.summary}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          summary: e.target.value,
                        })
                      }
                      placeholder="Experienced software engineer with 5+ years in full-stack development. Passionate about creating scalable web applications and leading high-performing teams. Expertise in React, Node.js, and cloud technologies."
                      rows={4}
                      className="border-gray-200 focus:border-violet-500 focus:ring-violet-500 resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-violet-50 to-blue-50 border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      <Briefcase className="w-6 h-6 text-violet-600" />
                      <span>Work Experience</span>
                    </CardTitle>
                    <Button
                      onClick={addExperience}
                      size="sm"
                      className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Position
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  {experiences.map((exp, index) => (
                    <div
                      key={exp.id}
                      className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-gray-900">
                          Position #{index + 1}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <Label className="text-sm font-medium">
                            Job Title
                          </Label>
                          <Input
                            value={exp.position}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "position",
                                e.target.value,
                              )
                            }
                            placeholder="Senior Software Engineer"
                            className="mt-1 h-11"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "company",
                                e.target.value,
                              )
                            }
                            placeholder="Tata Consultancy Services"
                            className="mt-1 h-11"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            Start Date
                          </Label>
                          <Input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "startDate",
                                e.target.value,
                              )
                            }
                            className="mt-1 h-11"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            End Date
                          </Label>
                          <Input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "endDate",
                                e.target.value,
                              )
                            }
                            disabled={exp.current}
                            className="mt-1 h-11"
                          />
                          <div className="flex items-center space-x-2 mt-3">
                            <input
                              type="checkbox"
                              id={`current-${exp.id}`}
                              checked={exp.current}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "current",
                                  e.target.checked,
                                )
                              }
                              className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                            />
                            <Label
                              htmlFor={`current-${exp.id}`}
                              className="text-sm"
                            >
                              Currently working here
                            </Label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Job Description & Key Achievements
                        </Label>
                        <Textarea
                          value={exp.description}
                          onChange={(e) =>
                            updateExperience(
                              exp.id,
                              "description",
                              e.target.value,
                            )
                          }
                          placeholder="• Led development of customer portal using React and Node.js, serving 50,000+ users&#10;• Improved application performance by 40% through code optimization and caching strategies&#10;• Mentored junior developers and established coding best practices for the team"
                          rows={4}
                          className="mt-1 resize-none"
                        />
                      </div>
                    </div>
                  ))}
                  {experiences.length === 0 && (
                    <div className="text-center py-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
                      <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Add Your Work Experience
                      </h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Showcase your professional journey and key achievements
                        that make you stand out
                      </p>
                      <Button
                        onClick={addExperience}
                        className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Position
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-violet-50 to-blue-50 border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      <GraduationCap className="w-6 h-6 text-violet-600" />
                      <span>Education</span>
                    </CardTitle>
                    <Button
                      onClick={addEducation}
                      size="sm"
                      className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Education
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  {education.map((edu, index) => (
                    <div
                      key={edu.id}
                      className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-gray-900">
                          Education #{index + 1}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">
                            Institution
                          </Label>
                          <Input
                            value={edu.school}
                            onChange={(e) =>
                              updateEducation(edu.id, "school", e.target.value)
                            }
                            placeholder="Indian Institute of Technology, Delhi"
                            className="mt-1 h-11"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Degree</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) =>
                              updateEducation(edu.id, "degree", e.target.value)
                            }
                            placeholder="Bachelor of Technology"
                            className="mt-1 h-11"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            Field of Study
                          </Label>
                          <Input
                            value={edu.field}
                            onChange={(e) =>
                              updateEducation(edu.id, "field", e.target.value)
                            }
                            placeholder="Computer Science and Engineering"
                            className="mt-1 h-11"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            CGPA/Percentage
                          </Label>
                          <Input
                            value={edu.gpa}
                            onChange={(e) =>
                              updateEducation(edu.id, "gpa", e.target.value)
                            }
                            placeholder="8.5/10 CGPA"
                            className="mt-1 h-11"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            Start Date
                          </Label>
                          <Input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) =>
                              updateEducation(
                                edu.id,
                                "startDate",
                                e.target.value,
                              )
                            }
                            className="mt-1 h-11"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            Graduation Date
                          </Label>
                          <Input
                            type="month"
                            value={edu.endDate}
                            onChange={(e) =>
                              updateEducation(edu.id, "endDate", e.target.value)
                            }
                            className="mt-1 h-11"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {education.length === 0 && (
                    <div className="text-center py-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
                      <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Add Your Education
                      </h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Include your academic qualifications and achievements
                      </p>
                      <Button
                        onClick={addEducation}
                        className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Education
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {currentStep === 4 && (
              <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-violet-50 to-blue-50 border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      <Code className="w-6 h-6 text-violet-600" />
                      <span>Skills & Expertise</span>
                    </CardTitle>
                    <Button
                      onClick={addSkill}
                      size="sm"
                      className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Skill
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-4">
                  {skills.map((skill, index) => (
                    <div
                      key={skill.id}
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl"
                    >
                      <div className="flex-1">
                        <Input
                          value={skill.name}
                          onChange={(e) =>
                            updateSkill(skill.id, "name", e.target.value)
                          }
                          placeholder="React.js, Python, Machine Learning, Project Management"
                          className="h-11"
                        />
                      </div>
                      <select
                        value={skill.level}
                        onChange={(e) =>
                          updateSkill(skill.id, "level", e.target.value)
                        }
                        className="px-4 py-3 border border-gray-300 rounded-lg bg-white min-w-[140px] focus:border-violet-500 focus:ring-violet-500"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(skill.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {skills.length === 0 && (
                    <div className="text-center py-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
                      <Code className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Add Your Skills
                      </h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Highlight your technical skills, programming languages,
                        and professional expertise
                      </p>
                      <Button
                        onClick={addSkill}
                        className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Skills
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-8 py-3"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button
                onClick={nextStep}
                disabled={currentStep === 4}
                className="px-8 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <Card className="border-0 shadow-2xl bg-white">
                <CardHeader className="bg-gradient-to-r from-violet-600 to-blue-600 text-white">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span>Resume Preview</span>
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30"
                    >
                      Live Preview
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8" id="resume-preview">
                  <div className="space-y-6 text-sm max-h-[700px] overflow-y-auto">
                    {/* Header */}
                    <div className="text-center pb-6 border-b-2 border-gray-200">
                      <h1 className="text-3xl font-bold text-gray-900 mb-3">
                        {personalInfo.fullName || "Your Full Name"}
                      </h1>
                      <div className="text-gray-600 space-y-1">
                        {personalInfo.email && (
                          <div className="text-base">{personalInfo.email}</div>
                        )}
                        {personalInfo.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo.location && (
                          <div>{personalInfo.location}</div>
                        )}
                        <div className="flex justify-center space-x-6 mt-3 text-sm">
                          {personalInfo.website && (
                            <div className="text-blue-600">
                              {personalInfo.website}
                            </div>
                          )}
                          {personalInfo.linkedin && (
                            <div className="text-blue-600">
                              {personalInfo.linkedin}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Professional Summary */}
                    {personalInfo.summary && (
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-300 pb-1">
                          Professional Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                          {personalInfo.summary}
                        </p>
                      </div>
                    )}

                    {/* Experience */}
                    {experiences.length > 0 && (
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-300 pb-1">
                          Professional Experience
                        </h2>
                        <div className="space-y-6">
                          {experiences.map((exp) => (
                            <div key={exp.id}>
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-bold text-gray-900 text-base">
                                    {exp.position || "Position Title"}
                                  </h3>
                                  <div className="text-blue-600 font-semibold">
                                    {exp.company || "Company Name"}
                                  </div>
                                </div>
                                <div className="text-gray-600 text-sm font-medium">
                                  {exp.startDate} -{" "}
                                  {exp.current ? "Present" : exp.endDate}
                                </div>
                              </div>
                              {exp.description && (
                                <div className="text-gray-700 whitespace-pre-line leading-relaxed mt-2">
                                  {exp.description}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-300 pb-1">
                          Education
                        </h2>
                        <div className="space-y-4">
                          {education.map((edu) => (
                            <div key={edu.id}>
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-bold text-gray-900">
                                    {edu.degree}{" "}
                                    {edu.field && `in ${edu.field}`}
                                  </h3>
                                  <div className="text-blue-600 font-semibold">
                                    {edu.school}
                                  </div>
                                  {edu.gpa && (
                                    <div className="text-gray-600 text-sm mt-1">
                                      CGPA: {edu.gpa}
                                    </div>
                                  )}
                                </div>
                                <div className="text-gray-600 text-sm font-medium">
                                  {edu.startDate} - {edu.endDate}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-300 pb-1">
                          Skills & Expertise
                        </h2>
                        <div className="grid grid-cols-1 gap-2">
                          {skills.map((skill) => (
                            <div
                              key={skill.id}
                              className="flex justify-between items-center py-1"
                            >
                              <span className="text-gray-700 font-medium">
                                {skill.name}
                              </span>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-xs font-medium",
                                  skill.level === "Expert" &&
                                    "bg-green-50 text-green-700 border-green-200",
                                  skill.level === "Advanced" &&
                                    "bg-blue-50 text-blue-700 border-blue-200",
                                  skill.level === "Intermediate" &&
                                    "bg-yellow-50 text-yellow-700 border-yellow-200",
                                  skill.level === "Beginner" &&
                                    "bg-gray-50 text-gray-700 border-gray-200",
                                )}
                              >
                                {skill.level}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Empty State */}
                    {!personalInfo.fullName &&
                      experiences.length === 0 &&
                      education.length === 0 &&
                      skills.length === 0 && (
                        <div className="text-center py-16 text-gray-400">
                          <FileText className="w-20 h-20 mx-auto mb-6 text-gray-300" />
                          <h3 className="text-xl font-semibold mb-3 text-gray-500">
                            Your Resume Preview
                          </h3>
                          <p className="max-w-md mx-auto leading-relaxed">
                            Start building your professional resume by filling
                            out your personal information. Your resume will
                            appear here as you add content.
                          </p>
                        </div>
                      )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
