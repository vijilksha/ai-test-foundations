import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Lightbulb, Image, HelpCircle, CheckCircle2, XCircle } from "lucide-react";
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
    <div className="flex-1 overflow-auto">
      <div className="container mx-auto max-w-4xl p-6">
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold">{lesson.title}</h1>
          <div className="h-1 w-20 rounded-full bg-gradient-to-r from-primary to-primary/50" />
        </div>

        <Tabs defaultValue="script" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="script" className="gap-2">
              <FileText className="h-4 w-4" />
              Script
            </TabsTrigger>
            <TabsTrigger value="visuals" className="gap-2">
              <Image className="h-4 w-4" />
              Visuals
            </TabsTrigger>
            <TabsTrigger value="examples" className="gap-2">
              <Lightbulb className="h-4 w-4" />
              Examples
            </TabsTrigger>
            <TabsTrigger value="quiz" className="gap-2">
              <HelpCircle className="h-4 w-4" />
              Quiz
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
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
