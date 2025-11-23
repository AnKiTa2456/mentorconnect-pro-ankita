import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, ArrowRight, Check } from "lucide-react";

export default function SelectRole() {
  const [selectedRole, setSelectedRole] = useState<"student" | "mentor" | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole) {
      localStorage.setItem("pendingRole", selectedRole);
      // In production, this would redirect to OAuth
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero-bg -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent -z-10" />

      <div className="w-full max-w-4xl animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-bg">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold gradient-text">CodeMentor Pro</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Path</h1>
          <p className="text-xl text-muted-foreground">Select your role to get started</p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Student Card */}
          <Card
            className={`p-8 cursor-pointer transition-all duration-300 hover-lift border-2 ${
              selectedRole === "student"
                ? "border-primary glow gradient-card-bg"
                : "border-border/50 hover:border-primary/50"
            }`}
            onClick={() => setSelectedRole("student")}
          >
            <div className="relative">
              {/* Checkmark */}
              {selectedRole === "student" && (
                <div className="absolute -top-4 -right-4 flex h-8 w-8 items-center justify-center rounded-full gradient-bg animate-scale-in">
                  <Check className="h-5 w-5 text-primary-foreground" />
                </div>
              )}

              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-bg mb-6">
                <GraduationCap className="h-8 w-8 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-3">I'm a Student</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Learn from industry experts, master in-demand skills, and compete for guaranteed internship opportunities.
              </p>

              {/* Features */}
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Access to expert-led courses</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Real-time progress tracking & rankings</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Guaranteed internships for top performers</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Industry-recognized certifications</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Mentor Card */}
          <Card
            className={`p-8 cursor-pointer transition-all duration-300 hover-lift border-2 ${
              selectedRole === "mentor"
                ? "border-primary glow gradient-card-bg"
                : "border-border/50 hover:border-primary/50"
            }`}
            onClick={() => setSelectedRole("mentor")}
          >
            <div className="relative">
              {/* Checkmark */}
              {selectedRole === "mentor" && (
                <div className="absolute -top-4 -right-4 flex h-8 w-8 items-center justify-center rounded-full gradient-bg animate-scale-in">
                  <Check className="h-5 w-5 text-primary-foreground" />
                </div>
              )}

              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-bg mb-6">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-3">I'm a Mentor</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Share your expertise, create courses, mentor students, and offer internships to top performers.
              </p>

              {/* Features */}
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Create & publish courses</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Manage up to 50 students per course</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Select top performers for internships</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Build your professional brand</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            size="lg"
            disabled={!selectedRole}
            onClick={handleContinue}
            className="gradient-bg hover:opacity-90 text-lg px-12 h-14 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="mt-6 text-sm text-muted-foreground">
            Already have an account?{" "}
            <button onClick={() => navigate("/auth/login")} className="text-primary font-medium hover:underline">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
