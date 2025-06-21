"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Calendar, Clock, CheckCircle, Play, MoreHorizontal, TrendingUp, Target, Zap } from "lucide-react"
import Link from "next/link"
import "./dashboard.css"

const formatTo12Hour = (time24) => {
  const [hours, minutes] = time24.split(":").map(Number)
  const period = hours >= 12 ? "PM" : "AM"
  const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
}

export default function DashboardPage() {
  const [userProfile, setUserProfile] = useState(null)
  const [todaySchedule, setTodaySchedule] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])

  useEffect(() => {
    // Load user profile
    const profile = localStorage.getItem("polymathProfile")
    if (profile) {
      const parsedProfile = JSON.parse(profile)
      setUserProfile(parsedProfile)
      generateSchedule(parsedProfile)
    }

    // Load completed tasks
    const completed = localStorage.getItem("completedTasks")
    if (completed) {
      setCompletedTasks(JSON.parse(completed))
    }
  }, [])

  const generateSchedule = (profile) => {
    // Simulate AI-generated schedule based on user preferences
    const schedule = []
    const skillTasks = {
      Guitar: ["Chord progressions", "Scale practice", "Song learning", "Finger exercises"],
      Piano: ["Scales practice", "Piece rehearsal", "Sight reading", "Technique work"],
      Python: ["Algorithm practice", "Project coding", "Code review", "Documentation"],
      JavaScript: ["Framework learning", "Project development", "Debugging practice", "API integration"],
      Spanish: ["Vocabulary review", "Grammar exercises", "Conversation practice", "Listening comprehension"],
      French: ["Pronunciation practice", "Reading comprehension", "Writing exercises", "Cultural study"],
      Drawing: ["Figure drawing", "Still life practice", "Technique study", "Portfolio work"],
      Photography: ["Composition practice", "Editing workflow", "Portfolio review", "Technique exploration"],
    }

    let currentTime = 17 // Start at 5 PM
    const totalMinutes = profile.availableHours * 60
    const skillCount = profile.skills.length
    const baseTimePerSkill = Math.floor(totalMinutes / skillCount)

    profile.skills.forEach((skill, index) => {
      const priority = profile.priorities[skill] || 5
      const adjustedTime = Math.floor(baseTimePerSkill * (priority / 5))
      const tasks = skillTasks[skill] || ["Practice session", "Study time", "Skill development"]
      const randomTask = tasks[Math.floor(Math.random() * tasks.length)]

      const startHour = Math.floor(currentTime)
      const startMinute = Math.round((currentTime % 1) * 60)
      const endTime = currentTime + adjustedTime / 60
      const endHour = Math.floor(endTime)
      const endMinute = Math.round((endTime % 1) * 60)

      const startTime24 = `${startHour.toString().padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}`
      const endTime24 = `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`

      schedule.push({
        id: `${skill}-${index}`,
        skill,
        task: randomTask,
        startTime: formatTo12Hour(startTime24),
        endTime: formatTo12Hour(endTime24),
        duration: adjustedTime,
        completed: false,
        priority,
      })

      currentTime = endTime + 0.5 // 30-minute break
    })

    setTodaySchedule(schedule)
  }

  const toggleTaskCompletion = (taskId) => {
    const newCompleted = completedTasks.includes(taskId)
      ? completedTasks.filter((id) => id !== taskId)
      : [...completedTasks, taskId]

    setCompletedTasks(newCompleted)
    localStorage.setItem("completedTasks", JSON.stringify(newCompleted))
  }

  const getSkillColor = (skill) => {
    const colors = ["skill-purple", "skill-blue", "skill-green", "skill-yellow", "skill-pink", "skill-indigo"]
    return colors[skill.length % colors.length]
  }

  const completionRate =
    todaySchedule.length > 0
      ? (completedTasks.filter((id) => todaySchedule.some((task) => task.id === id)).length / todaySchedule.length) *
        100
      : 0

  if (!userProfile) {
    return (
      <div className="dashboard-loading">
        <Card className="loading-card">
          <CardHeader>
            <CardTitle>Welcome to PolymathAI</CardTitle>
            <CardDescription>Let's set up your learning profile first</CardDescription>
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
    <div className="dashboard">
      {/* Navigation */}
      <nav className="dashboard-nav">
        <div className="nav-container">
          <div className="nav-content">
            <div className="nav-brand">
              <Brain className="nav-icon" />
              <h1 className="nav-title">PolymathAI</h1>
            </div>
            <div className="nav-links">
              <Link href="/skills">
                <Button variant="ghost">Skills</Button>
              </Link>
              <Link href="/calendar">
                <Button variant="ghost">Calendar</Button>
              </Link>
              <Button variant="ghost">Settings</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Good evening! Ready to learn?</h1>
          <p className="dashboard-subtitle">Here's your AI-optimized schedule for today</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <Card className="stat-card">
            <CardContent className="stat-content">
              <div className="stat-item">
                <Target className="stat-icon stat-icon-purple" />
                <div className="stat-info">
                  <p className="stat-label">Today's Progress</p>
                  <p className="stat-value">{Math.round(completionRate)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="stat-content">
              <div className="stat-item">
                <Clock className="stat-icon stat-icon-blue" />
                <div className="stat-info">
                  <p className="stat-label">Learning Time</p>
                  <p className="stat-value">{userProfile.availableHours}h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="stat-content">
              <div className="stat-item">
                <Zap className="stat-icon stat-icon-green" />
                <div className="stat-info">
                  <p className="stat-label">Active Skills</p>
                  <p className="stat-value">{userProfile.skills.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="stat-content">
              <div className="stat-item">
                <TrendingUp className="stat-icon stat-icon-orange" />
                <div className="stat-info">
                  <p className="stat-label">Streak</p>
                  <p className="stat-value">7 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="dashboard-grid">
          {/* Today's Schedule */}
          <div className="schedule-section">
            <Card className="schedule-card">
              <CardHeader>
                <div className="schedule-header">
                  <div>
                    <CardTitle className="schedule-title">
                      <Calendar className="schedule-icon" />
                      Today's Schedule
                    </CardTitle>
                    <CardDescription>
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="more-icon" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="schedule-content">
                {todaySchedule.map((item) => {
                  const isCompleted = completedTasks.includes(item.id)
                  return (
                    <div
                      key={item.id}
                      className={`schedule-item ${isCompleted ? "schedule-item-completed" : "schedule-item-pending"}`}
                    >
                      <div className="schedule-item-left">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleTaskCompletion(item.id)}
                          className={`completion-btn ${isCompleted ? "completion-btn-completed" : "completion-btn-pending"}`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="completion-icon" />
                          ) : (
                            <Play className="completion-icon" />
                          )}
                        </Button>
                        <div>
                          <div className="schedule-item-badges">
                            <Badge className={`skill-badge ${getSkillColor(item.skill)}`}>{item.skill}</Badge>
                            <span className="priority-text">Priority {item.priority}/10</span>
                          </div>
                          <div className={`schedule-item-task ${isCompleted ? "task-completed" : "task-pending"}`}>
                            {item.task}
                          </div>
                          <div className="schedule-item-duration">{item.duration} minutes</div>
                        </div>
                      </div>
                      <div className="schedule-item-right">
                        <div className="schedule-item-time">
                          {item.startTime} - {item.endTime}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            {/* Progress Overview */}
            <Card className="sidebar-card">
              <CardHeader>
                <CardTitle>Today's Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="progress-section">
                  <div className="overall-progress">
                    <div className="progress-header">
                      <span>Overall Completion</span>
                      <span>{Math.round(completionRate)}%</span>
                    </div>
                    <Progress value={completionRate} className="progress-bar" />
                  </div>

                  <div className="skills-progress">
                    <h4 className="skills-progress-title">Skills Progress</h4>
                    {userProfile.skills.slice(0, 5).map((skill) => {
                      const skillTasks = todaySchedule.filter((task) => task.skill === skill)
                      const completedSkillTasks = skillTasks.filter((task) => completedTasks.includes(task.id))
                      const skillProgress =
                        skillTasks.length > 0 ? (completedSkillTasks.length / skillTasks.length) * 100 : 0

                      return (
                        <div key={skill} className="skill-progress-item">
                          <div className="skill-progress-header">
                            <span>{skill}</span>
                            <span>{Math.round(skillProgress)}%</span>
                          </div>
                          <Progress value={skillProgress} className="skill-progress-bar" />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="sidebar-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="quick-actions">
                <Button className="action-btn" variant="outline">
                  <Calendar className="action-icon" />
                  View Full Calendar
                </Button>
                <Link href="/skills">
                  <Button className="action-btn" variant="outline">
                    <Target className="action-icon" />
                    Manage Skills
                  </Button>
                </Link>
                <Link href="/year-review">
                  <Button className="action-btn year-review-btn">
                    <TrendingUp className="action-icon" />
                    2024 Year in Review
                  </Button>
                </Link>
                <Button className="action-btn" variant="outline">
                  <TrendingUp className="action-icon" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="sidebar-card">
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="insights">
                  <div className="insight insight-blue">
                    <p className="insight-title">Optimization Tip</p>
                    <p className="insight-text">
                      Consider practicing guitar before coding - physical activities can improve focus for mental tasks.
                    </p>
                  </div>
                  <div className="insight insight-green">
                    <p className="insight-title">Progress Note</p>
                    <p className="insight-text">
                      You're maintaining a great learning streak! Your consistency is paying off.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
