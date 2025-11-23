import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 transition-smooth hover:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">CodeMentor Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/courses" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-base">
              Courses
            </Link>
            <Link to="/mentors" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-base">
              Mentors
            </Link>
            <Link to="/about" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-base">
              How It Works
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/auth/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/select-role">
              <Button variant="default" size="sm" className="gradient-bg hover:opacity-90">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-base"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border/40 animate-fade-in">
            <Link
              to="/courses"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-base"
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              to="/mentors"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-base"
              onClick={() => setMobileMenuOpen(false)}
            >
              Mentors
            </Link>
            <Link
              to="/about"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-base"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <div className="flex flex-col gap-2 pt-4 border-t border-border/40">
              <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth/select-role" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full gradient-bg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
