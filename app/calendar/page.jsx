"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, ChevronLeft, ChevronRight, CalendarIcon, Clock } from "lucide-react"
import Link from "next/link"
import "./calendar.css"

const formatTo12Hour = (time24) => {
  const [hours, minutes] = time24.split(":").map(Number)
  const period = hours >= 12 ? "PM" : "AM"
  const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [weekSchedule, setWeekSchedule] = useState([])

  useEffect(() => {
    generateWeekSchedule()
  }, [currentDate])

  const generateWeekSchedule = () => {
    const schedule = []
    const skills = ["Guitar", "Python", "Spanish", "Drawing", "Piano"]
    const tasks = {
      Guitar: ["Chord practice", "Scale exercises", "Song learning"],
      Python: ["Algorithm practice", "Project coding", "Code review"],
      Spanish: ["Vocabulary", "Grammar", "Conversation"],
      Drawing: ["Figure drawing", "Still life", "Sketching"],
      Piano: ["Scales", "Pieces", "Sight reading"],
    }

    // Generate schedule for the current week
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate)
      date.setDate(currentDate.getDate() - currentDate.getDay() + i)

      // Skip weekends for some variety
      if (date.getDay() === 0 || date.getDay() === 6) continue

      const dailySkills = skills.slice(0, Math.floor(Math.random() * 3) + 2)
      let startHour = 17

      dailySkills.forEach((skill, index) => {
        const skillTasks = tasks[skill] || ["Practice"]
        const task = skillTasks[Math.floor(Math.random() * skillTasks.length)]
        const duration = 45 + Math.floor(Math.random() * 30) // 45-75 minutes
        const endHour = startHour + Math.floor(duration / 60)
        const endMinute = duration % 60

        const startTime24 = `${startHour.toString().padStart(2, "0")}:00`
        const endTime24 = `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`

        schedule.push({
          id: `${skill}-${date.toISOString()}-${index}`,
          skill,
          task,
          startTime: formatTo12Hour(startTime24),
          endTime: formatTo12Hour(endTime24),
          date: date.toISOString().split("T")[0],
          completed: Math.random() > 0.7, // Random completion status
        })

        startHour += 2 // 2-hour gaps between sessions
      })
    }

    setWeekSchedule(schedule)
  }

  const getWeekDays = () => {
    const week = []
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      week.push(day)
    }
    return week
  }

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7))
    setCurrentDate(newDate)
  }

  const getSkillColor = (skill) => {
    const colors = {
      Guitar: "skill-purple",
      Python: "skill-blue",
      Spanish: "skill-green",
      Drawing: "skill-yellow",
      Piano: "skill-pink",
    }
    return colors[skill] || "skill-gray"
  }

  const weekDays = getWeekDays()
  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="calendar-page">
      {/* Navigation */}
      <nav className="calendar-nav">
        <div className="calendar-nav-container">
          <div className="calendar-nav-content">
            <Link href="/dashboard" className="calendar-nav-brand">
              <Brain className="calendar-nav-icon" />
              <h1 className="calendar-nav-title">PolymathAI</h1>
            </Link>
            <div className="calendar-nav-links">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/skills">
                <Button variant="ghost">Skills</Button>
              </Link>
              <Button variant="ghost">Settings</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="calendar-container">
        {/* Header */}
        <div className="calendar-header">
          <div className="calendar-header-content">
            <h1 className="calendar-title">Learning Calendar</h1>
            <p className="calendar-subtitle">Your AI-optimized learning schedule</p>
          </div>
          <div className="calendar-navigation">
            <Button variant="outline" onClick={() => navigateWeek("prev")} className="calendar-nav-btn">
              <ChevronLeft className="calendar-nav-btn-icon" />
            </Button>
            <span className="calendar-current-month">
              {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
            <Button variant="outline" onClick={() => navigateWeek("next")} className="calendar-nav-btn">
              <ChevronRight className="calendar-nav-btn-icon" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <Card className="calendar-card">
          <CardHeader>
            <CardTitle className="calendar-card-title">
              <CalendarIcon className="calendar-card-icon" />
              Weekly Schedule
            </CardTitle>
            <CardDescription>
              Week of {weekDays[0].toLocaleDateString("en-US", { month: "long", day: "numeric" })} -{" "}
              {weekDays[6].toLocaleDateString("en-US", { month: "long", day: "numeric" })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="calendar-grid">
              {weekDays.map((day, index) => {
                const daySchedule = weekSchedule.filter((item) => item.date === day.toISOString().split("T")[0])
                const isToday = day.toISOString().split("T")[0] === today
                const isWeekend = day.getDay() === 0 || day.getDay() === 6

                return (
                  <div key={index} className={`calendar-day ${isWeekend ? "calendar-day-weekend" : ""}`}>
                    <div className={`calendar-day-header ${isToday ? "calendar-day-today" : ""}`}>
                      <div className="calendar-day-name">{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
                      <div className={`calendar-day-number ${isToday ? "calendar-day-number-today" : ""}`}>
                        {day.getDate()}
                      </div>
                    </div>

                    <div className="calendar-day-content">
                      {daySchedule.map((item) => (
                        <div
                          key={item.id}
                          className={`calendar-session ${
                            item.completed ? "calendar-session-completed" : "calendar-session-pending"
                          }`}
                        >
                          <Badge className={`session-badge ${getSkillColor(item.skill)}`}>{item.skill}</Badge>
                          <div
                            className={`session-task ${
                              item.completed ? "session-task-completed" : "session-task-pending"
                            }`}
                          >
                            {item.task}
                          </div>
                          <div className="session-time">
                            <Clock className="session-time-icon" />
                            {item.startTime} - {item.endTime}
                          </div>
                        </div>
                      ))}

                      {daySchedule.length === 0 && !isWeekend && (
                        <div className="calendar-empty">No sessions scheduled</div>
                      )}

                      {isWeekend && <div className="calendar-rest">Rest day</div>}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Summary */}
        <div className="calendar-summary">
          <Card className="summary-card">
            <CardHeader>
              <CardTitle className="summary-title">This Week's Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="summary-skills">
                {["Guitar", "Python", "Spanish"].map((skill) => {
                  const skillSessions = weekSchedule.filter((item) => item.skill === skill)
                  const completedSessions = skillSessions.filter((item) => item.completed)

                  return (
                    <div key={skill} className="summary-skill">
                      <Badge className={`summary-skill-badge ${getSkillColor(skill)}`}>{skill}</Badge>
                      <span className="summary-skill-progress">
                        {completedSessions.length}/{skillSessions.length} sessions
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="summary-card">
            <CardHeader>
              <CardTitle className="summary-title">Weekly Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="summary-stats">
                <div className="summary-stat">
                  <span className="summary-stat-label">Total Sessions</span>
                  <span className="summary-stat-value">{weekSchedule.length}</span>
                </div>
                <div className="summary-stat">
                  <span className="summary-stat-label">Completed</span>
                  <span className="summary-stat-value summary-stat-completed">
                    {weekSchedule.filter((item) => item.completed).length}
                  </span>
                </div>
                <div className="summary-stat">
                  <span className="summary-stat-label">Completion Rate</span>
                  <span className="summary-stat-value">
                    {weekSchedule.length > 0
                      ? Math.round((weekSchedule.filter((item) => item.completed).length / weekSchedule.length) * 100)
                      : 0}
                    %
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="summary-card">
            <CardHeader>
              <CardTitle className="summary-title">AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="recommendations">
                <div className="recommendation recommendation-blue">
                  <p className="recommendation-title">Schedule Optimization</p>
                  <p className="recommendation-text">
                    Consider moving guitar practice earlier in the day for better focus.
                  </p>
                </div>
                <div className="recommendation recommendation-green">
                  <p className="recommendation-title">Progress Note</p>
                  <p className="recommendation-text">Great consistency this week! Keep up the momentum.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
