import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/lib/stores/authStore";
import { useCourseStore } from "@/lib/stores/courseStore";
import { apiClient } from "@/lib/api/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Users,
  TrendingUp,
  DollarSign,
  Plus,
  ArrowRight,
  Award,
  Clock,
} from "lucide-react";
import { Navigation } from "@/components/ui/navigation";

export default function MentorDashboard() {
  const { user } = useAuthStore();
  const { courses, setCourses } = useCourseStore();

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        const data = await apiClient.get<{
          courses: any[];
          stats: {
            totalStudents: number;
            totalRevenue: number;
            completionRate: number;
            pendingCertifications: number;
          };
        }>("/dashboard/mentor");

        setCourses(data.courses);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchDashboardData();
  }, [user, setCourses]);

  if (!user) {
    return null;
  }

  const stats = {
    totalStudents: 145,
    totalRevenue: 125000,
    completionRate: 78,
    pendingCertifications: 12,
  };

  return (
    <div className="min-h-screen bg-black text-white page-transition">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-7xl pt-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-white">Welcome back, {user.name}!</h1>
            <p className="text-white/80">Manage your courses and students</p>
          </div>
          <Link to="/courses/create">
            <Button className="bg-white text-black hover:bg-white/90 border-2 border-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60 mb-1">Total Students</p>
                <p className="text-2xl font-bold text-white">{stats.totalStudents}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-white">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60 mb-1">Completion Rate</p>
                <p className="text-2xl font-bold text-white">{stats.completionRate}%</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60 mb-1">Pending Certifications</p>
                <p className="text-2xl font-bold text-white">{stats.pendingCertifications}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Published Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">My Courses</h2>
            <Link to="/courses/create">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create New
              </Button>
            </Link>
          </div>

          {courses.length === 0 ? (
            <Card className="p-12 text-center bg-white/5 backdrop-blur-md border-white/10">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-white/60" />
              <h3 className="text-lg font-semibold mb-2 text-white">No courses published yet</h3>
              <p className="text-white/80 mb-4">
                Create your first course and start teaching students
              </p>
              <Link to="/courses/create">
                <Button className="bg-white text-black hover:bg-white/90 border-2 border-white">Create Course</Button>
              </Link>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
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
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold line-clamp-2 flex-1 text-white">{course.title}</h3>
                      <Badge variant="secondary" className="bg-white/10 text-white border-white/20">{course.category}</Badge>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">Students Enrolled</span>
                        <span className="font-medium text-white">{course.studentCount}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">Rating</span>
                        <span className="font-medium text-white">
                          {course.rating} ⭐ ({course.reviewCount})
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/courses/${course.id}`} className="flex-1">
                        <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                          View Details
                        </Button>
                      </Link>
                      <Link to={`/courses/${course.id}/leaderboard`} className="flex-1">
                        <Button className="w-full bg-white text-black hover:bg-white/90 border-2 border-white">Leaderboard</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Internship Selection Queue */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Internship Selection Queue</h2>
          <Card className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Advanced React Patterns</p>
                      <p className="text-sm text-muted-foreground">
                        Top 5 students ready for selection
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Select Students
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Revenue Overview */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Revenue Overview</h2>
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">₹45,000</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Last Month</span>
                  <span className="text-sm font-medium">₹38,000</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

