import { useState } from "react"
import Markdown from "react-markdown";

export default function MarkdownViewer() {
  const [content, setContent] = useState("");

  return (
    <div>
      <Markdown>
        {content}
      </Markdown>
    </div>
  );
}
