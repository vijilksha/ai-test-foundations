import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Module {
  id: string;
  title: string;
  description: string;
  order_index: number;
}

export const ModuleManager = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [orderIndex, setOrderIndex] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    const { data, error } = await supabase
      .from("modules")
      .select("*")
      .order("order_index");

    if (error) {
      toast.error("Failed to fetch modules");
    } else {
      setModules(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const moduleData = {
      title,
      description,
      order_index: parseInt(orderIndex),
    };

    if (editingId) {
      const { error } = await supabase
        .from("modules")
        .update(moduleData)
        .eq("id", editingId);

      if (error) {
        toast.error("Failed to update module");
      } else {
        toast.success("Module updated successfully");
        resetForm();
        fetchModules();
      }
    } else {
      const { error } = await supabase.from("modules").insert(moduleData);

      if (error) {
        toast.error("Failed to create module");
      } else {
        toast.success("Module created successfully");
        resetForm();
        fetchModules();
      }
    }
  };

  const handleEdit = (module: Module) => {
    setEditingId(module.id);
    setTitle(module.title);
    setDescription(module.description);
    setOrderIndex(module.order_index.toString());
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this module?")) return;

    const { error } = await supabase.from("modules").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete module");
    } else {
      toast.success("Module deleted successfully");
      fetchModules();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setOrderIndex("");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border p-4">
        <h3 className="font-semibold">{editingId ? "Edit Module" : "Create New Module"}</h3>
        
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Module title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Module description"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="orderIndex">Order Index</Label>
          <Input
            id="orderIndex"
            type="number"
            value={orderIndex}
            onChange={(e) => setOrderIndex(e.target.value)}
            placeholder="1"
            required
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit">
            {editingId ? "Update" : "Create"} Module
          </Button>
          {editingId && (
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="space-y-2">
        <h3 className="font-semibold">Existing Modules</h3>
        {modules.map((module) => (
          <div
            key={module.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <h4 className="font-medium">{module.title}</h4>
              <p className="text-sm text-muted-foreground">{module.description}</p>
              <p className="text-xs text-muted-foreground">Order: {module.order_index}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(module)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(module.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};