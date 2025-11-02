import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Lightbulb, Image, HelpCircle, CheckCircle2, XCircle, BookOpen } from "lucide-react";
import { Lesson, Quiz as QuizType } from "@/data/courseContent";
import { toast } from "sonner";

interface LessonContentProps {
  lesson: Lesson;
  onComplete: () => void;
}

export const LessonContent = ({ lesson, onComplete }: LessonContentProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (quizIndex: number, answerIndex: number) => {
    if (!showResults) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [quizIndex]: answerIndex,
      }));
    }
  };

  const handleSubmitQuiz = () => {
    const allAnswered = lesson.quiz.every((_, idx) => selectedAnswers[idx] !== undefined);
    
    if (!allAnswered) {
      toast.error("Please answer all questions before submitting");
      return;
    }

    setShowResults(true);
    const correctCount = lesson.quiz.filter(
      (q, idx) => selectedAnswers[idx] === q.correctAnswer
    ).length;

    if (correctCount === lesson.quiz.length) {
      toast.success("Perfect score! Lesson completed! 🎉");
      setTimeout(onComplete, 1500);
    } else {
      toast.info(`You got ${correctCount} out of ${lesson.quiz.length} correct`);
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="mx-auto max-w-6xl">
        {/* Video Section */}
        <div className="bg-card border-b">
          <div className="aspect-video w-full bg-muted flex items-center justify-center">
            <div className="text-center">
              <div className="mb-4 h-20 w-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="h-10 w-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
              <p className="text-sm text-muted-foreground">Video content will be added here</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Tabs defaultValue="script" className="w-full">
            <TabsList className="grid w-full grid-cols-5 h-auto p-1">
              <TabsTrigger value="script" className="gap-2 py-3">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Script</span>
              </TabsTrigger>
              <TabsTrigger value="visuals" className="gap-2 py-3">
                <Image className="h-4 w-4" />
                <span className="hidden sm:inline">Visuals</span>
              </TabsTrigger>
              <TabsTrigger value="examples" className="gap-2 py-3">
                <Lightbulb className="h-4 w-4" />
                <span className="hidden sm:inline">Examples</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="gap-2 py-3">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Resources</span>
              </TabsTrigger>
              <TabsTrigger value="quiz" className="gap-2 py-3">
                <HelpCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Quiz</span>
              </TabsTrigger>
            </TabsList>

          <TabsContent value="script" className="mt-6">
            <Card className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <FileText className="h-5 w-5 text-primary" />
                Trainer Script
              </h2>
              <div className="prose prose-slate max-w-none">
                {lesson.trainerScript.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 leading-relaxed text-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="visuals" className="mt-6">
            <Card className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <Image className="h-5 w-5 text-primary" />
                Visual Suggestions
              </h2>
              <div className="rounded-lg bg-accent/50 p-6">
                <p className="leading-relaxed text-foreground">{lesson.visualSuggestion}</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="mt-6">
            <Card className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <Lightbulb className="h-5 w-5 text-primary" />
                Real-World Examples & Analogies
              </h2>
              <div className="prose prose-slate max-w-none">
                {lesson.example.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 leading-relaxed text-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
              <Card className="p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Course Resources
                </h2>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                    <h3 className="font-semibold mb-2">📄 Downloadable Materials</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Test Case Templates</li>
                      <li>• SDLC & STLC Diagrams</li>
                      <li>• Bug Report Template</li>
                      <li>• Testing Checklist</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                    <h3 className="font-semibold mb-2">🔗 Additional Reading</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• ISTQB Foundation Level Syllabus</li>
                      <li>• Industry Best Practices Guide</li>
                      <li>• Testing Tools Comparison Chart</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                    <h3 className="font-semibold mb-2">💻 Practice Resources</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Sample E-commerce Test Scenarios</li>
                      <li>• Practice Bug Reports</li>
                      <li>• Test Plan Examples</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="quiz" className="mt-6">
              <Card className="p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  Knowledge Check
                </h2>
                
                <div className="space-y-6">
                  {lesson.quiz.map((question, qIdx) => (
                    <div key={qIdx} className="rounded-lg border p-4">
                      <p className="mb-4 font-medium">
                        {qIdx + 1}. {question.question}
                      </p>
                      <div className="space-y-2">
                        {question.options.map((option, oIdx) => {
                          const isSelected = selectedAnswers[qIdx] === oIdx;
                          const isCorrect = oIdx === question.correctAnswer;
                          const showCorrect = showResults && isCorrect;
                          const showIncorrect = showResults && isSelected && !isCorrect;

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleAnswerSelect(qIdx, oIdx)}
                              disabled={showResults}
                              className={cn(
                                "w-full rounded-lg border p-3 text-left transition-all",
                                isSelected && !showResults && "border-primary bg-accent",
                                showCorrect && "border-success bg-success/10",
                                showIncorrect && "border-destructive bg-destructive/10",
                                !showResults && "hover:bg-accent"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                {showCorrect && <CheckCircle2 className="h-5 w-5 text-success" />}
                                {showIncorrect && <XCircle className="h-5 w-5 text-destructive" />}
                                <span>{option}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      {showResults && (
                        <div className="mt-4 rounded-lg bg-accent p-3 text-sm">
                          <p className="font-medium text-primary">Explanation:</p>
                          <p className="mt-1 text-muted-foreground">{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  {!showResults ? (
                    <Button onClick={handleSubmitQuiz} className="flex-1">
                      Submit Quiz
                    </Button>
                  ) : (
                    <>
                      <Button onClick={resetQuiz} variant="outline" className="flex-1">
                        Try Again
                      </Button>
                      <Button onClick={onComplete} className="flex-1">
                        Mark Complete & Continue
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
