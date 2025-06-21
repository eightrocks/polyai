import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Brain, Calendar, Target, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"
import "./page.css"

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navigation">
        <div className="nav-container">
          <div className="nav-content">
            <div className="nav-brand">
              <Brain className="nav-icon" />
              <h1 className="nav-title">PolymathAI</h1>
            </div>
            <div className="nav-actions">
              <Button variant="ghost">Sign In</Button>
              <Link href="/onboarding">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Master Every Skill with
              <span className="hero-highlight"> AI Scheduling</span>
            </h1>
            <p className="hero-description">
              The intelligent learning platform for polymaths. Let AI optimize your schedule to help you learn guitar,
              coding, languages, and any skill you want to master - all in perfect balance.
            </p>
            <div className="hero-buttons">
              <Link href="/onboarding">
                <Button size="lg" className="hero-primary-btn">
                  Start Learning Today
                  <ArrowRight className="btn-icon" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="hero-secondary-btn">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">AI-Powered Learning for Polymaths</h2>
            <p className="features-description">
              Stop juggling multiple learning goals. Let our AI create the perfect schedule for your polymath journey.
            </p>
          </div>

          <div className="features-grid">
            <Card className="feature-card feature-card-purple">
              <CardHeader>
                <div className="feature-icon feature-icon-purple">
                  <Brain className="icon" />
                </div>
                <CardTitle className="feature-card-title">Smart Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="feature-card-description">
                  AI analyzes your goals, availability, and learning patterns to create optimal practice schedules.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="feature-card feature-card-blue">
              <CardHeader>
                <div className="feature-icon feature-icon-blue">
                  <Target className="icon" />
                </div>
                <CardTitle className="feature-card-title">Multi-Skill Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="feature-card-description">
                  Learn guitar, coding, languages, and more - all balanced perfectly to maximize your progress.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="feature-card feature-card-green">
              <CardHeader>
                <div className="feature-icon feature-icon-green">
                  <TrendingUp className="icon" />
                </div>
                <CardTitle className="feature-card-title">Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="feature-card-description">
                  Visual progress tracking and adaptive scheduling that evolves with your learning journey.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <div className="how-it-works-container">
          <div className="how-it-works-header">
            <h2 className="how-it-works-title">How It Works</h2>
            <p className="how-it-works-description">Three simple steps to optimize your learning</p>
          </div>

          <div className="steps-grid">
            <div className="step">
              <div className="step-number step-number-purple">
                <span>1</span>
              </div>
              <h3 className="step-title">Choose Your Skills</h3>
              <p className="step-description">
                Select the skills you want to learn - from music and languages to coding and art.
              </p>
            </div>

            <div className="step">
              <div className="step-number step-number-blue">
                <span>2</span>
              </div>
              <h3 className="step-title">Set Your Availability</h3>
              <p className="step-description">
                Tell us when you're free to learn and how much time you want to dedicate to each skill.
              </p>
            </div>

            <div className="step">
              <div className="step-number step-number-green">
                <span>3</span>
              </div>
              <h3 className="step-title">Follow Your AI Schedule</h3>
              <p className="step-description">
                Get personalized daily schedules that adapt to your progress and optimize your learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Schedule Preview */}
      <section className="schedule-preview-section">
        <div className="schedule-preview-container">
          <div className="schedule-preview-header">
            <h2 className="schedule-preview-title">Your AI-Generated Schedule</h2>
            <p className="schedule-preview-description">Here's what a typical day might look like</p>
          </div>

          <Card className="schedule-card">
            <CardHeader>
              <CardTitle className="schedule-card-title">
                <Calendar className="schedule-icon" />
                Today's Learning Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="schedule-content">
              <div className="schedule-item schedule-item-purple">
                <div className="schedule-item-content">
                  <Clock className="schedule-item-icon" />
                  <div>
                    <div className="schedule-item-title">Guitar Practice</div>
                    <div className="schedule-item-subtitle">Chord progressions & scales</div>
                  </div>
                </div>
                <div className="schedule-item-time">5:00 PM - 6:00 PM</div>
              </div>

              <div className="schedule-item schedule-item-blue">
                <div className="schedule-item-content">
                  <Clock className="schedule-item-icon" />
                  <div>
                    <div className="schedule-item-title">Python Coding</div>
                    <div className="schedule-item-subtitle">Data structures practice</div>
                  </div>
                </div>
                <div className="schedule-item-time">7:30 PM - 8:30 PM</div>
              </div>

              <div className="schedule-item schedule-item-green">
                <div className="schedule-item-content">
                  <Clock className="schedule-item-icon" />
                  <div>
                    <div className="schedule-item-title">Spanish Learning</div>
                    <div className="schedule-item-subtitle">Conversation practice</div>
                  </div>
                </div>
                <div className="schedule-item-time">9:00 PM - 9:30 PM</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Become a Modern Polymath?</h2>
          <p className="cta-description">
            Join thousands of learners who are mastering multiple skills with AI-powered scheduling.
          </p>
          <Link href="/onboarding">
            <Button size="lg" className="cta-button">
              Start Your Journey
              <ArrowRight className="btn-icon" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-brand-content">
                <Brain className="footer-icon" />
                <h3 className="footer-brand-title">PolymathAI</h3>
              </div>
              <p className="footer-brand-description">
                Empowering modern polymaths to master multiple skills through intelligent scheduling and AI-powered
                learning optimization.
              </p>
            </div>
            <div className="footer-section">
              <h4 className="footer-section-title">Product</h4>
              <ul className="footer-links">
                <li>
                  <a href="#" className="footer-link">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-section-title">Company</h4>
              <ul className="footer-links">
                <li>
                  <a href="#" className="footer-link">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 PolymathAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
