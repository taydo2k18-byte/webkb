import { useState } from "react";
import { KnowledgeBaseSidebar } from "@/components/KnowleadgeBaseSidebar";
import { ArticleViewer } from "@/components/ArticalViewer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface KbItem {
  id: string;
  title: string;
  type: "section" | "article";
  children?: KbItem[];
  content?: string;
}

export default function KnowledgeBase() {
  const [selectedItem, setSelectedItem] = useState<KbItem | null>(null);

  const handleItemSelect = (item: KbItem) => {
    setSelectedItem(item);
  };

  const handleSave = (updatedArticle: any) => {
    setSelectedItem(updatedArticle);
    console.log("Article saved:", updatedArticle);
  };

  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <KnowledgeBaseSidebar
          selectedItemId={selectedItem?.id}
          onItemSelect={handleItemSelect}
        />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b bg-background">
            <div className="flex items-center gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <h1 className="text-lg font-semibold">Knowledge Base</h1>
            </div>
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-hidden p-6">
            <ArticleViewer article={selectedItem as any} onSave={handleSave} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
