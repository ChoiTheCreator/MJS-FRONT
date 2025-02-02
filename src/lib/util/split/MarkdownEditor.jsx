/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Bold, Code, Heading1, Heading2, Heading3, Heading4, Image, Italic, Link2, Quote, Strikethrough } from 'lucide-react';
import { useRef, useState } from 'react';
import Markdown from "react-markdown";

const toolbarIconSize = 20

function MarkdownEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState('');
  const fileInputRef = useRef(null);

  // 이미지 업로드 버튼 클릭 시 input[type="file"] 트리거
  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  // 파일 선택 시 Blob URL 생성 후 Markdown 에디터에 삽입
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setContent((prev) => `${prev}\n\n![](${imageUrl})\n\n`);
    }
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
          <button css={utilButton} onClick={() => handleImageUploadClick('```')}><Image size={toolbarIconSize} /></button>
          {/* 파일 업로드 숨김 input */}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button css={utilButton} onClick={() => handleMarkdownFormat('```')}><Code size={toolbarIconSize} /></button>
        </div>
      </div >
      <div css={css`padding: 16px; display: flex; flex-direction: row; height: 100; background-color: #f0f0f0`}>
        <textarea
          style={editorStyle}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="글을 입력하세요" />
        <Markdown style={previewStyle}>{content}</Markdown>
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
  flex: '1'
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
