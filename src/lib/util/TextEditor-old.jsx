/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Bold, Code, Heading1, Heading2, Heading3, Heading4, Image, Italic, Link2, Quote, Strikethrough } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function MarkdownEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const textarea = document.getElementById('markdown-editor');

  // TODO: 툴바 로직
  const handleMarkdownFormat = (prefix) => {
    const { selectionStart, selectionEnd, value } = textarea;

    const before = value.substring(0, selectionStart);
    const selected = value.substring(selectionStart, selectionEnd);
    const after = value.substring(selectionEnd);

    const updatedContent = `${before}${prefix} ${selected}\n${after}`;
    setContent(updatedContent);
    keepFocus();
  };

  const handleInsertHeading = (level) => {
    const headingMarkdown = '#'.repeat(level) + ' ';
    setContent((prev) => prev + '\n' + headingMarkdown);


    const { selectionStart, selectionEnd, value } = textarea;
    console.log(selectionStart)
    console.log(selectionEnd)
    console.log(value)
  }

  const handleH1Format = () => {

  }

  // 포커스 유지 및 커서 위치 조정
  const keepFocus = () => {
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = before.length + prefix.length + 1;
    }, 0);
  }

  const toolbarIconSize = 20

  return (
    <div css={editorWrapper}>
      <div css={css`padding: 16px`}>
        <textarea
          id="title-editor"
          css={css`
            width: 100%;
            font-size: 32px;
            justify-content: center;
            border: none;
            outline: none;
            align-items: center;
            `}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='제목을 입력하세요' />
      </div>
      <div css={toolbar}>
        <div css={css`display: flex; padding: 0px 0px 16px 16px;`}>
          <button css={utilButton} onClick={() => handleInsertHeading(1)}><Heading1 size={toolbarIconSize} /></button>
          <button css={utilButton} onClick={() => handleInsertHeading(2)}><Heading2 size={toolbarIconSize} /></button>
          <button css={utilButton} onClick={() => handleInsertHeading(3)}><Heading3 size={toolbarIconSize} /></button>
          <button css={utilButton} onClick={() => handleInsertHeading(4)}><Heading4 size={toolbarIconSize} /></button>
          <p>|</p>
          <button css={utilButton} onClick={() => handleMarkdownFormat('-')}><Bold size={toolbarIconSize} /></button>
          <button css={utilButton} onClick={() => handleMarkdownFormat('>')}><Italic size={toolbarIconSize} /></button>
          <button css={utilButton} onClick={() => handleMarkdownFormat('```')}><Strikethrough size={toolbarIconSize} /></button>
          <p>|</p>
          <button css={utilButton} onClick={() => handleMarkdownFormat('-')}><Quote size={toolbarIconSize} /></button>
          <button css={utilButton} onClick={() => handleMarkdownFormat('>')}><Link2 size={toolbarIconSize} /></button>
          <button css={utilButton} onClick={() => handleMarkdownFormat('```')}><Image size={toolbarIconSize} /></button>
          <button css={utilButton} onClick={() => handleMarkdownFormat('```')}><Code size={toolbarIconSize} /></button>
        </div>
      </div >
      <div css={css`padding: 16px; display: flex; flex-direction: row; height: 100;`}>
        <div css={css`flex: 1; height: 100%; border: 1px solid #ccc; overflow: auto;`}>
          <textarea
            id="markdown-editor"
            css={css`
            border: none; 
            outline: none; 
            width: 100%; 
            height: 400px; 
            padding: 10px; 
            font-size: 16px;`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="글을 작성해 보세요" />
        </div>
        <div css={css`flex: 1; height: 100%; border: 1px solid #ccc; overflow: auto;`}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
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
  padding: '20px';
  background: white;
`

const utilButton = css`
  background: none;
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
