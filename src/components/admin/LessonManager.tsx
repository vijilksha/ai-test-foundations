import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Edit, Trash2, Wand2 } from "lucide-react";

interface Module {
  id: string;
  title: string;
}

interface Lesson {
  id: string;
  module_id: string;
  title: string;
  description: string;
  video_url: string;
  order_index: number;
}

export const LessonManager = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [trainerScript, setTrainerScript] = useState("");
  const [visualSuggestion, setVisualSuggestion] = useState("");
  const [exampleCode, setExampleCode] = useState("");
  const [resources, setResources] = useState("");
  const [orderIndex, setOrderIndex] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [generatingContent, setGeneratingContent] = useState(false);

  useEffect(() => {
    fetchModules();
    fetchLessons();
  }, []);

  const fetchModules = async () => {
    const { data } = await supabase.from("modules").select("id, title").order("order_index");
    setModules(data || []);
  };

  const fetchLessons = async () => {
    const { data } = await supabase.from("lessons").select("*").order("order_index");
    setLessons(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const lessonData = {
      module_id: selectedModuleId,
      title,
      description,
      video_url: videoUrl,
      trainer_script: trainerScript,
      visual_suggestion: visualSuggestion,
      example_code: exampleCode,
      resources,
      order_index: parseInt(orderIndex),
    };

    if (editingId) {
      const { error } = await supabase.from("lessons").update(lessonData).eq("id", editingId);
      if (error) {
        toast.error("Failed to update lesson");
      } else {
        toast.success("Lesson updated successfully");
        resetForm();
        fetchLessons();
      }
    } else {
      const { error } = await supabase.from("lessons").insert(lessonData);
      if (error) {
        toast.error("Failed to create lesson");
      } else {
        toast.success("Lesson created successfully");
        resetForm();
        fetchLessons();
      }
    }
  };

  const handleEdit = (lesson: Lesson) => {
    setEditingId(lesson.id);
    setSelectedModuleId(lesson.module_id);
    setTitle(lesson.title);
    setDescription(lesson.description);
    setVideoUrl(lesson.video_url);
    setOrderIndex(lesson.order_index.toString());
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;

    const { error } = await supabase.from("lessons").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete lesson");
    } else {
      toast.success("Lesson deleted successfully");
      fetchLessons();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setSelectedModuleId("");
    setTitle("");
    setDescription("");
    setVideoUrl("");
    setTrainerScript("");
    setVisualSuggestion("");
    setExampleCode("");
    setResources("");
    setOrderIndex("");
  };

  const handleGenerateContent = async (lessonId: string) => {
    setGeneratingContent(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-video-content', {
        body: { lessonId }
      });

      if (error) throw error;

      // Persist generated asset URLs into the lesson resources as JSON
      if (data?.imageUrl || data?.audioUrl) {
        const resourcesPayload = JSON.stringify({
          generated_image_url: data.imageUrl || null,
          generated_audio_url: data.audioUrl || null,
        });
        const { error: updateError } = await supabase
          .from('lessons')
          .update({ resources: resourcesPayload })
          .eq('id', lessonId);
        if (updateError) throw updateError;
      }

      toast.success("Generated image and narration saved to lesson. Open the lesson to preview.");
      fetchLessons();
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate video content");
    } finally {
      setGeneratingContent(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border p-4">
        <h3 className="font-semibold">{editingId ? "Edit Lesson" : "Create New Lesson"}</h3>
        
        <div className="space-y-2">
          <Label htmlFor="module">Module</Label>
          <Select value={selectedModuleId} onValueChange={setSelectedModuleId} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a module" />
            </SelectTrigger>
            <SelectContent>
              {modules.map((module) => (
                <SelectItem key={module.id} value={module.id}>
                  {module.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="videoUrl">Video URL</Label>
          <Input id="videoUrl" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="trainerScript">Trainer Script</Label>
          <Textarea id="trainerScript" value={trainerScript} onChange={(e) => setTrainerScript(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="visualSuggestion">Visual Suggestion</Label>
          <Textarea id="visualSuggestion" value={visualSuggestion} onChange={(e) => setVisualSuggestion(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="exampleCode">Example Code</Label>
          <Textarea id="exampleCode" value={exampleCode} onChange={(e) => setExampleCode(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="resources">Resources (JSON)</Label>
          <Textarea id="resources" value={resources} onChange={(e) => setResources(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="orderIndex">Order Index</Label>
          <Input id="orderIndex" type="number" value={orderIndex} onChange={(e) => setOrderIndex(e.target.value)} required />
        </div>

        <div className="flex gap-2">
          <Button type="submit">{editingId ? "Update" : "Create"} Lesson</Button>
          {editingId && (
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="space-y-2">
        <h3 className="font-semibold">Existing Lessons</h3>
        {lessons.map((lesson) => (
          <div key={lesson.id} className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <h4 className="font-medium">{lesson.title}</h4>
              <p className="text-sm text-muted-foreground">{lesson.description}</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleGenerateContent(lesson.id)}
                disabled={generatingContent}
              >
                <Wand2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleEdit(lesson)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(lesson.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};