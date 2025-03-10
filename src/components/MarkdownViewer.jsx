/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Markdown from "react-markdown";

export default function MarkdownViewer({ children }) {
  return (
    <div>
      <Markdown>
        {children}
      </Markdown>
    </div>
  );
}
