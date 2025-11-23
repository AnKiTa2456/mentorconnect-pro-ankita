import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/ui/navigation";
import {
  GraduationCap,
  Users,
  Award,
  Briefcase,
  Code2,
  Rocket,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Star,
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 gradient-hero-bg -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent -z-10" />

        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8 animate-fade-in-up">
            <Badge className="gradient-bg border-0 px-4 py-1.5 text-primary-foreground">
              <Rocket className="h-3.5 w-3.5 mr-2" />
              Guaranteed Internships for Top Performers
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Learn From Industry
              <span className="block gradient-text mt-2">Experts & Get Hired</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join subscription-based courses led by industry mentors. Master JavaScript, DSA, and modern frameworks. Top 10
              students get guaranteed 3-month internships.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/auth/select-role">
                <Button size="lg" className="gradient-bg hover:opacity-90 text-lg px-8 h-14 glow">
                  Start Learning Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                  Browse Courses
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12">
              <div className="space-y-1">
                <p className="text-3xl font-bold gradient-text">500+</p>
                <p className="text-sm text-muted-foreground">Active Students</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold gradient-text">50+</p>
                <p className="text-sm text-muted-foreground">Expert Mentors</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold gradient-text">200+</p>
                <p className="text-sm text-muted-foreground">Internships Placed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="px-4 py-1.5">
              Why Choose Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Everything You Need to
              <span className="block gradient-text mt-2">Launch Your Career</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover-lift border-border/50 gradient-card-bg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-bg mb-6">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert-Led Courses</h3>
              <p className="text-muted-foreground leading-relaxed">
                Learn from industry professionals with real-world experience. Structured curriculum covering JavaScript, React, Next.js, and DSA.
              </p>
            </Card>

            <Card className="p-8 hover-lift border-border/50 gradient-card-bg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-bg mb-6">
                <Briefcase className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Guaranteed Internships</h3>
              <p className="text-muted-foreground leading-relaxed">
                Top 5-10 performers in each course receive guaranteed 3-month internships with mentors at leading companies.
              </p>
            </Card>

            <Card className="p-8 hover-lift border-border/50 gradient-card-bg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-bg mb-6">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
              <p className="text-muted-foreground leading-relaxed">
                Real-time rankings based on assignments, projects, and engagement. See where you stand on the leaderboard.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="px-4 py-1.5">
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Your Journey to
              <span className="block gradient-text mt-2">Career Success</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="relative space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-bg glow">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-2xl font-semibold">Choose Your Path</h3>
              <p className="text-muted-foreground leading-relaxed">
                Browse courses in JavaScript, React, Next.js, and DSA. Select the perfect course matching your skill level and goals.
              </p>
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                <CheckCircle2 className="h-4 w-4" />
                30-50 students per course
              </div>
            </div>

            <div className="relative space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-bg glow">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-2xl font-semibold">Learn & Excel</h3>
              <p className="text-muted-foreground leading-relaxed">
                Complete modules, submit assignments, and work on real-world projects. Track your progress on the leaderboard.
              </p>
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                <CheckCircle2 className="h-4 w-4" />
                Monthly/Quarterly subscriptions
              </div>
            </div>

            <div className="relative space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-bg glow">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-2xl font-semibold">Get Hired</h3>
              <p className="text-muted-foreground leading-relaxed">
                Top performers receive guaranteed 3-month internship offers. Start your career with real industry experience.
              </p>
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                <CheckCircle2 className="h-4 w-4" />
                Top 5-10 students guaranteed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="relative overflow-hidden p-12 border-0 gradient-bg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 animate-gradient-shift bg-300%" />
            <div className="relative text-center space-y-6 text-primary-foreground">
              <h2 className="text-4xl md:text-5xl font-bold">Ready to Start Your Journey?</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Join thousands of students learning from industry experts and landing their dream internships.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/auth/select-role">
                  <Button size="lg" variant="secondary" className="text-lg px-8 h-14 bg-white hover:bg-white/90 text-primary">
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold gradient-text">CodeMentor Pro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering students with industry-ready skills and guaranteed career opportunities.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/courses" className="hover:text-foreground transition-base">Courses</Link></li>
                <li><Link to="/mentors" className="hover:text-foreground transition-base">Mentors</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground transition-base">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-base">About</Link></li>
                <li><Link to="/blog" className="hover:text-foreground transition-base">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-base">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-foreground transition-base">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground transition-base">Terms</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CodeMentor Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
