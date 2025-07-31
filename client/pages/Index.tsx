import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Download, Eye, Trash2, Edit } from "lucide-react";
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

export default function Index() {
  const [activeTab, setActiveTab] = useState<
    "personal" | "experience" | "education" | "skills" | "preview"
  >("personal");
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

  const TabButton = ({
    id,
    label,
    isActive,
    onClick,
  }: {
    id: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-3 rounded-lg font-medium transition-all duration-200",
        isActive
          ? "bg-primary text-primary-foreground shadow-md"
          : "text-muted-foreground hover:text-foreground hover:bg-muted",
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Edit className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  ResumeForge
                </h1>
                <p className="text-sm text-muted-foreground">
                  Professional Resume Builder
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={exportResume}>
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button onClick={() => setActiveTab("preview")}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Navigation Tabs */}
          <div className="flex space-x-2 mb-8 p-1 bg-white/60 backdrop-blur-sm rounded-xl border">
            <TabButton
              id="personal"
              label="Personal Info"
              isActive={activeTab === "personal"}
              onClick={() => setActiveTab("personal")}
            />
            <TabButton
              id="experience"
              label="Experience"
              isActive={activeTab === "experience"}
              onClick={() => setActiveTab("experience")}
            />
            <TabButton
              id="education"
              label="Education"
              isActive={activeTab === "education"}
              onClick={() => setActiveTab("education")}
            />
            <TabButton
              id="skills"
              label="Skills"
              isActive={activeTab === "skills"}
              onClick={() => setActiveTab("skills")}
            />
            <TabButton
              id="preview"
              label="Preview"
              isActive={activeTab === "preview"}
              onClick={() => setActiveTab("preview")}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {activeTab === "personal" && (
                <Card className="bg-white/60 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Edit className="w-5 h-5" />
                      <span>Personal Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={personalInfo.fullName}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              fullName: e.target.value,
                            })
                          }
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
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
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={personalInfo.phone}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              phone: e.target.value,
                            })
                          }
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={personalInfo.location}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              location: e.target.value,
                            })
                          }
                          placeholder="New York, NY"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={personalInfo.website}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              website: e.target.value,
                            })
                          }
                          placeholder="https://johndoe.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={personalInfo.linkedin}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              linkedin: e.target.value,
                            })
                          }
                          placeholder="linkedin.com/in/johndoe"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        value={personalInfo.summary}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            summary: e.target.value,
                          })
                        }
                        placeholder="A brief summary of your professional background and career objectives..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "experience" && (
                <Card className="bg-white/60 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Edit className="w-5 h-5" />
                        <span>Work Experience</span>
                      </CardTitle>
                      <Button onClick={addExperience}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {experiences.map((exp, index) => (
                      <div
                        key={exp.id}
                        className="p-4 border rounded-lg bg-white/40"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">
                            Experience #{index + 1}
                          </h3>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeExperience(exp.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "company",
                                  e.target.value,
                                )
                              }
                              placeholder="Company Name"
                            />
                          </div>
                          <div>
                            <Label>Position</Label>
                            <Input
                              value={exp.position}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "position",
                                  e.target.value,
                                )
                              }
                              placeholder="Job Title"
                            />
                          </div>
                          <div>
                            <Label>Start Date</Label>
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
                            />
                          </div>
                          <div>
                            <Label>End Date</Label>
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
                            />
                            <div className="flex items-center space-x-2 mt-2">
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
                          <Label>Description</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "description",
                                e.target.value,
                              )
                            }
                            placeholder="Describe your responsibilities and achievements..."
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}
                    {experiences.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No work experience added yet.</p>
                        <p className="text-sm">
                          Click "Add Experience" to get started.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {activeTab === "education" && (
                <Card className="bg-white/60 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Edit className="w-5 h-5" />
                        <span>Education</span>
                      </CardTitle>
                      <Button onClick={addEducation}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Education
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {education.map((edu, index) => (
                      <div
                        key={edu.id}
                        className="p-4 border rounded-lg bg-white/40"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">
                            Education #{index + 1}
                          </h3>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeEducation(edu.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>School/University</Label>
                            <Input
                              value={edu.school}
                              onChange={(e) =>
                                updateEducation(
                                  edu.id,
                                  "school",
                                  e.target.value,
                                )
                              }
                              placeholder="University Name"
                            />
                          </div>
                          <div>
                            <Label>Degree</Label>
                            <Input
                              value={edu.degree}
                              onChange={(e) =>
                                updateEducation(
                                  edu.id,
                                  "degree",
                                  e.target.value,
                                )
                              }
                              placeholder="Bachelor's, Master's, etc."
                            />
                          </div>
                          <div>
                            <Label>Field of Study</Label>
                            <Input
                              value={edu.field}
                              onChange={(e) =>
                                updateEducation(edu.id, "field", e.target.value)
                              }
                              placeholder="Computer Science, etc."
                            />
                          </div>
                          <div>
                            <Label>GPA (Optional)</Label>
                            <Input
                              value={edu.gpa}
                              onChange={(e) =>
                                updateEducation(edu.id, "gpa", e.target.value)
                              }
                              placeholder="3.8/4.0"
                            />
                          </div>
                          <div>
                            <Label>Start Date</Label>
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
                            />
                          </div>
                          <div>
                            <Label>End Date</Label>
                            <Input
                              type="month"
                              value={edu.endDate}
                              onChange={(e) =>
                                updateEducation(
                                  edu.id,
                                  "endDate",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {education.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No education added yet.</p>
                        <p className="text-sm">
                          Click "Add Education" to get started.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {activeTab === "skills" && (
                <Card className="bg-white/60 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Edit className="w-5 h-5" />
                        <span>Skills</span>
                      </CardTitle>
                      <Button onClick={addSkill}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Skill
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skills.map((skill, index) => (
                      <div
                        key={skill.id}
                        className="flex items-center space-x-4 p-3 border rounded-lg bg-white/40"
                      >
                        <div className="flex-1">
                          <Input
                            value={skill.name}
                            onChange={(e) =>
                              updateSkill(skill.id, "name", e.target.value)
                            }
                            placeholder="Skill name (e.g., Python, React, etc.)"
                          />
                        </div>
                        <select
                          value={skill.level}
                          onChange={(e) =>
                            updateSkill(skill.id, "level", e.target.value)
                          }
                          className="px-3 py-2 border rounded-md bg-white"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeSkill(skill.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {skills.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No skills added yet.</p>
                        <p className="text-sm">
                          Click "Add Skill" to get started.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="w-5 h-5" />
                      <span>Resume Preview</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div id="resume-preview" className="space-y-6 text-sm">
                      {/* Personal Info */}
                      <div className="text-center">
                        <h1 className="text-2xl font-bold text-foreground">
                          {personalInfo.fullName || "Your Name"}
                        </h1>
                        <div className="text-muted-foreground space-y-1 mt-2">
                          {personalInfo.email && <p>{personalInfo.email}</p>}
                          {personalInfo.phone && <p>{personalInfo.phone}</p>}
                          {personalInfo.location && (
                            <p>{personalInfo.location}</p>
                          )}
                          {personalInfo.website && (
                            <p>{personalInfo.website}</p>
                          )}
                          {personalInfo.linkedin && (
                            <p>{personalInfo.linkedin}</p>
                          )}
                        </div>
                      </div>

                      {personalInfo.summary && (
                        <>
                          <Separator />
                          <div>
                            <h2 className="font-semibold text-foreground mb-2">
                              SUMMARY
                            </h2>
                            <p className="text-muted-foreground">
                              {personalInfo.summary}
                            </p>
                          </div>
                        </>
                      )}

                      {experiences.length > 0 && (
                        <>
                          <Separator />
                          <div>
                            <h2 className="font-semibold text-foreground mb-3">
                              EXPERIENCE
                            </h2>
                            <div className="space-y-4">
                              {experiences.map((exp) => (
                                <div key={exp.id}>
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="font-medium">
                                        {exp.position}
                                      </h3>
                                      <p className="text-primary">
                                        {exp.company}
                                      </p>
                                    </div>
                                    <p className="text-muted-foreground text-xs">
                                      {exp.startDate} -{" "}
                                      {exp.current ? "Present" : exp.endDate}
                                    </p>
                                  </div>
                                  {exp.description && (
                                    <p className="text-muted-foreground mt-1">
                                      {exp.description}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {education.length > 0 && (
                        <>
                          <Separator />
                          <div>
                            <h2 className="font-semibold text-foreground mb-3">
                              EDUCATION
                            </h2>
                            <div className="space-y-3">
                              {education.map((edu) => (
                                <div key={edu.id}>
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="font-medium">
                                        {edu.degree} in {edu.field}
                                      </h3>
                                      <p className="text-primary">
                                        {edu.school}
                                      </p>
                                      {edu.gpa && (
                                        <p className="text-muted-foreground text-xs">
                                          GPA: {edu.gpa}
                                        </p>
                                      )}
                                    </div>
                                    <p className="text-muted-foreground text-xs">
                                      {edu.startDate} - {edu.endDate}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {skills.length > 0 && (
                        <>
                          <Separator />
                          <div>
                            <h2 className="font-semibold text-foreground mb-3">
                              SKILLS
                            </h2>
                            <div className="space-y-2">
                              {skills.map((skill) => (
                                <div
                                  key={skill.id}
                                  className="flex justify-between items-center"
                                >
                                  <span>{skill.name}</span>
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {skill.level}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
