import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/lib/stores/authStore";
import { useCourseStore } from "@/lib/stores/courseStore";
import { apiClient } from "@/lib/api/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  ArrowRight,
  Trophy,
  FileText,
  Users,
} from "lucide-react";
import { Navigation } from "@/components/ui/navigation";

export default function StudentDashboard() {
  const { user } = useAuthStore();
  const { enrolledCourses, setEnrolledCourses } = useCourseStore();

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        const data = await apiClient.get<{
          enrolledCourses: any[];
          stats: {
            coursesCompleted: number;
            certificatesEarned: number;
            leaderboardPosition: number;
            assignmentsPending: number;
          };
          recentActivity: any[];
          recommendedCourses: any[];
        }>("/dashboard/student");

        setEnrolledCourses(data.enrolledCourses);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchDashboardData();
  }, [user, setEnrolledCourses]);

  if (!user) {
    return null;
  }

  const stats = {
    coursesCompleted: 3,
    certificatesEarned: 2,
    leaderboardPosition: 15,
    assignmentsPending: 2,
  };

  return (
    <div className="min-h-screen bg-black text-white page-transition">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-7xl pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Welcome back, {user.name}!</h1>
          <p className="text-white/80">Continue your learning journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60 mb-1">Courses Completed</p>
                <p className="text-2xl font-bold text-white">{stats.coursesCompleted}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60 mb-1">Certificates</p>
                <p className="text-2xl font-bold text-white">{stats.certificatesEarned}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60 mb-1">Leaderboard</p>
                <p className="text-2xl font-bold text-white">#{stats.leaderboardPosition}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60 mb-1">Pending Assignments</p>
                <p className="text-2xl font-bold text-white">{stats.assignmentsPending}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Enrolled Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">My Courses</h2>
            <Link to="/courses">
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                Browse All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          {enrolledCourses.length === 0 ? (
            <Card className="p-12 text-center bg-white/5 backdrop-blur-md border-white/10">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-white/60" />
              <h3 className="text-lg font-semibold mb-2 text-white">No courses enrolled yet</h3>
              <p className="text-white/80 mb-4">
                Start your learning journey by enrolling in a course
              </p>
              <Link to="/courses">
                <Button className="bg-white text-black hover:bg-white/90 border-2 border-white">Browse Courses</Button>
              </Link>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden cred-hover bg-white/5 backdrop-blur-md border-white/10">
                  <div className="aspect-video bg-white/5 relative">
                    {course.thumbnail && (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold mb-2 line-clamp-2 text-white">{course.title}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={course.mentor.avatar} />
                        <AvatarFallback className="bg-white/10 text-white text-xs">{course.mentor.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-white/60">{course.mentor.name}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">Progress</span>
                        <span className="font-medium text-white">{course.progress || 0}%</span>
                      </div>
                      <Progress value={course.progress || 0} className="h-2" />
                    </div>
                    <Link to={`/courses/${course.id}/learn`} className="mt-4 block">
                      <Button className="w-full border-white/20 text-white hover:bg-white/10" variant="outline">
                        Continue Learning
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Assignments */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-white">Upcoming Assignments</h2>
          <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
            <div className="space-y-4">
              {stats.assignmentsPending > 0 ? (
                <>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Assignment 1: React Components</p>
                        <p className="text-sm text-white/60">Due in 2 days</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-white text-black hover:bg-white/90 border-2 border-white">Submit</Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-white/60">
                  No pending assignments
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Recommended Courses */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Recommended for You</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden cred-hover bg-white/5 backdrop-blur-md border-white/10">
                <div className="aspect-video bg-white/5" />
                <div className="p-6">
                  <Badge className="mb-2 bg-white/10 text-white border-white/20">JavaScript</Badge>
                  <h3 className="font-semibold mb-2 text-white">Advanced React Patterns</h3>
                  <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                    <span>4.8 ⭐</span>
                    <span>120 students</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">₹999/month</span>
                    <Button size="sm" className="bg-white text-black hover:bg-white/90 border-2 border-white">
                      Enroll
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

