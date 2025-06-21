"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Brain, Plus, Settings, TrendingUp, Target, Clock, Star } from "lucide-react"
import Link from "next/link"
import "./skills.css"

export default function SkillsPage() {
  const [userProfile, setUserProfile] = useState(null)
  const [skillsProgress, setSkillsProgress] = useState([])

  useEffect(() => {
    const profile = localStorage.getItem("polymathProfile")
    if (profile) {
      const parsedProfile = JSON.parse(profile)
      setUserProfile(parsedProfile)
      generateSkillsProgress(parsedProfile)
    }
  }, [])

  const generateSkillsProgress = (profile) => {
    const progress = profile.skills.map((skill) => ({
      skill,
      level: Math.floor(Math.random() * 50) + 10, // Random level between 10-60
      totalHours: Math.floor(Math.random() * 100) + 20, // Random hours between 20-120
      weeklyHours: Math.floor(Math.random() * 10) + 2, // Random weekly hours between 2-12
      streak: Math.floor(Math.random() * 30) + 1, // Random streak between 1-30
    }))
    setSkillsProgress(progress)
  }

  const updatePriority = (skill, newPriority) => {
    if (!userProfile) return

    const updatedProfile = {
      ...userProfile,
      priorities: {
        ...userProfile.priorities,
        [skill]: newPriority[0],
      },
    }
    setUserProfile(updatedProfile)
    localStorage.setItem("polymathProfile", JSON.stringify(updatedProfile))
  }

  const getSkillColor = (skill) => {
    const colors = ["skill-purple", "skill-blue", "skill-green", "skill-yellow", "skill-pink", "skill-indigo"]
    return colors[skill.length % colors.length]
  }

  const getLevelBadge = (level) => {
    if (level < 20) return { label: "Beginner", color: "level-beginner" }
    if (level < 40) return { label: "Intermediate", color: "level-intermediate" }
    if (level < 60) return { label: "Advanced", color: "level-advanced" }
    return { label: "Expert", color: "level-expert" }
  }

  if (!userProfile) {
    return (
      <div className="skills-loading">
        <Card className="skills-loading-card">
          <CardHeader>
            <CardTitle>No Skills Found</CardTitle>
            <CardDescription>Complete onboarding to set up your skills</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/onboarding">
              <Button>Start Onboarding</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="skills-page">
      {/* Navigation */}
      <nav className="skills-nav">
        <div className="skills-nav-container">
          <div className="skills-nav-content">
            <Link href="/dashboard" className="skills-nav-brand">
              <Brain className="skills-nav-icon" />
              <h1 className="skills-nav-title">PolymathAI</h1>
            </Link>
            <div className="skills-nav-links">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button variant="ghost">Calendar</Button>
              <Button variant="ghost">Settings</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="skills-container">
        {/* Header */}
        <div className="skills-header">
          <div className="skills-header-content">
            <h1 className="skills-title">Your Skills</h1>
            <p className="skills-subtitle">Manage your learning priorities and track progress</p>
          </div>
          <Button className="skills-add-btn">
            <Plus className="skills-add-icon" />
            Add Skill
          </Button>
        </div>

        {/* Skills Overview */}
        <div className="skills-overview">
          <Card className="overview-card">
            <CardContent className="overview-card-content">
              <div className="overview-item">
                <Target className="overview-icon overview-icon-purple" />
                <div className="overview-info">
                  <p className="overview-label">Total Skills</p>
                  <p className="overview-value">{userProfile.skills.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overview-card">
            <CardContent className="overview-card-content">
              <div className="overview-item">
                <Clock className="overview-icon overview-icon-blue" />
                <div className="overview-info">
                  <p className="overview-label">Weekly Hours</p>
                  <p className="overview-value">{skillsProgress.reduce((sum, skill) => sum + skill.weeklyHours, 0)}h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overview-card">
            <CardContent className="overview-card-content">
              <div className="overview-item">
                <TrendingUp className="overview-icon overview-icon-green" />
                <div className="overview-info">
                  <p className="overview-label">Avg Level</p>
                  <p className="overview-value">
                    {Math.round(skillsProgress.reduce((sum, skill) => sum + skill.level, 0) / skillsProgress.length)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overview-card">
            <CardContent className="overview-card-content">
              <div className="overview-item">
                <Star className="overview-icon overview-icon-orange" />
                <div className="overview-info">
                  <p className="overview-label">Best Streak</p>
                  <p className="overview-value">{Math.max(...skillsProgress.map((skill) => skill.streak))} days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills List */}
        <div className="skills-list">
          {skillsProgress.map((skillData) => {
            const levelBadge = getLevelBadge(skillData.level)
            const priority = userProfile.priorities[skillData.skill] || 5

            return (
              <Card key={skillData.skill} className="skill-card">
                <CardHeader>
                  <div className="skill-card-header">
                    <div className="skill-badges">
                      <Badge className={`skill-badge ${getSkillColor(skillData.skill)}`}>{skillData.skill}</Badge>
                      <Badge className={`level-badge ${levelBadge.color}`}>{levelBadge.label}</Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="skill-settings-btn">
                      <Settings className="skill-settings-icon" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="skill-card-content">
                  {/* Progress Bar */}
                  <div className="skill-progress-section">
                    <div className="skill-progress-header">
                      <span>Level Progress</span>
                      <span>{skillData.level}%</span>
                    </div>
                    <Progress value={skillData.level} className="skill-progress-bar" />
                  </div>

                  {/* Stats */}
                  <div className="skill-stats">
                    <div className="skill-stat">
                      <p className="skill-stat-value">{skillData.totalHours}</p>
                      <p className="skill-stat-label">Total Hours</p>
                    </div>
                    <div className="skill-stat">
                      <p className="skill-stat-value">{skillData.weeklyHours}</p>
                      <p className="skill-stat-label">This Week</p>
                    </div>
                    <div className="skill-stat">
                      <p className="skill-stat-value">{skillData.streak}</p>
                      <p className="skill-stat-label">Day Streak</p>
                    </div>
                  </div>

                  {/* Priority Slider */}
                  <div className="priority-section">
                    <div className="priority-header">
                      <Label className="priority-label">Priority</Label>
                      <span className="priority-value">{priority}/10</span>
                    </div>
                    <Slider
                      value={[priority]}
                      onValueChange={(value) => updatePriority(skillData.skill, value)}
                      max={10}
                      min={1}
                      step={1}
                      className="priority-slider"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="skill-actions">
                    <Button variant="outline" size="sm" className="skill-action-btn">
                      View Progress
                    </Button>
                    <Button variant="outline" size="sm" className="skill-action-btn">
                      Practice Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Add More Skills CTA */}
        <Card className="add-skills-cta">
          <CardContent className="add-skills-content">
            <Plus className="add-skills-icon" />
            <h3 className="add-skills-title">Add More Skills</h3>
            <p className="add-skills-description">Expand your polymath journey by adding new skills to master</p>
            <Button className="add-skills-btn">Browse Skills</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
