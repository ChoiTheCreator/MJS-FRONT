/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Bold, Code, Heading1, Heading2, Heading3, Image, Italic, Link2, Quote, Strikethrough } from 'lucide-react';
import { useRef, useState } from 'react';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const toolbarIconSize = 20

export default function MarkdownEditor() {
  const [title, setTitle] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [link, setLink] = useState("");
  const [content, setContent] = useState("");
  const titleBoxRef = useRef(null);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  // Heading 추가하는 function 입니다. 현재 선택한 문장의 currentHeading 값과 비교해서 newHeading 스타일을 적용합니다.
  const insertHeading = (prefix) => {
    const textarea = editorRef.current;
    if (prefix.length > 6) {
      console.error("Invalid insertHeading(prefix) function parameter. prefix = " + prefix)
      return;
    }
    if (!textarea) {
      console.error("Textarea not found. " + textarea + " is null.")
      return;
    }

    const startPointer = textarea.selectionStart;
    const endPointer = textarea.selectionEnd;

    const beforeText = content.substring(0, startPointer);
    const currentLinePointer = beforeText.lastIndexOf("\n") + 1;

    let pointer = currentLinePointer;
    let currentHeadingLevel = 0;
    for (let i = 0; i < 7; i++) {
      if (currentHeadingLevel === 0) {
        if (content[pointer] !== '#') {
          break;
        }
        if (content[pointer] === '#') {
          pointer++;
          currentHeadingLevel++;
          continue;
        }
      }
      if (currentHeadingLevel !== 0) {
        if (currentHeadingLevel === 6) {
          if (content[pointer] === ' ') {
            break;
          } else {
            currentHeadingLevel = 0;
            break;
          }
        }
        if (content[pointer] === '#') {
          pointer++;
          currentHeadingLevel++;
          continue;
        } else if (content[pointer] === ' ') {
          break;
        } else {
          currentHeadingLevel = 0;
          break;
        }
      }
    }

    let newContent;
    if (currentHeadingLevel === 0) {
      newContent =
        content.substring(0, currentLinePointer) +
        prefix + ' ' +
        content.substring(currentLinePointer);
    } else {
      if (currentHeadingLevel === prefix.length) {
        newContent =
          content.substring(0, currentLinePointer) +
          content.substring(currentLinePointer + currentHeadingLevel + 1);
      } else {
        newContent =
          content.substring(0, currentLinePointer) +
          prefix + ' ' +
          content.substring(currentLinePointer + currentHeadingLevel + 1);
      }
    }
    setContent(newContent);

    setTimeout(() => {
      if (currentHeadingLevel === 0) {
        textarea.setSelectionRange(startPointer + prefix.length + 1, endPointer + prefix.length + 1);
        textarea.focus();
      } else {
        if (currentHeadingLevel === prefix.length) {
          textarea.setSelectionRange(startPointer - (currentHeadingLevel + 1), endPointer - (currentHeadingLevel + 1));
          textarea.focus();
        } else {
          textarea.setSelectionRange(startPointer + prefix.length - currentHeadingLevel, endPointer + prefix.length - currentHeadingLevel);
          textarea.focus();
        }
      }
    }, 0);
  }

  const insertTextStyle = (prefix, suffix = prefix) => {
    const textarea = editorRef.current;
    if (!textarea) {
      console.error("Textarea not found. " + textarea + " is null.")
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    const newContent = `${textarea.value.substring(0, start)}${prefix}${selectedText}${suffix}${textarea.value.substring(end)}`;
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
  }

  const insertQuote = () => {
    const textarea = editorRef.current;
    if (!textarea) {
      console.error("Textarea not found. " + textarea + " is null.")
      return;
    }
  }

  const insertHyperlink = () => {
    setShowDialog(true);
  };
  const handleInsertLink = () => {
    if (!link) return;

    const textarea = editorRef.current;
    if (!textarea) return;

    const startPointer = textarea.selectionStart;
    const linkString = `[링크](${link})`;
    const newContent = content.substring(0, startPointer) + linkString + content.substring(startPointer);

    setContent(newContent);
    setShowDialog(false);
    setLink("");

    // 커서 위치 재정렬
    setTimeout(() => {
      textarea.selectionStart = startPointer + linkString.length;
      textarea.focus();
    }, 0);
  };

  ///////////////////////////// 이미지 업로드 /////////////////////////////
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
  //////////////////////////////////////////////////////////////////////

  const insertCode = () => {
    const textarea = editorRef.current;
    if (!textarea) {
      console.error("Textarea not found. " + textarea + " is null.")
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
      newContent = `${text.substring(0, startPointer)}\n\`\`\`\n${selectedText}\n\`\`\`\n${text.substring(endPointer)}`;
    } else {
      newContent = `${text.substring(0, startPointer)}\n\`\`\`\n\n\`\`\`\n${text.substring(endPointer)}`;
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
  }

  const handleSave = () => {
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "content.md";
    document.body.appendChild(link); // Firefox 대응
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div css={editorWrapper}>
      <div css={titleBoxContainer}>
        <textarea
          ref={titleBoxRef}
          css={titleBox}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='제목을 입력하세요' />
      </div>
      <div css={toolbarContainer}>
        <div css={toolbar}>
          <button css={toolbarButton} onClick={() => insertHeading('#')}><Heading1 size={toolbarIconSize} /></button>
          <button css={toolbarButton} onClick={() => insertHeading('##')}><Heading2 size={toolbarIconSize} /></button>
          <button css={toolbarButton} onClick={() => insertHeading('###')}><Heading3 size={toolbarIconSize} /></button>
          <p css={toolbarSpacing}>|</p>
          <button css={toolbarButton} onClick={() => insertTextStyle('**')}><Bold size={toolbarIconSize} /></button>
          <button css={toolbarButton} onClick={() => insertTextStyle(' _', '_ ')}><Italic size={toolbarIconSize} /></button>
          <button css={toolbarButton} onClick={() => insertTextStyle('~~')}><Strikethrough size={toolbarIconSize} /></button>
          <p css={toolbarSpacing}>|</p>
          <button css={toolbarButton} onClick={() => insertQuote()}><Quote size={toolbarIconSize} /></button>
          <button css={toolbarButton} onClick={() => insertHyperlink()}><Link2 size={toolbarIconSize} /></button>
          <button css={toolbarButton} onClick={() => handleImageUploadClick()}><Image size={toolbarIconSize} /></button>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange} />
          <button css={toolbarButton} onClick={() => insertCode()}><Code size={toolbarIconSize} /></button>
          <p css={toolbarSpacing}>|</p>
          <button onClick={handleSave}>저장</button>
        </div>
      </div >
      <div css={editorContainer}>
        <textarea
          ref={editorRef}
          css={editor}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="글을 입력하세요" />
        <div css={parserContainer}>
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}>
            {content}
          </Markdown>
        </div>
      </div>
      <div css={css`width: 100%`}>
        {/* <button onClick={handleSave}>저장</button> */}
      </div>

      {showDialog && (
        <div css={dialogOverlay}>
          <div css={dialogBox}>
            <h3>링크 추가</h3>
            <input
              css={dialogInputStyle}
              type="text"
              placeholder="https://www.mjs.ac.kr"
              value={link}
              onChange={(e) => setLink(e.target.value)} />
            <br />
            <button css={dialogConfirmButton} onClick={handleInsertLink}>
              삽입
            </button>
            <button css={dialogCancelButton} onClick={() => setShowDialog(false)}>
              취소
            </button>
          </div>
        </div>
      )}
    </div >
  );
}

const editorWrapper = css`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: '20px';
  background: white;
`;

const titleBoxContainer = css`
  padding: 16px
`;

const titleBox = css`
  width: 100%;
  font-size: 32px;
  justify-content: center;
  border: none;
  outline: none;
  align-items: center;
`;

const toolbarContainer = css`
  width: 100%;
  height: 64px;
  padding: 16px;
`;

const toolbar = css`
  display: flex; 
  align-items: center;
`;

const toolbarButton = css`
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1); /* hover 시 어두워짐 */
  }
`;

const toolbarSpacing = css`
  padding: 0px 32px 0px 32px ;
`;

const editorContainer = css`
  display: flex;
  flex-direction: row;
  height: 100vh;
  padding: 16px;
  gap: 16px;
`;

const editor = css`
  width: 50%;
  height: 100%;
  padding: 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
  outline: none;
`;

const parserContainer = css`
  width: 50%;
  height: 100%;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  overflow-y: auto;
  word-break: break-word;
`;

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

const dialogInputStyle = css`
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

const dialogConfirmButton = css`
  ${dialogButton};
  background-color: #102E68;
  color: white;
  &:hover {
    background-color: #405886;
  }
`;

const dialogCancelButton = css`
  ${dialogButton};
  &:hover {
    background-color: #F0F0F0;
  }
`;
