import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { module1Lessons } from "@/data/courseContent";

interface LessonNavProps {
  currentLessonId: string;
  onLessonSelect: (lessonId: string) => void;
  completedLessons: Set<string>;
}

export const LessonNav = ({ currentLessonId, onLessonSelect, completedLessons }: LessonNavProps) => {
  return (
    <aside className="w-80 border-r bg-card">
      <div className="sticky top-0 p-6">
        <h2 className="mb-4 text-lg font-semibold">Course Lessons</h2>
        <nav className="space-y-2">
          {module1Lessons.map((lesson, index) => (
            <button
              key={lesson.id}
              onClick={() => onLessonSelect(lesson.id)}
              className={cn(
                "w-full rounded-lg p-3 text-left transition-all hover:bg-accent",
                currentLessonId === lesson.id && "bg-accent ring-2 ring-primary"
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                    completedLessons.has(lesson.id)
                      ? "bg-success text-success-foreground"
                      : currentLessonId === lesson.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {completedLessons.has(lesson.id) ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight">{lesson.title}</p>
                  {completedLessons.has(lesson.id) && (
                    <p className="mt-1 text-xs text-success">Completed</p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};
