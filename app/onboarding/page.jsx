"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Brain, ArrowRight, ArrowLeft, Music, Code, Languages, Palette, BookOpen, Dumbbell, Wrench } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import "./onboarding.css"

const skillCategories = [
  {
    id: "music",
    name: "Music",
    icon: Music,
    skills: ["Guitar", "Piano", "Violin", "Drums", "Singing", "Music Theory"],
  },
  {
    id: "coding",
    name: "Programming",
    icon: Code,
    skills: ["Python", "JavaScript", "React", "Machine Learning", "Web Development", "Mobile Development"],
  },
  {
    id: "languages",
    name: "Languages",
    icon: Languages,
    skills: ["Spanish", "French", "German", "Japanese", "Mandarin", "Italian"],
  },
  {
    id: "arts",
    name: "Arts & Design",
    icon: Palette,
    skills: ["Drawing", "Painting", "Digital Art", "Photography", "Graphic Design", "UI/UX Design"],
  },
  {
    id: "academic",
    name: "Academic",
    icon: BookOpen,
    skills: ["Mathematics", "Physics", "Chemistry", "History", "Philosophy", "Literature"],
  },
  {
    id: "fitness",
    name: "Fitness & Health",
    icon: Dumbbell,
    skills: ["Yoga", "Weight Training", "Running", "Martial Arts", "Dance", "Meditation"],
  },
  {
    id: "practical",
    name: "Practical Skills",
    icon: Wrench,
    skills: ["Cooking", "Woodworking", "Gardening", "Car Maintenance", "Home Repair", "Electronics"],
  },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [selectedSkills, setSelectedSkills] = useState([])
  const [skillPriorities, setSkillPriorities] = useState({})
  const [availableHours, setAvailableHours] = useState([2])
  const [preferredTimes, setPreferredTimes] = useState([])
  const router = useRouter()

  const handleSkillToggle = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
      const newPriorities = { ...skillPriorities }
      delete newPriorities[skill]
      setSkillPriorities(newPriorities)
    } else {
      setSelectedSkills([...selectedSkills, skill])
      setSkillPriorities({ ...skillPriorities, [skill]: 5 })
    }
  }

  const handlePriorityChange = (skill, priority) => {
    setSkillPriorities({ ...skillPriorities, [skill]: priority[0] })
  }

  const handleTimeToggle = (time) => {
    if (preferredTimes.includes(time)) {
      setPreferredTimes(preferredTimes.filter((t) => t !== time))
    } else {
      setPreferredTimes([...preferredTimes, time])
    }
  }

  const handleComplete = () => {
    // Save user preferences (in a real app, this would go to a database)
    const userProfile = {
      skills: selectedSkills,
      priorities: skillPriorities,
      availableHours: availableHours[0],
      preferredTimes,
    }
    localStorage.setItem("polymathProfile", JSON.stringify(userProfile))
    router.push("/dashboard")
  }

  return (
    <div className="onboarding-page">
      {/* Navigation */}
      <nav className="onboarding-nav">
        <div className="onboarding-nav-container">
          <div className="onboarding-nav-content">
            <Link href="/" className="onboarding-nav-brand">
              <Brain className="onboarding-nav-icon" />
              <h1 className="onboarding-nav-title">PolymathAI</h1>
            </Link>
            <div className="onboarding-step-indicator">Step {step} of 3</div>
          </div>
        </div>
      </nav>

      <div className="onboarding-container">
        {/* Progress Bar */}
        <div className="onboarding-progress">
          <div className="progress-header">
            <span className="progress-label">Progress</span>
            <span className="progress-percentage">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${(step / 3) * 100}%` }} />
          </div>
        </div>

        {/* Step 1: Skill Selection */}
        {step === 1 && (
          <Card className="onboarding-card">
            <CardHeader className="onboarding-card-header">
              <CardTitle className="onboarding-card-title">What do you want to learn?</CardTitle>
              <CardDescription className="onboarding-card-description">
                Select all the skills you're interested in mastering. Don't worry, you can always add more later!
              </CardDescription>
            </CardHeader>
            <CardContent className="onboarding-card-content">
              {skillCategories.map((category) => {
                const Icon = category.icon
                return (
                  <div key={category.id} className="skill-category">
                    <div className="skill-category-header">
                      <Icon className="skill-category-icon" />
                      <h3 className="skill-category-title">{category.name}</h3>
                    </div>
                    <div className="skill-category-skills">
                      {category.skills.map((skill) => (
                        <div key={skill} className="skill-item">
                          <Checkbox
                            id={skill}
                            checked={selectedSkills.includes(skill)}
                            onCheckedChange={() => handleSkillToggle(skill)}
                          />
                          <Label htmlFor={skill} className="skill-label">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}

              <div className="onboarding-actions">
                <Button
                  onClick={() => setStep(2)}
                  disabled={selectedSkills.length === 0}
                  className="onboarding-next-btn"
                >
                  Next Step
                  <ArrowRight className="btn-icon" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Priorities */}
        {step === 2 && (
          <Card className="onboarding-card">
            <CardHeader className="onboarding-card-header">
              <CardTitle className="onboarding-card-title">Set Your Priorities</CardTitle>
              <CardDescription className="onboarding-card-description">
                How important is each skill to you? This helps our AI allocate time more effectively.
              </CardDescription>
            </CardHeader>
            <CardContent className="onboarding-card-content">
              {selectedSkills.map((skill) => (
                <div key={skill} className="priority-item">
                  <div className="priority-header">
                    <Label className="priority-label">{skill}</Label>
                    <span className="priority-value">Priority: {skillPriorities[skill] || 5}/10</span>
                  </div>
                  <Slider
                    value={[skillPriorities[skill] || 5]}
                    onValueChange={(value) => handlePriorityChange(skill, value)}
                    max={10}
                    min={1}
                    step={1}
                    className="priority-slider"
                  />
                </div>
              ))}

              <div className="onboarding-actions onboarding-actions-between">
                <Button variant="outline" onClick={() => setStep(1)} className="onboarding-back-btn">
                  <ArrowLeft className="btn-icon-left" />
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="onboarding-next-btn">
                  Next Step
                  <ArrowRight className="btn-icon" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Schedule Preferences */}
        {step === 3 && (
          <Card className="onboarding-card">
            <CardHeader className="onboarding-card-header">
              <CardTitle className="onboarding-card-title">Schedule Preferences</CardTitle>
              <CardDescription className="onboarding-card-description">
                Tell us about your availability so we can create the perfect learning schedule.
              </CardDescription>
            </CardHeader>
            <CardContent className="onboarding-card-content">
              <div className="schedule-section">
                <Label className="schedule-label">How many hours per day can you dedicate to learning?</Label>
                <div className="hours-slider-container">
                  <Slider
                    value={availableHours}
                    onValueChange={setAvailableHours}
                    max={8}
                    min={0.5}
                    step={0.5}
                    className="hours-slider"
                  />
                  <div className="hours-slider-labels">
                    <span>30 min</span>
                    <span className="hours-current">{availableHours[0]} hours</span>
                    <span>8 hours</span>
                  </div>
                </div>
              </div>

              <div className="schedule-section">
                <Label className="schedule-label">When do you prefer to learn? (Select all that apply)</Label>
                <div className="time-preferences">
                  {[
                    "Early Morning (6-9 AM)",
                    "Morning (9-12 PM)",
                    "Afternoon (12-5 PM)",
                    "Evening (5-8 PM)",
                    "Night (8-11 PM)",
                    "Late Night (11 PM+)",
                  ].map((time) => (
                    <div key={time} className="time-item">
                      <Checkbox
                        id={time}
                        checked={preferredTimes.includes(time)}
                        onCheckedChange={() => handleTimeToggle(time)}
                      />
                      <Label htmlFor={time} className="time-label">
                        {time}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="onboarding-actions onboarding-actions-between">
                <Button variant="outline" onClick={() => setStep(2)} className="onboarding-back-btn">
                  <ArrowLeft className="btn-icon-left" />
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={preferredTimes.length === 0}
                  className="onboarding-complete-btn"
                >
                  Create My Schedule
                  <ArrowRight className="btn-icon" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
