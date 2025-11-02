import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { CourseHeader } from "@/components/CourseHeader";
import { LessonNav } from "@/components/LessonNav";
import { LessonContent } from "@/components/LessonContent";
import { module1Lessons } from "@/data/courseContent";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [currentLessonId, setCurrentLessonId] = useState(module1Lessons[0].id);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const currentLesson = module1Lessons.find((l) => l.id === currentLessonId) || module1Lessons[0];

  const handleLessonComplete = () => {
    setCompletedLessons((prev) => new Set([...prev, currentLessonId]));
    
    // Auto-advance to next lesson
    const currentIndex = module1Lessons.findIndex((l) => l.id === currentLessonId);
    if (currentIndex < module1Lessons.length - 1) {
      setCurrentLessonId(module1Lessons[currentIndex + 1].id);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <CourseHeader />
      <div className="flex flex-1 overflow-hidden">
        <LessonNav
          currentLessonId={currentLessonId}
          onLessonSelect={setCurrentLessonId}
          completedLessons={completedLessons}
        />
        <LessonContent lesson={currentLesson} onComplete={handleLessonComplete} />
      </div>
    </div>
  );
};

export default Index;
