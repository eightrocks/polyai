export const generateYearStats = (userProfile) => {
  // This would normally fetch from your database
  // For now, we'll generate realistic mock data

  const skills = userProfile?.skills || ["Guitar", "Python", "Spanish", "Drawing", "Piano"]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const topSkills = skills.slice(0, 5).map((skill, index) => ({
    skill,
    hours: Math.floor(Math.random() * 100) + 80 - index * 15,
    sessions: Math.floor(Math.random() * 80) + 50 - index * 10,
    level: Math.floor(Math.random() * 30) + 70 - index * 5,
    growth: Math.floor(Math.random() * 40) + 20,
  }))

  const monthlyProgress = months.map((month) => ({
    month,
    hours: Math.floor(Math.random() * 50) + 25,
    sessions: Math.floor(Math.random() * 30) + 15,
    completionRate: Math.floor(Math.random() * 30) + 70,
  }))

  const achievements = [
    {
      id: "polymath_pioneer",
      title: "Polymath Pioneer",
      description: "Learned 5+ skills simultaneously",
      icon: "🎯",
      unlocked: true,
      unlockedDate: "March 15, 2024",
      rarity: "rare",
    },
    {
      id: "consistency_king",
      title: "Consistency Champion",
      description: "Maintained a 30-day learning streak",
      icon: "🔥",
      unlocked: true,
      unlockedDate: "June 22, 2024",
      rarity: "epic",
    },
    {
      id: "night_owl",
      title: "Night Owl Scholar",
      description: "Completed 50+ evening sessions",
      icon: "🦉",
      unlocked: true,
      unlockedDate: "August 8, 2024",
      rarity: "common",
    },
    {
      id: "speed_learner",
      title: "Lightning Learner",
      description: "Reached intermediate level in under 3 months",
      icon: "⚡",
      unlocked: true,
      unlockedDate: "April 30, 2024",
      rarity: "rare",
    },
    {
      id: "dedication_master",
      title: "Dedication Master",
      description: "Logged 300+ total learning hours",
      icon: "💪",
      unlocked: true,
      unlockedDate: "November 12, 2024",
      rarity: "legendary",
    },
    {
      id: "skill_collector",
      title: "Skill Collector",
      description: "Started learning 10+ different skills",
      icon: "🎨",
      unlocked: false,
      rarity: "epic",
    },
  ]

  const totalHours = topSkills.reduce((sum, skill) => sum + skill.hours, 0)
  const totalSessions = topSkills.reduce((sum, skill) => sum + skill.sessions, 0)

  return {
    totalHours,
    totalSessions,
    skillsLearned: skills.length,
    longestStreak: 47,
    topSkills,
    monthlyProgress,
    achievements,
    personalBests: {
      mostProductiveDay: { date: "March 15th", hours: 8.5 },
      longestSession: { skill: "Guitar", duration: 3.5 },
      favoriteTimeSlot: "7:00 PM - 9:00 PM",
      fastestSkillProgress: "Spanish",
      mostConsistentSkill: "Python",
    },
    insights: {
      learningPattern: "Evening Focused",
      preferredDifficulty: "Progressive Challenge",
      motivationalQuote: "Your consistency this year has been remarkable!",
      nextYearPrediction: "Based on your progress, you're on track to become an expert in 3 skills by 2025!",
    },
    comparisons: {
      vsAverage: {
        hoursVsAverage: 145, // 45% above average
        skillsVsAverage: 125, // 25% above average
        streakVsAverage: 180, // 80% above average
      },
    },
  }
}
