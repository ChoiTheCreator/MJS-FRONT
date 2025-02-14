import { css } from '@emotion/react';
import Markdown from "react-markdown";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

export default function MarkdownViewer({ children }) {
  return (
    <div>
      <Markdown>
        {children}
      </Markdown>
    </div>
  );
}
