import { useState } from "react";
import { Edit, Save, X, FileText, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useUpdateArticle } from "@/hooks/useKnowleadgeBase";
import { useToast } from "@/hooks/use-toast";
import { AdminButton } from "@/components/AdminAuth";

interface Article {
  id: string;
  title: string;
  content: string;
  type: "section" | "article";
  lastModified?: string;
  author?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

interface ArticleViewerProps {
  article: Article | null;
  onSave?: (article: Article) => void;
}

export function ArticleViewer({ article, onSave }: ArticleViewerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  
  const updateArticle = useUpdateArticle();
  const { toast } = useToast();

  if (!article) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center space-y-2">
          <FileText className="h-12 w-12 mx-auto opacity-50" />
          <p className="text-lg">Select an article to view</p>
          <p className="text-sm">Choose an item from the sidebar to get started</p>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setEditedTitle(article.title);
    setEditedContent(article.content || "");
    setIsEditing(true);
    console.log(`Editing article: ${article.title}`);
  };

  const handleSave = async () => {
    if (article.type === "article") {
      try {
        await updateArticle.mutateAsync({
          id: article.id,
          article: {
            title: editedTitle,
            content: editedContent
          }
        });
        
        const updatedArticle = {
          ...article,
          title: editedTitle,
          content: editedContent,
          lastModified: new Date().toLocaleDateString()
        };
        
        onSave?.(updatedArticle);
        setIsEditing(false);
        
        toast({
          title: "Success",
          description: "Article updated successfully"
        });
        
        console.log(`Saved article: ${editedTitle}`);
      } catch (error) {
        toast({
          title: "Error", 
          description: "Failed to update article",
          variant: "destructive"
        });
        console.error("Error saving article:", error);
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle("");
    setEditedContent("");
    console.log(`Cancelled editing: ${article.title}`);
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {article.type === "section" ? "Section" : "Article"}
              </Badge>
              {article.lastModified && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Modified {article.lastModified}</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              {!isEditing && article.type === "article" && (
                <AdminButton>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleEdit}
                    data-testid="button-edit"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </AdminButton>
              )}
              
              {isEditing && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleCancel}
                    data-testid="button-cancel"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleSave}
                    data-testid="button-save"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </>
              )}
            </div>
          </div>
          
          {isEditing ? (
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="text-2xl font-bold"
              placeholder="Article title..."
              data-testid="input-title"
            />
          ) : (
            <h1 className="text-2xl font-bold text-foreground" data-testid="text-title">
              {article.title}
            </h1>
          )}
          
          {article.author && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <User className="h-3 w-3" />
              <span>By {article.author}</span>
            </div>
          )}
        </CardHeader>
        
        <Separator />
        
        <CardContent className="flex-1 p-6">
          {isEditing ? (
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-[400px] resize-none"
              placeholder="Write your content here..."
              data-testid="textarea-content"
            />
          ) : (
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <div 
                className="whitespace-pre-wrap text-foreground leading-relaxed"
                data-testid="text-content"
              >
                {article.content}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}