/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Italic,
  Link2,
  Quote,
  Strikethrough,
} from 'lucide-react';
import { useRef, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const toolbarIconSize = 20;

function MarkdownEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(dummyContent);
  const editorRef = useRef(null);
  const [showDialog, setShowDialog] = useState(false);
  const [link, setLink] = useState('');
  const fileInputRef = useRef(null);

  const insertHeading = (prefix) => {
    const textarea = editorRef.current;
    if (!textarea) {
      console.error('Textarea not found. ' + textarea + ' is null.');
      return;
    }

    // textarea의 선택 영역 pointer
    const startPointer = textarea.selectionStart;
    const endPointer = textarea.selectionEnd;

    // 선택된 line 추출 및 heading 값 검사
    const beforeText = content.substring(0, startPointer);
    const lastNewline = beforeText.lastIndexOf('\n') + 1;
    const nextNewline = content.indexOf('\n', startPointer);
    const lineEnd = nextNewline === -1 ? content.length : nextNewline;

    const currentLine = content.substring(lastNewline, lineEnd).trimStart();
    const headingMatch = currentLine.match(/^(#+)\s*/);

    let newContent;
    if (headingMatch) {
      newContent =
        content.substring(0, lastNewline) +
        prefix +
        ' ' +
        currentLine.substring(headingMatch[0].length) +
        content.substring(lineEnd);
    } else {
      newContent =
        content.substring(0, lastNewline) +
        prefix +
        ' ' +
        currentLine +
        content.substring(lineEnd);
    }
    setContent(newContent);

    // 커서 위치 재정렬
    setTimeout(() => {
      const textSelected = startPointer !== endPointer;

      if (textSelected) {
        textarea.setSelectionRange(
          startPointer + prefix.length + 1,
          endPointer + prefix.length + 1
        );
        textarea.focus();
      } else {
        textarea.selectionStart = startPointer + prefix.length + 1;
        textarea.focus();
      }
    }, 0);
  };

  const insertTextStyle = (prefix, suffix = prefix) => {
    const textarea = editorRef.current;
    if (!textarea) {
      console.error('Textarea not found. ' + textarea + ' is null.');
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    const newContent = `${textarea.value.substring(
      0,
      start
    )}${prefix}${selectedText}${suffix}${textarea.value.substring(end)}`;
    setContent(newContent);

    // 커서 위치 재정렬
    setTimeout(() => {
      if (selectedText) {
        textarea.setSelectionRange(start, end + 4);
        textarea.focus();
      } else {
        textarea.selectionStart = start + 2;
        textarea.focus();
      }
    }, 0);
  };

  const insertQuote = () => {
    const textarea = editorRef.current;
    if (!textarea) {
      console.error('Textarea not found. ' + textarea + ' is null.');
      return;
    }
  };

  const insertLink = () => {};

  const insertHyperlink = () => {
    setShowDialog(true);
  };
  const handleInsertLink = () => {
    if (!link) return;

    const textarea = editorRef.current;
    if (!textarea) return;

    const startPointer = textarea.selectionStart;
    const linkString = `[링크](${link})`;
    const newContent =
      content.substring(0, startPointer) +
      linkString +
      content.substring(startPointer);

    setContent(newContent);
    setShowDialog(false);
    setLink('');

    // 커서 위치 재정렬
    setTimeout(() => {
      textarea.selectionStart = startPointer + linkString.length;
      textarea.focus();
    }, 0);
  };

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

  const insertCode = () => {
    const textarea = editorRef.current;
    if (!textarea) {
      console.error('Textarea not found. ' + textarea + ' is null.');
      return;
    }

    // 커서 위치 기록
    const startPointer = textarea.selectionStart;
    const endPointer = textarea.selectionEnd;
    const text = textarea.value;
    const textSelected = startPointer !== endPointer;

    // 스타일 적용
    let newContent;
    if (textSelected) {
      const selectedText = text.substring(startPointer, endPointer);
      newContent = `${text.substring(
        0,
        startPointer
      )}\n\`\`\`\n${selectedText}\n\`\`\`\n${text.substring(endPointer)}`;
    } else {
      newContent = `${text.substring(
        0,
        startPointer
      )}\n\`\`\`\n\n\`\`\`\n${text.substring(endPointer)}`;
    }
    setContent(newContent);

    // 커서 위치 재정렬
    setTimeout(() => {
      if (textSelected) {
        textarea.setSelectionRange(startPointer + 5, endPointer + 5);
        textarea.focus();
      } else {
        textarea.selectionStart = startPointer + 5;
        textarea.focus();
      }
    }, 0);
  };

  const handleSave = () => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'content.md';
    document.body.appendChild(link); // Firefox 대응
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div css={editorWrapper}>
      <div
        css={css`
          padding: 16px;
        `}
      >
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
          placeholder="제목을 입력하세요"
        />
      </div>
      <div css={toolbar}>
        <div
          css={css`
            display: flex;
            padding: 0px 0px 16px 16px;
          `}
        >
          <button css={utilButton} onClick={() => insertHeading('#')}>
            <Heading1 size={toolbarIconSize} />
          </button>
          <button css={utilButton} onClick={() => insertHeading('##')}>
            <Heading2 size={toolbarIconSize} />
          </button>
          <button css={utilButton} onClick={() => insertHeading('###')}>
            <Heading3 size={toolbarIconSize} />
          </button>
          <p>|</p>
          <button css={utilButton} onClick={() => insertTextStyle('**')}>
            <Bold size={toolbarIconSize} />
          </button>
          <button css={utilButton} onClick={() => insertTextStyle(' _', '_ ')}>
            <Italic size={toolbarIconSize} />
          </button>
          <button css={utilButton} onClick={() => insertTextStyle('~~')}>
            <Strikethrough size={toolbarIconSize} />
          </button>
          <p>|</p>
          <button css={utilButton} onClick={() => insertQuote()}>
            <Quote size={toolbarIconSize} />
          </button>
          <button css={utilButton} onClick={() => insertHyperlink()}>
            <Link2 size={toolbarIconSize} />
          </button>
          <button css={utilButton} onClick={() => handleImageUploadClick()}>
            <Image size={toolbarIconSize} />
          </button>
          {/* 파일 업로드 숨김 input */}
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button css={utilButton} onClick={() => insertCode()}>
            <Code size={toolbarIconSize} />
          </button>
          <button onClick={handleSave}>저장</button>
        </div>
      </div>

      <div
        css={css`
          display: flex;
          flex-direction: row;
          height: 100vh;
          padding: 16px;
          gap: 16px;
        `}
      >
        <textarea
          ref={editorRef}
          css={css`
            width: 50%;
            height: 100%;
            padding: 16px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 8px;
            resize: none;
            outline: none;
          `}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="글을 입력하세요"
        />
        <div
          css={css`
            width: 50%;
            height: 100%;
            padding: 16px;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: #f9f9f9;
            overflow-y: auto;
            word-break: break-word;
          `}
        >
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {content}
          </Markdown>
        </div>
      </div>
      <div
        css={css`
          width: 100%;
        `}
      >
        {/* <button onClick={handleSave}>저장</button> */}
      </div>

      {showDialog && (
        <div css={dialogOverlay}>
          <div css={dialogBox}>
            <h3>링크 추가</h3>
            <input
              css={inputStyle}
              type="text"
              placeholder="https://www.mjs.ac.kr"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <br />
            <button css={confirmButton} onClick={handleInsertLink}>
              삽입
            </button>
            <button css={cancelButton} onClick={() => setShowDialog(false)}>
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// dialog 스타일
const dialogOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const dialogBox = css`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const inputStyle = css`
  padding: 8px;
  margin: 10px 0;
  width: 80%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const dialogButton = css`
  margin: 5px;
  padding: 8px 12px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 16px;
`;

const confirmButton = css`
  ${dialogButton};
  background-color: #102e68;
  color: white;
  &:hover {
    background-color: #405886;
  }
`;

const cancelButton = css`
  ${dialogButton};
  &:hover {
    background-color: #f0f0f0;
  }
`;

// 스타일 정의
const containerStyle = {
  display: 'flex',
  height: '100vh',
  gap: '20px',
  padding: '20px',
  backgroundColor: '#f0f0f0',
};

const editorStyle = {
  flex: 1,
  padding: '20px',
  fontSize: '16px',
  borderRadius: '8px',
  border: '2px solid #007acc',
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  resize: 'none',
};

const previewStyle = {
  flex: 1,
  padding: '20px',
  borderRadius: '8px',
  border: '2px solid #e0e0e0',
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  overflowY: 'auto',
};

export default MarkdownEditor;

const editorWrapper = css`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: '20px';
  background: white;
`;

const utilButton = css`
  background: none;
`;

const textBoxWrapper = css`
  width: '100%';
  height: '300px';
  padding: '10px';
  font-size: '16px';
`;

const toolbar = css`
  width: 100%;
  height: 64px;
  padding: '10px';
`;

const toolbarButton = css`
  padding: 34px;
  font-size: 12px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
`;

const dummyContent = `# 개인 정보 업로드 금지
## 보안이 되어있지 않습니다
### 마크 다운 에디터 입니다
#### 마크 다운 에디터 입니다
##### 마인크래프트 무료 다운
###### 마크 다운 에디터 입니다

마크 다운 에디터 입니다

**마크 다운 에디터 입니다**

 _마크 다운 에디터 입니다_ 

~~마크 다운 에디터 입니다~~



\`\`\`
코드 블록입니다
\`\`\`

> 인용 블록 입니다



![](https://item.kakaocdn.net/do/0f52321f08519a5b62df65b1b1ea806e7f9f127ae3ca5dc7f0f6349aebcdb3c4)

![](https://item.kakaocdn.net/do/77c280691fcffe943ddf19cbc77fe8e5113e2bd2b7407c8202a97d2241a96625)
`;
