import { useState } from "react";
import { KnowledgeBaseSidebar } from "../KnowleadgeBaseSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function KnowledgeBaseSidebarExample() {
  const [selectedItemId, setSelectedItemId] = useState<string>();

  const handleItemSelect = (item: any) => {
    setSelectedItemId(item.id);
  };

  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <KnowledgeBaseSidebar 
          selectedItemId={selectedItemId}
          onItemSelect={handleItemSelect}
        />
      </div>
    </SidebarProvider>
  );
}