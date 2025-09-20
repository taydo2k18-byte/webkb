import { useState, useMemo } from "react";
import { ChevronDown, ChevronRight, FileText, Folder, Plus, Search, Shield, ShieldCheck, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSections, useArticles, useCreateSection, useCreateArticle } from "@/hooks/useKnowleadgeBase";
import { useAdmin, AdminButton } from "@/components/AdminAuth";
import { useToast } from "@/hooks/use-toast";
import type { KbSection, KbArticle } from "@shared/schema";

interface KbItem {
  id: string;
  title: string;
  type: "section" | "article";
  children?: KbItem[];
  content?: string;
  parentId?: string | null;
}

interface KnowledgeBaseSidebarProps {
  selectedItemId?: string;
  onItemSelect: (item: KbItem) => void;
}

export function KnowledgeBaseSidebar({ selectedItemId, onItemSelect }: KnowledgeBaseSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [showCreateSection, setShowCreateSection] = useState(false);
  const [showCreateArticle, setShowCreateArticle] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newArticleTitle, setNewArticleTitle] = useState("");
  const [newArticleContent, setNewArticleContent] = useState("");
  const [selectedSectionForArticle, setSelectedSectionForArticle] = useState<string>("");
  
  const { data: sections = [], isLoading: sectionsLoading } = useSections();
  const { data: articles = [], isLoading: articlesLoading } = useArticles();
  const { data: searchResults = [] } = useArticles({ search: searchQuery.trim() });
  
  const createSection = useCreateSection();
  const createArticle = useCreateArticle();
  const { isAdmin, logout } = useAdmin();
  const { toast } = useToast();

  // Build hierarchical structure from sections and articles
  const hierarchicalData = useMemo(() => {
    const buildHierarchy = (items: (KbSection | KbArticle)[], parentId: string | null = null): KbItem[] => {
      const children: KbItem[] = [];
      
      // Add sections that belong to this parent
      const sectionsToAdd = sections.filter((section: any) => section.parentId === parentId);
      sectionsToAdd.forEach((section: any) => {
        const sectionItem: KbItem = {
          id: section.id,
          title: section.title,
          type: "section",
          parentId: section.parentId,
          children: buildHierarchy(items, section.id)
        };
        
        // Also add articles that belong to this section
        const sectionArticles = articles.filter((article: any) => article.sectionId === section.id);
        sectionArticles.forEach((article: any) => {
          sectionItem.children?.push({
            id: article.id,
            title: article.title,
            type: "article",
            content: article.content,
            parentId: section.id
          });
        });
        
        children.push(sectionItem);
      });
      
      return children;
    };
    
    return buildHierarchy([...sections, ...articles]);
  }, [sections, articles]);

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleCreateSection = async () => {
    if (!newSectionTitle.trim()) return;
    
    try {
      await createSection.mutateAsync({
        title: newSectionTitle.trim(),
        parentId: null,
        order: Date.now().toString()
      });
      
      setNewSectionTitle("");
      setShowCreateSection(false);
      
      toast({
        title: "Success",
        description: "Section created successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create section",
        variant: "destructive"
      });
    }
  };
  
  const handleCreateArticle = async () => {
    if (!newArticleTitle.trim() || !selectedSectionForArticle) return;
    
    try {
      await createArticle.mutateAsync({
        title: newArticleTitle.trim(),
        content: newArticleContent.trim(),
        sectionId: selectedSectionForArticle
      });
      
      setNewArticleTitle("");
      setNewArticleContent("");
      setSelectedSectionForArticle("");
      setShowCreateArticle(false);
      
      toast({
        title: "Success",
        description: "Article created successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create article",
        variant: "destructive"
      });
    }
  };

  const filterItems = (items: KbItem[], query: string): KbItem[] => {
    if (!query.trim()) return items;
    
    return items.filter(item => {
      const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
      const hasMatchingChildren = item.children && filterItems(item.children, query).length > 0;
      return matchesQuery || hasMatchingChildren;
    }).map(item => ({
      ...item,
      children: item.children ? filterItems(item.children, query) : undefined
    }));
  };

  const renderItems = (items: KbItem[], level = 0) => {
    const filteredItems = searchQuery.trim() ? filterItems(items, searchQuery) : items;
    
    return filteredItems.map((item) => {
      const isExpanded = expandedItems.has(item.id);
      const hasChildren = item.children && item.children.length > 0;
      const isSelected = selectedItemId === item.id;

      return (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton
            onClick={() => {
              if (hasChildren) {
                toggleExpanded(item.id);
              }
              onItemSelect(item);
              console.log(`Selected item: ${item.title}`);
            }}
            className={`pl-${level * 2} ${isSelected ? 'bg-sidebar-accent' : ''}`}
            data-testid={`sidebar-item-${item.id}`}
          >
            <div className="flex items-center gap-2 w-full">
              {hasChildren ? (
                isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )
              ) : (
                <div className="w-4" />
              )}
              
              {item.type === "section" ? (
                <Folder className="h-4 w-4" />
              ) : (
                <FileText className="h-4 w-4" />
              )}
              
              <span className="truncate">{item.title}</span>
            </div>
          </SidebarMenuButton>
          
          {hasChildren && isExpanded && (
            <div className="ml-2">
              <SidebarMenu>
                {renderItems(item.children!, level + 1)}
              </SidebarMenu>
            </div>
          )}
        </SidebarMenuItem>
      );
    });
  };

  if (sectionsLoading || articlesLoading) {
    return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Knowledge Base</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="p-4 text-center text-muted-foreground">
                Loading...
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center justify-between w-full">
              <span>Knowledge Base</span>
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="h-6 px-2"
                  data-testid="button-admin-logout"
                >
                  <LogOut className="h-3 w-3 mr-1" />
                  <span className="text-xs">Logout</span>
                </Button>
              )}
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-4">
              {isAdmin && (
                <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950 rounded-md border border-green-200 dark:border-green-800">
                  <ShieldCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-green-700 dark:text-green-300 font-medium">Admin Mode Active</span>
                </div>
              )}
              
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                  data-testid="input-search"
                />
              </div>
              
              <div className="flex gap-2">
                <AdminButton className="flex-1">
                  <Dialog open={showCreateSection} onOpenChange={setShowCreateSection}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        data-testid="button-add-section"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Section
                      </Button>
                    </DialogTrigger>
                    <DialogContent data-testid="dialog-create-section">
                      <DialogHeader>
                        <DialogTitle>Create New Section</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="section-title">Section Title</Label>
                          <Input
                            id="section-title"
                            value={newSectionTitle}
                            onChange={(e) => setNewSectionTitle(e.target.value)}
                            placeholder="Enter section title"
                            data-testid="input-section-title"
                          />
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            onClick={() => setShowCreateSection(false)}
                            data-testid="button-cancel-section"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleCreateSection}
                            disabled={!newSectionTitle.trim() || createSection.isPending}
                            data-testid="button-save-section"
                          >
                            {createSection.isPending ? "Creating..." : "Create Section"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </AdminButton>
                
                <AdminButton className="flex-1">
                  <Dialog open={showCreateArticle} onOpenChange={setShowCreateArticle}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        data-testid="button-add-article"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Article
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl" data-testid="dialog-create-article">
                      <DialogHeader>
                        <DialogTitle>Create New Article</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="article-title">Article Title</Label>
                          <Input
                            id="article-title"
                            value={newArticleTitle}
                            onChange={(e) => setNewArticleTitle(e.target.value)}
                            placeholder="Enter article title"
                            data-testid="input-article-title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="article-section">Section</Label>
                          <select
                            id="article-section"
                            value={selectedSectionForArticle}
                            onChange={(e) => setSelectedSectionForArticle(e.target.value)}
                            className="w-full px-3 py-2 border border-input bg-background rounded-md"
                            data-testid="select-article-section"
                          >
                            <option value="">Select a section</option>
                            {sections.map((section: any) => (
                              <option key={section.id} value={section.id}>
                                {section.title}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="article-content">Content</Label>
                          <Textarea
                            id="article-content"
                            value={newArticleContent}
                            onChange={(e) => setNewArticleContent(e.target.value)}
                            placeholder="Enter article content (Markdown supported)"
                            className="min-h-[200px]"
                            data-testid="textarea-article-content"
                          />
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            onClick={() => setShowCreateArticle(false)}
                            data-testid="button-cancel-article"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleCreateArticle}
                            disabled={!newArticleTitle.trim() || !selectedSectionForArticle || createArticle.isPending}
                            data-testid="button-save-article"
                          >
                            {createArticle.isPending ? "Creating..." : "Create Article"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </AdminButton>
              </div>
              
              <SidebarMenu>
                {renderItems(hierarchicalData)}
              </SidebarMenu>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}