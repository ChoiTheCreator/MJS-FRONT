/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Bold, Code, Heading1, Heading2, Heading3, Heading4, Image, Italic, Link2, Quote, Strikethrough } from 'lucide-react';
import { useRef, useState } from 'react';

const toolbarIconSize = 20

function MarkdownEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState('');

  const parseMarkdown = (text) => {
    return text
      .replace(/#{6}\s(.*)/g, '<h6>$1</h6>')       // h6
      .replace(/#{5}\s(.*)/g, '<h5>$1</h5>')       // h5
      .replace(/#{4}\s(.*)/g, '<h4>$1</h4>')       // h4
      .replace(/#{3}\s(.*)/g, '<h3>$1</h3>')       // h3
      .replace(/#{2}\s(.*)/g, '<h2>$1</h2>')       // h2
      .replace(/#{1}\s(.*)/g, '<h1>$1</h1>')       // h1
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>')        // italic
      .replace(/`(.*?)`/g, '<code>$1</code>')      // inline code
      .replace(/~~(.*?)~~/g, '<del>$1</del>')      // strikethrough
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>') // links
      .replace(/\n/g, '<br/>');                    // line breaks
  };

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
        <div style={containerStyle}>
          <textarea
            style={editorStyle}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="글을 입력하세요" />
          <div
            style={previewStyle}
            dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }} />
        </div>
      </div>
      <div css={css`width: 100%`}>
        <button>저장</button>
      </div>
    </div >
  );
}

// 스타일 정의
const containerStyle = {
  display: 'flex',
  height: '100vh',
  gap: '20px',
  padding: '20px',
  backgroundColor: '#f0f0f0'
};

const editorStyle = {
  flex: 1,
  padding: '20px',
  fontSize: '16px',
  borderRadius: '8px',
  border: '2px solid #007acc',
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  resize: 'none'
};

const previewStyle = {
  flex: 1,
  padding: '20px',
  borderRadius: '8px',
  border: '2px solid #e0e0e0',
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  overflowY: 'auto'
};


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
