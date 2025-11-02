import { Check, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  order_index: number;
}

interface LessonNavProps {
  modules: Module[];
  lessons: Lesson[];
  currentLessonId: string;
  onLessonSelect: (lessonId: string) => void;
  completedLessons: Set<string>;
}

export const LessonNav = ({ modules, lessons, currentLessonId, onLessonSelect, completedLessons }: LessonNavProps) => {
  return (
    <aside className="w-80 border-r bg-card">
      <ScrollArea className="h-full">
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Course Content</h2>
          <div className="space-y-6">
            {modules.map((module) => {
              const moduleLessons = lessons.filter((l) => l.module_id === module.id);
              const completedCount = moduleLessons.filter((l) => completedLessons.has(l.id)).length;
              
              return (
                <div key={module.id} className="space-y-2">
                  <div className="flex items-start gap-2 mb-3">
                    <BookOpen className="h-4 w-4 mt-1 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold text-sm leading-tight">{module.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {completedCount} / {moduleLessons.length} lessons
                      </p>
                    </div>
                  </div>
                  <nav className="space-y-1 pl-6">
                    {moduleLessons.map((lesson, index) => (
                      <button
                        key={lesson.id}
                        onClick={() => onLessonSelect(lesson.id)}
                        className={cn(
                          "w-full rounded-lg p-2 text-left transition-all hover:bg-accent",
                          currentLessonId === lesson.id && "bg-accent ring-1 ring-primary"
                        )}
                      >
                        <div className="flex items-start gap-2">
                          <div
                            className={cn(
                              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                              completedLessons.has(lesson.id)
                                ? "bg-success text-success-foreground"
                                : currentLessonId === lesson.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {completedLessons.has(lesson.id) ? <Check className="h-3 w-3" /> : index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium leading-tight">{lesson.title}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </nav>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};
