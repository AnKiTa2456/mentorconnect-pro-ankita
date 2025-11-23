import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/lib/stores/authStore";
import { apiClient } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Navigation } from "@/components/ui/navigation";

const profileSchema = z.object({
  name: z.string().min(2).max(100),
  bio: z.string().max(500).optional(),
  skills: z.array(z.string()).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileEdit() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const [avatar, setAvatar] = useState<string | null>(user?.avatar || null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      bio: user?.bio || "",
      skills: user?.skills || [],
    },
  });

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await apiClient.post<{ url: string }>("/upload/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAvatar(response.url);
      toast.success("Avatar uploaded");
    } catch {
      toast.error("Failed to upload");
    } finally {
      setUploading(false);
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await apiClient.post<{ url: string }>("/upload/cover", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCoverImage(response.url);
      toast.success("Cover image uploaded");
    } catch {
      toast.error("Failed to upload");
    } finally {
      setUploading(false);
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const updatedUser = await apiClient.put<typeof user>("/profile/edit", {
        ...data,
        avatar,
        coverImage,
        skills,
      });
      setUser(updatedUser);
      toast.success("Profile updated successfully!");
      navigate(`/profile/${updatedUser.username}`);
    } catch {
      toast.error("Failed to update profile");
    }
  };

  if (!user) {
    navigate("/auth/select-role");
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white page-transition">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-4xl pt-24">
        <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Cover Image */}
          <Card className="p-6">
            <Label>Cover Image</Label>
            <div className="mt-2 h-48 bg-muted rounded-lg relative overflow-hidden">
              {coverImage && (
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
              )}
              <Label className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-black/20 transition">
                <Button type="button" variant="outline" disabled={uploading}>
                  {uploading ? "Uploading..." : "Upload Cover"}
                </Button>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverUpload}
                />
              </Label>
            </div>
          </Card>

          {/* Avatar */}
          <Card className="p-6">
            <Label>Avatar</Label>
            <div className="mt-4 flex items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatar || undefined} />
                <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <Label>
                  <Button type="button" variant="outline" disabled={uploading}>
                    {uploading ? "Uploading..." : "Change Avatar"}
                  </Button>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </Label>
              </div>
            </div>
          </Card>

          {/* Name */}
          <Card className="p-6">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...register("name")}
              className={`mt-2 ${errors.name ? "border-destructive" : ""}`}
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
          </Card>

          {/* Bio */}
          <Card className="p-6">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              {...register("bio")}
              className={`mt-2 ${errors.bio ? "border-destructive" : ""}`}
              rows={4}
            />
            {errors.bio && <p className="text-sm text-destructive mt-1">{errors.bio.message}</p>}
          </Card>

          {/* Skills */}
          <Card className="p-6">
            <Label>Skills</Label>
            <div className="mt-2 flex gap-2">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Add a skill"
              />
              <Button type="button" onClick={addSkill}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button type="submit" className="gradient-bg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

