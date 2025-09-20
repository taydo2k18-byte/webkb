import { useState } from "react";
import { ArticleViewer } from "../ArticleViewer";

export default function ArticleViewerExample() {
  const [article, setArticle] = useState({
    id: "1-1",
    title: "Quick Start Guide",
    content: `Welcome to our comprehensive knowledge base! This guide will help you get up and running quickly.

## Getting Started

Follow these simple steps to begin:

1. **Explore the Sidebar**: Navigate through different sections and articles using the hierarchical sidebar on the left.

2. **Search Functionality**: Use the search bar to quickly find specific articles or topics.

3. **Edit Articles**: Click the Edit button to modify any article content.

4. **Create New Content**: Use the Add Section or Add Article buttons to expand your knowledge base.

## Key Features

- **Hierarchical Organization**: Organize your content in sections and subsections
- **Real-time Search**: Find information instantly with our search functionality  
- **Easy Editing**: Edit articles inline with a simple and intuitive interface
- **Responsive Design**: Access your knowledge base from any device

## Tips for Success

- Keep your article titles descriptive and clear
- Use sections to group related articles together
- Regular updates keep your knowledge base current and useful

Happy learning!`,
    type: "article" as const,
    lastModified: "Dec 20, 2024",
    author: "Knowledge Base Team"
  });

  const handleSave = (updatedArticle: any) => {
    setArticle(updatedArticle);
  };

  return (
    <div className="h-96 p-4">
      <ArticleViewer article={article} onSave={handleSave} />
    </div>
  );
}