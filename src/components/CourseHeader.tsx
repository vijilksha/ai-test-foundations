import { BookOpen, Award } from "lucide-react";

export const CourseHeader = () => {
  return (
    <header className="border-b bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white/10 p-2 backdrop-blur">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI-Powered Automation Testing</h1>
              <p className="text-sm text-primary-foreground/80">From Selenium to Playwright</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur">
            <Award className="h-5 w-5" />
            <span className="text-sm font-medium">Module 1: Foundation</span>
          </div>
        </div>
      </div>
    </header>
  );
};
