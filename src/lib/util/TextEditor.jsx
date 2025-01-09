/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Bold, Code, Heading1, Heading2, Heading3, Heading4, Image, Italic, Link2, Quote, Strikethrough } from 'lucide-react';
import { useState } from 'react';

function MarkdownEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleMarkdownFormat = (prefix) => {
    const textarea = document.getElementById('markdown-editor');
    const { selectionStart, selectionEnd, value } = textarea;

    const before = value.substring(0, selectionStart);
    const selected = value.substring(selectionStart, selectionEnd);
    const after = value.substring(selectionEnd);

    const updatedContent = `${before}${prefix} ${selected}\n${after}`;
    setContent(updatedContent);

    // 포커스 유지 및 커서 위치 조정
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = before.length + prefix.length + 1;
    }, 0);

  };

  const toolbarIconSize = 20

  return (
    <div css={editorWrapper}>
      <div css={css`padding: 16px`}>
        <textarea
          id="title-editor"
          value={title}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: '100%', height: '100%', fontSize: '32px' }}
          placeholder='제목을 입력하세요' />
      </div>
      <div css={toolbar}>
        <div css={css`display: flex`}>
          <button onClick={() => handleMarkdownFormat('#')}><Heading1 size={toolbarIconSize} /></button>
          <button onClick={() => handleMarkdownFormat('##')}><Heading2 size={toolbarIconSize} /></button>
          <button onClick={() => handleMarkdownFormat('###')}><Heading3 size={toolbarIconSize} /></button>
          <button onClick={() => handleMarkdownFormat('####')}><Heading4 size={toolbarIconSize} /></button>
          <p>|</p>
          <button onClick={() => handleMarkdownFormat('-')}><Bold size={toolbarIconSize} /></button>
          <button onClick={() => handleMarkdownFormat('>')}><Italic size={toolbarIconSize} /></button>
          <button onClick={() => handleMarkdownFormat('```')}><Strikethrough size={toolbarIconSize} /></button>
          <p>|</p>
          <button onClick={() => handleMarkdownFormat('-')}><Quote size={toolbarIconSize} /></button>
          <button onClick={() => handleMarkdownFormat('>')}><Link2 size={toolbarIconSize} /></button>
          <button onClick={() => handleMarkdownFormat('```')}><Image size={toolbarIconSize} /></button>
          <button onClick={() => handleMarkdownFormat('```')}><Code size={toolbarIconSize} /></button>
        </div>
      </div >
      <div css={css`padding: 16px`}>
        <textarea
          id="markdown-editor"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: '100%', height: '400px', padding: '10px', fontSize: '16px' }}
          placeholder="글을 작성해 보세요" />
      </div>
      <div css={css`width: 100%`}>
        <button>저장</button>
      </div>
    </div >
  );
}

export default MarkdownEditor;

const editorWrapper = css`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: '20px'
`

const textBoxWrapper = css`
  width: '100%';
  height: '300px';
  padding: '10px';
  fontSize: '16px';
`

const toolbar = css`
  width: 100%;
  height: 64px;
  padding: '10px';
`

const toolbarButton = css`
  padding: 34px;
  font-size: 12px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    background-color: ;
    color: white;
  }
`;
