import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Lightbulb, Code, BookOpen, CheckCircle2 } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  description: string;
  video_url: string;
  trainer_script: string;
  visual_suggestion: string | null;
  example_code: string | null;
  resources: string | null;
}

interface LessonContentProps {
  lesson: Lesson;
  onComplete: () => void;
}

export const LessonContent = ({ lesson, onComplete }: LessonContentProps) => {
  let resourcesRaw: any = [];
  try {
    resourcesRaw = lesson.resources ? JSON.parse(lesson.resources) : [];
  } catch {
    resourcesRaw = [];
  }
  const resourceList: string[] = Array.isArray(resourcesRaw)
    ? resourcesRaw
    : Array.isArray(resourcesRaw?.items)
      ? resourcesRaw.items
      : [];
  const generatedImageUrl: string | undefined = resourcesRaw?.generated_image_url || undefined;
  const generatedAudioUrl: string | undefined = resourcesRaw?.generated_audio_url || undefined;
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="container mx-auto max-w-5xl p-6 space-y-6">
        {/* Lesson Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
          <p className="text-muted-foreground">{lesson.description}</p>
        </div>

        {/* Media */}
        <Card className="overflow-hidden">
          <div className="relative aspect-video flex items-center justify-center bg-muted">
            {generatedImageUrl || generatedAudioUrl ? (
              <div className="w-full h-full flex flex-col md:flex-row gap-4 p-4">
                {generatedImageUrl && (
                  <img
                    src={generatedImageUrl}
                    alt={`${lesson.title} AI generated visual`}
                    className="rounded-md object-contain w-full md:w-1/2"
                    loading="lazy"
                  />)
                }
                {generatedAudioUrl && (
                  <div className="flex-1 flex items-center justify-center">
                    <audio controls className="w-full">
                      <source src={generatedAudioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </div>
            ) : (
              <iframe
                src={lesson.video_url}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={lesson.title}
              />
            )}
          </div>
        </Card>

        {/* Tabs for content */}
        <Tabs defaultValue="script" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="script">
              <FileText className="mr-2 h-4 w-4" />
              Script
            </TabsTrigger>
            <TabsTrigger value="visuals">
              <Lightbulb className="mr-2 h-4 w-4" />
              Visuals
            </TabsTrigger>
            <TabsTrigger value="examples">
              <Code className="mr-2 h-4 w-4" />
              Examples
            </TabsTrigger>
            <TabsTrigger value="resources">
              <BookOpen className="mr-2 h-4 w-4" />
              Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="script">
            <Card className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <FileText className="h-5 w-5 text-primary" />
                Trainer Script
              </h2>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p className="leading-relaxed whitespace-pre-wrap">{lesson.trainer_script}</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="visuals">
            <Card className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <Lightbulb className="h-5 w-5 text-primary" />
                Visual Suggestions
              </h2>
              {lesson.visual_suggestion ? (
                <div className="rounded-lg bg-accent/50 p-6">
                  <p className="leading-relaxed whitespace-pre-wrap">{lesson.visual_suggestion}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">No visual suggestions available for this lesson.</p>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="examples">
            <Card className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <Code className="h-5 w-5 text-primary" />
                Code Examples
              </h2>
              {lesson.example_code ? (
                <div className="rounded-lg bg-muted p-4">
                  <pre className="overflow-x-auto">
                    <code className="text-sm">{lesson.example_code}</code>
                  </pre>
                </div>
              ) : (
                <p className="text-muted-foreground">No code examples available for this lesson.</p>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <BookOpen className="h-5 w-5 text-primary" />
                Additional Resources
              </h2>
              {resourceList.length > 0 ? (
                <ul className="space-y-2">
                  {resourceList.map((resource: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-1 text-primary shrink-0" />
                      <span>{resource}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No additional resources available for this lesson.</p>
              )}
            </Card>
          </TabsContent>
        </Tabs>

        {/* Complete Lesson Button */}
        <div className="flex justify-end">
          <Button onClick={onComplete} size="lg" className="gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Mark as Complete
          </Button>
        </div>
      </div>
    </main>
  );
};