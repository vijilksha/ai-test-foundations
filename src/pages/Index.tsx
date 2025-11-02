import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { CourseHeader } from "@/components/CourseHeader";
import { LessonNav } from "@/components/LessonNav";
import { LessonContent } from "@/components/LessonContent";
import { toast } from "sonner";

interface Module {
  id: string;
  title: string;
  description: string;
  order_index: number;
}

interface Lesson {
  id: string;
  module_id: string;
  title: string;
  description: string;
  video_url: string;
  trainer_script: string;
  visual_suggestion: string | null;
  example_code: string | null;
  resources: string | null;
  order_index: number;
}

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonId, setCurrentLessonId] = useState<string>("");
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    fetchModulesAndLessons();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserProgress();
    }
  }, [user]);

  const fetchModulesAndLessons = async () => {
    try {
      const { data: modulesData, error: modulesError } = await supabase
        .from("modules")
        .select("*")
        .order("order_index");

      if (modulesError) throw modulesError;

      const { data: lessonsData, error: lessonsError } = await supabase
        .from("lessons")
        .select("*")
        .order("order_index");

      if (lessonsError) throw lessonsError;

      setModules(modulesData || []);
      setLessons(lessonsData || []);
      
      if (lessonsData && lessonsData.length > 0) {
        setCurrentLessonId(lessonsData[0].id);
      }
    } catch (error: any) {
      toast.error("Failed to load course content");
      console.error(error);
    } finally {
      setDataLoading(false);
    }
  };

  const fetchUserProgress = async () => {
    try {
      const { data } = await supabase
        .from("user_progress")
        .select("lesson_id")
        .eq("user_id", user?.id);

      if (data) {
        setCompletedLessons(new Set(data.map((p) => p.lesson_id)));
      }
    } catch (error) {
      console.error("Failed to fetch progress:", error);
    }
  };

  const handleLessonComplete = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("user_progress")
        .insert({ user_id: user.id, lesson_id: currentLessonId });

      if (error && !error.message.includes("duplicate")) {
        throw error;
      }

      setCompletedLessons((prev) => new Set([...prev, currentLessonId]));
      toast.success("Lesson completed!");

      const currentIndex = lessons.findIndex((l) => l.id === currentLessonId);
      if (currentIndex < lessons.length - 1) {
        setCurrentLessonId(lessons[currentIndex + 1].id);
      }
    } catch (error: any) {
      toast.error("Failed to save progress");
      console.error(error);
    }
  };

  const handleRefreshLesson = async () => {
    try {
      const { data: lessonsData, error } = await supabase
        .from("lessons")
        .select("*")
        .order("order_index");

      if (error) throw error;
      setLessons(lessonsData || []);
    } catch (error) {
      console.error("Failed to refresh lesson:", error);
    }
  };

  const isDemoMode = !user && !loading;
  const currentLesson = lessons.find((l) => l.id === currentLessonId);

  if (loading || dataLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading course content...</p>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>No course content available yet.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {isDemoMode && (
        <div className="bg-yellow-500/10 border-b border-yellow-500/30 px-4 py-2 text-center">
          <p className="text-sm">
            <strong>Demo Mode:</strong> This is a preview of the student dashboard.{" "}
            <button
              onClick={() => navigate("/auth")}
              className="underline font-semibold hover:text-primary"
            >
              Sign up to access all features
            </button>
          </p>
        </div>
      )}
      <CourseHeader />
      <div className="flex flex-1 overflow-hidden">
        <LessonNav
          modules={modules}
          lessons={lessons}
          currentLessonId={currentLessonId}
          onLessonSelect={setCurrentLessonId}
          completedLessons={completedLessons}
        />
        {currentLesson && (
          <LessonContent 
            lesson={currentLesson} 
            onComplete={handleLessonComplete}
            onRefresh={handleRefreshLesson}
          />
        )}
      </div>
    </div>
  );
};

export default Index;