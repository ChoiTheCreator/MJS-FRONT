/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

export default function ViewPage() {
  const [content, setContent] = useState("");

  return (
    <div>
      <MarkdownViewer>
        {content}
      </MarkdownViewer>
    </div>
  );
}
